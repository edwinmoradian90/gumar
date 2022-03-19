import moment from 'moment';
import {transactionTypes} from '../types';

export function apply(filters: {(): boolean}[], opts?: any): boolean {
  const {operator} = opts || {};

  const filterArrLen = filters.filter((f: {(): boolean}) => f()).length;
  if (!operator || operator === 'and') return filters.length === filterArrLen;
  if (operator === 'or') return filterArrLen > 0;
  return filters.length === filterArrLen;
}

function paymentMethod(
  transaction: transactionTypes.Transaction,
  paymentMethod?: transactionTypes.PaymentMethod,
) {
  return () => {
    if (!paymentMethod) return true;
    return transaction.paymentMethod === paymentMethod;
  };
}

function dateRange(
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

export const conditions = {paymentMethod, dateRange};
