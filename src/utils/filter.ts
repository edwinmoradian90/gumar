import moment from 'moment';
import {transactionTypes} from '../types';

export function apply(filters: {(): boolean}[], opts?: any): boolean {
  const {operator} = opts || {};

  const filterArrLen = filters.filter((f: {(): boolean}) => f()).length;
  if (!operator || operator === 'and') return filters.length === filterArrLen;
  if (operator === 'or') return filterArrLen > 0;
  return filters.length === filterArrLen;
}

function isMatch(string: string, match: string): RegExpMatchArray | null {
  const regex = new RegExp(match.toLowerCase().replace(/\s+/g, ''));
  return string.toLowerCase().replace(/\s+/g, '').match(regex);
}

function paymentMethod(
  transaction: transactionTypes.Transaction,
  paymentMethods: transactionTypes.PaymentMethod[],
) {
  return () => {
    if (!paymentMethods || paymentMethods.length === 0) return true;
    return paymentMethods.indexOf(transaction.paymentMethod) > -1;
  };
}

function installment(
  transaction: transactionTypes.Transaction,
  installments: transactionTypes.Installment[],
): () => boolean {
  return () => {
    if (!installments || installments.length === 0) return true;
    return installments.indexOf(transaction.installment) > -1;
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

function amountRange(
  transaction: transactionTypes.Transaction,
  amountRangeFrom: string,
  amountRangeTo: string,
) {
  return () => {
    if (!amountRangeFrom) return true;

    const amountInt = parseInt(transaction.amount);
    const amountRangeFromInt = parseInt(amountRangeFrom);
    const amountRangeToInt = parseInt(amountRangeTo);

    return amountInt >= amountRangeFromInt && amountInt <= amountRangeToInt;
  };
}

function category(
  transaction: transactionTypes.Transaction,
  category?: transactionTypes.PaymentMethod,
): () => boolean {
  return () => {
    if (!category) return true;
    return transaction.paymentMethod === category;
  };
}

function name(
  transaction: transactionTypes.Transaction,
  name: string,
): () => boolean {
  return () => {
    if (!name) return true;
    const match = isMatch(transaction.name, name) as RegExpMatchArray;
    return match && match.length > 0;
  };
}

function selected(
  transaction: transactionTypes.Transaction,
  selected: string[],
): () => boolean {
  return () => {
    if (selected.length === 0) return true;
    return selected.indexOf(transaction.id) > -1;
  };
}

export const conditions = {
  category,
  paymentMethod,
  installment,
  amountRange,
  dateRange,
  name,
  selected,
  isMatch,
};
