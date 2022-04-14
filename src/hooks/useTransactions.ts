import uuid from 'react-native-uuid';
import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {storeTypes, subscriptionTypes, transactionTypes} from '../types';
import {filter, helpers, _} from '../utils';
import {useFilter, useSearch, useSort} from '.';
import useSubscriptions from './useSubscriptions';
import useSnackbar from './useSnackbar';

// move to types

interface UseTransactionsProps {
  limit?: number;
  additionalLimit?: number;
  isSearchResult?: boolean;
  showMore?: boolean;
  manualFilter?: (transaction: transactionTypes.Transaction) => boolean;
  ignoreFilter?: boolean;
  category?: transactionTypes.PaymentMethod;
  selected?: string[];
}

export default function useTransactions(props?: UseTransactionsProps) {
  const {
    limit = 0,
    additionalLimit = 7,
    isSearchResult = false,
    showMore = false,
    manualFilter,
    ignoreFilter = false,
    selected = [],
    category,
  } = props || {};

  const dispatch = useDispatch();
  const filterState = useFilter();
  const sort = useSort();
  const search = useSearch();
  const subscriptions = useSubscriptions();
  const snackbar = useSnackbar();

  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

  const modifiedTransactions: transactionTypes.Transaction[] = useMemo(() => {
    if (transactions.length === 0) return [];

    const sliceEnd = !!limit
      ? showMore
        ? limit + additionalLimit
        : limit
      : transactions.length;

    // TODO: extract out
    if (search.data.results.length > 0 && isSearchResult) {
      return search.data.results.sort(sort.comparator || helpers.compare.adate);
    }

    return transactions
      .filter((transaction: transactionTypes.Transaction) => {
        if (ignoreFilter) {
          if (manualFilter !== null && manualFilter !== undefined) {
            return manualFilter(transaction);
          }

          return true;
        }

        if (manualFilter !== null && manualFilter !== undefined) {
          return manualFilter(transaction);
        }

        return filter.apply([
          filter.conditions.category(transaction, category),
          filter.conditions.name(transaction, filterState.data.name),
          filter.conditions.amountRange(
            transaction,
            filterState.data.amountRangeFrom,
            filterState.data.amountRangeTo,
          ),
          filter.conditions.paymentMethod(
            transaction,
            filterState.data.paymentMethods,
          ),
          filter.conditions.installment(
            transaction,
            filterState.data.installments,
          ),
          filter.conditions.dateRange(
            transaction,
            filterState.data.dateRangeFrom,
            filterState.data.dateRangeTo,
          ),
          filter.conditions.selected(transaction, selected),
        ]);
      })
      .sort(sort.comparator || helpers.compare.adate)
      .slice(0, sliceEnd);
  }, [
    transactions,
    limit,
    showMore,
    filter,
    sort.comparator,
    filterState.data,
    search.data.results,
    manualFilter,
    category,
  ]);

  // write transaction functions
  function removeMany(transactionIds: string[]) {
    dispatch(actions.transaction.removeMany(transactionIds));
  }

  function isSubscription(installment: transactionTypes.Installment) {
    return installment !== transactionTypes.Installment.SINGLE;
  }

  function removeSubscription(transactionId: string) {
    const updatedTransactions = transactions.map(
      (transaction: transactionTypes.Transaction) => {
        if (transaction.id !== transactionId) return transaction;
        return {...transaction, subscriptionId: null, updatedAt: new Date()};
      },
    );

    dispatch(actions.transaction.patch(updatedTransactions));
  }

  function create(
    name: string,
    amount: string,
    paymentMethod: transactionTypes.PaymentMethod,
    installment: transactionTypes.Installment,
  ) {
    const id = uuid.v4() as string;
    let subscriptionId = null;
    const date = new Date();

    if (_.transactions.isSubscription({installment})) {
      const subscription = subscriptions.create(
        name,
        amount,
        paymentMethod,
        installment,
      );
      subscriptionId = subscription.id;
    }

    dispatch(
      actions.transaction.append({
        name,
        amount,
        paymentMethod,
        installment,
        subscriptionId,
        id,
        date,
        createdAt: date,
        updatedAt: date,
      }),
    );

    return {transactionId: id, subscriptionId};
  }

  function select(transaction: string | transactionTypes.Transaction) {
    let selected: transactionTypes.Transaction;

    if (typeof transaction === 'string') {
      selected = transactions.filter(
        (t: transactionTypes.Transaction) => t.id === transaction,
      )[0];
    } else {
      selected = transaction;
    }

    dispatch(actions.transaction.select(selected));
  }

  function remove(id: string) {
    const t = transactions.filter(
      (t: transactionTypes.Transaction) => t.id === id,
    )[0];

    if (_.transactions.isSubscription(t)) {
      subscriptions.freeze(t.subscriptionId);
    }

    dispatch(actions.transaction.remove(id));
  }

  function autoCreateSubscriptionTransaction(
    transaction: transactionTypes.Transaction,
  ) {
    const id = uuid.v4() as string;
    const date = _.transactions.getUpdatedSubscriptionDate(transaction);
    const subscription = subscriptions.data.filter(
      (subscription: subscriptionTypes.Subscription) =>
        subscription.id === transaction.subscriptionId,
    );

    if (subscription.length === 0) {
      return snackbar.createAndShow('Could not automatically add transaction');
    }

    const updated = {...transaction, id, date, amount: subscription[0].amount};

    dispatch(actions.transaction.append(updated));

    return {transactionId: id};
  }

  return {
    all: transactions,
    modified: modifiedTransactions,
    create,
    select,
    remove,
    isSubscription,
    removeSubscription,
    autoCreateSubscriptionTransaction,
  };
}
