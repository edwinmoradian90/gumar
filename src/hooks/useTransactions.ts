import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions, constants} from '../redux';
import {storeTypes, transactionTypes} from '../types';
import {filter, helpers} from '../utils';

export default function useTransactions({
  paymentMethod,
  dateRangeFrom,
  dateRangeTo,
  sortBy,
  limit = 0,
  extendedLimit = 0,
  startSpace = 0,
  isSearchResult = false,
  showMore = false,
}: {
  paymentMethod?: transactionTypes.PaymentMethod;
  dateRangeFrom?: string;
  dateRangeTo?: string;
  sortBy?: (a: any, b: any) => -1 | 1 | 0;
  limit?: number;
  extendedLimit?: number;
  startSpace?: number;
  isSearchResult?: boolean;
  showMore?: boolean;
}): transactionTypes.Transaction[] {
  const dispatch = useDispatch();
  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const search = useSelector((state: storeTypes.RootState) => state.search);

  const modifiedTransactions: transactionTypes.Transaction[] = useMemo(() => {
    console.log('RUNNING');
    if (transactions.length === 0) return [];

    // TODO: extract out
    if (search.results.length > 0 && isSearchResult)
      return search.results.sort(sortBy || helpers.compare.adate);

    return transactions
      .filter((transaction: transactionTypes.Transaction) => {
        return filter.apply([
          filter.conditions.paymentMethod(transaction, paymentMethod),
          filter.conditions.dateRange(transaction, dateRangeFrom, dateRangeTo),
        ]);
      })
      .sort(sortBy || helpers.compare.adate)
      .slice(
        0,
        (limit && (showMore ? limit + extendedLimit : limit)) ||
          transactions.length,
      );
  }, [transactions, limit, showMore, filter, sortBy]);

  function removeMany(transactionIds: string[]) {
    dispatch(actions.transaction.removeMany(transactionIds));
  }

  return modifiedTransactions;
}
