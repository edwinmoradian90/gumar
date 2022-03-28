import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {storeTypes, transactionTypes} from '../types';
import {filter, helpers} from '../utils';
import {useFilter, useSearch, useSort} from '.';

// move to types
interface UseTransactionsProps {
  limit?: number;
  additionalLimit?: number;
  isSearchResult?: boolean;
  showMore?: boolean;
}

export default function useTransactions(
  props?: UseTransactionsProps,
): transactionTypes.Transaction[] {
  const {
    limit = 0,
    additionalLimit = 7,
    isSearchResult = false,
    showMore = false,
  } = props || {};
  const dispatch = useDispatch();
  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

  const filterState = useFilter();
  const sort = useSort();
  const search = useSearch();

  const modifiedTransactions: transactionTypes.Transaction[] = useMemo(() => {
    const sliceEnd = !!limit
      ? showMore
        ? limit + additionalLimit
        : limit
      : transactions.length;

    if (transactions.length === 0) return [];
    // TODO: extract out
    if (search.data.results.length > 0 && isSearchResult)
      return search.data.results.sort(sort.comparator || helpers.compare.adate);

    return transactions
      .filter((transaction: transactionTypes.Transaction) => {
        return filter.apply([
          filter.conditions.paymentMethod(
            transaction,
            filterState.data.paymentMethod,
          ),
          filter.conditions.dateRange(
            transaction,
            filterState.data.dateRangeFrom,
            filterState.data.dateRangeTo,
          ),
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
  ]);
  // write transaction functions
  function removeMany(transactionIds: string[]) {
    dispatch(actions.transaction.removeMany(transactionIds));
  }

  return modifiedTransactions;
}
