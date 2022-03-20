import moment from 'moment';
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
  {
    const {paymentMethod, dateRangeFrom, dateRangeTo} = props || {};

    const {transactions} = useSelector(
      (state: storeTypes.RootState) => state.transaction,
    );
    const {name} = useSelector((state: storeTypes.RootState) => state.currency);

    const symbol = getSymbolFromCurrency(name) || '$';

    if (transactions.length === 0) return ['0', symbol];

    // event emitter.removelistener('change') error caused by useMemo
    const total = useMemo(() => {
      return transactions
        .filter((transaction: transactionTypes.Transaction) =>
          filter.apply([
            filter.conditions.paymentMethod(transaction, paymentMethod),
            filter.conditions.dateRange(
              transaction,
              dateRangeFrom,
              dateRangeTo,
            ),
          ]),
        )
        .reduce(
          (a: number, b: transactionTypes.Transaction) =>
            a + parseInt(b.amount),
          0,
        );
    }, [transactions, paymentMethod, dateRangeFrom, dateRangeTo]);

    return [total, symbol];
  }
}
