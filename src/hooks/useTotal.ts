import getSymbolFromCurrency from 'currency-symbol-map';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {storeTypes, transactionTypes} from '../types';
import {filter} from '../utils';

// move to types
interface UseTotalProps {
  paymentMethod?: transactionTypes.PaymentMethod;
  dateRangeFrom?: string;
  dateRangeTo?: string;
}

export default function useTotal(props?: UseTotalProps): string[] {
  const {paymentMethod, dateRangeFrom, dateRangeTo} = props || {};

  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {name} = useSelector((state: storeTypes.RootState) => state.currency);

  const symbol = getSymbolFromCurrency(name) || '$';

  // event emitter.removelistener('change') error caused by useMemo
  const total = useMemo(() => {
    if (transactions.length === 0) return '0';
    return transactions
      .filter((transaction: transactionTypes.Transaction) =>
        filter.apply([
          filter.conditions.paymentMethod(transaction, paymentMethod),
          filter.conditions.dateRange(transaction, dateRangeFrom, dateRangeTo),
        ]),
      )
      .reduce(
        (a: number, b: transactionTypes.Transaction) =>
          a + parseFloat(b.amount),
        0,
      );
  }, [transactions, dateRangeFrom, dateRangeTo, paymentMethod]);

  return [parseFloat(total).toFixed(2), symbol];
}
