import moment from 'moment';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {storeTypes, transactionTypes} from '../types';

// move to types
interface UseTotalProps {
  paymentMethod?: transactionTypes.PaymentMethod;
  withSymbol?: boolean;
  dateRangeFrom?: string;
  dateRangeTo?: string;
}

export default function useTotal(props?: UseTotalProps): string {
  const {paymentMethod, withSymbol, dateRangeFrom, dateRangeTo} = props || {};

  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {symbol} = useSelector((state: storeTypes.RootState) => state.currency);

  if (transactions.length === 0) return withSymbol ? `${symbol}0` : '0';

  function paymentMethodCheck(
    transaction: transactionTypes.Transaction,
    paymentMethod: transactionTypes.PaymentMethod | undefined,
  ) {
    return () => {
      if (!paymentMethod) return true;
      return transaction.paymentMethod === paymentMethod;
    };
  }

  function dateRangeCheck(
    transaction: transactionTypes.Transaction,
    dateRangeFrom?: string,
    dateRangeTo?: string,
  ) {
    return () => {
      if (!dateRangeFrom) return true;
      return moment(transaction.date).isBetween(
        moment(dateRangeFrom),
        moment(dateRangeTo || new Date()),
      );
    };
  }

  // add type to opts
  function filter(filters: {(): boolean}[], opts?: any): boolean {
    const {operator} = opts || {};

    const filterArrLen = filters.filter((f: {(): boolean}) => f()).length;
    if (!operator || operator === 'and') return filters.length === filterArrLen;
    if (operator === 'or') return filterArrLen > 0;
    return filters.length === filterArrLen;
  }

  function filter2(transaction: transactionTypes.Transaction) {
    if (paymentMethod) {
      if (transaction.paymentMethod !== paymentMethod) return false;
    }

    if (dateRangeFrom) {
      const drt = dateRangeTo ? dateRangeTo : new Date();
      if (moment(transaction.date).isBefore(dateRangeFrom)) return false;
      if (moment(transaction.date).isAfter(drt)) return false;
    }
  }

  // if (dateRangeFrom) {
  //   const total = useMemo(() => {
  //     let total = 0;
  //     transactions.filter((transaction: transactionTypes.Transaction) => {});
  //   }, [transactions, dateRangeFrom, dateRangeTo]);
  // }

  // if (!paymentMethod) {
  //   const total = useMemo(() => {
  //     let total = 0;
  //     transactions.forEach(
  //       (transaction: transactionTypes.Transaction) =>
  //         (total += parseInt(transaction.amount)),
  //     );
  //     return total.toString();
  //   }, [transactions]);

  //   return withSymbol ? `${symbol}${total}` : total;
  // }
  // event emitter.removelistener('change') error caused by useMemo
  const total = useMemo(() => {
    const total = transactions
      .filter((transaction: transactionTypes.Transaction) =>
        filter([
          paymentMethodCheck(transaction, paymentMethod),
          dateRangeCheck(transaction, dateRangeFrom, dateRangeTo),
        ]),
      )
      .reduce(
        (a: number, b: transactionTypes.Transaction) => a + parseInt(b.amount),
        0,
      );

    return withSymbol ? `${symbol}${total || 0}` : total || 0;
  }, [transactions, paymentMethod, withSymbol, dateRangeFrom, dateRangeTo]);

  return total;
}
