import moment from 'moment';
import {transactionTypes} from '../../types';

export function getUpdatedSubscriptionDate(
  transaction: transactionTypes.Transaction,
): Date {
  let updated: Date = new Date();

  switch (transaction.installment) {
    case transactionTypes.Installment.SINGLE:
      break;
    case transactionTypes.Installment.DAILY:
      updated = moment(transaction.date).add(1, 'days').toDate();
      break;
    case transactionTypes.Installment.WEEKLY:
      updated = moment(transaction.date).add(1, 'week').toDate();
      break;
    case transactionTypes.Installment.BIWEEKLY:
      updated = moment(transaction.date).add(2, 'weeks').toDate();
      break;
    case transactionTypes.Installment.MONTHLY:
      updated = moment(transaction.date).add(1, 'month').toDate();
      break;
    case transactionTypes.Installment.QUARTERLY:
      updated = moment(transaction.date).add(3, 'month').toDate();
      break;
    case transactionTypes.Installment.SEMI_ANNUALLY:
      updated = moment(transaction.date).add(6, 'months').toDate();
      break;
    case transactionTypes.Installment.ANNUALLY:
      updated = moment(transaction.date).add(1, 'year').toDate();
      break;
    default:
      break;
  }

  return updated;
}

export function shouldAutoPopulate(
  transaction: transactionTypes.Transaction,
): boolean {
  let result: boolean = false;
  switch (transaction.installment) {
    case transactionTypes.Installment.SINGLE:
      break;
    case transactionTypes.Installment.DAILY:
      result = moment().subtract(1, 'days').isAfter(transaction.date);
      break;
    case transactionTypes.Installment.WEEKLY:
      result = moment().subtract(1, 'week').isAfter(transaction.date);
      break;
    case transactionTypes.Installment.BIWEEKLY:
      result = moment().subtract(2, 'weeks').isAfter(transaction.date);
      break;
    case transactionTypes.Installment.MONTHLY:
      result = moment().subtract(1, 'month').isAfter(transaction.date);
      break;
    case transactionTypes.Installment.QUARTERLY:
      result = moment().subtract(3, 'month').isAfter(transaction.date);
      break;
    case transactionTypes.Installment.SEMI_ANNUALLY:
      result = moment().subtract(6, 'months').isAfter(transaction.date);
      break;
    case transactionTypes.Installment.ANNUALLY:
      result = moment().subtract(1, 'year').isAfter(transaction.date);
      break;
    default:
      break;
  }

  return result;
}

export function isSubscription(transaction: transactionTypes.Transaction) {
  return transaction.installment !== transactionTypes.Installment.SINGLE;
}

export function hasSubscriptionId(transaction: transactionTypes.Transaction) {
  return transaction.subscriptionId !== null;
}

export function isMostRecent(
  mostRecent: transactionTypes.Transaction,
  current: transactionTypes.Transaction,
) {
  return moment(current.date).isBefore(mostRecent.date);
}

export function recentSubscriptionMap(
  transactions: transactionTypes.Transaction[],
) {
  const grouped: {[index: string]: transactionTypes.Transaction} = {};

  transactions.forEach((transaction: transactionTypes.Transaction) => {
    const subscriptionId = transaction.subscriptionId || '';
    let mostRecent = grouped[subscriptionId];

    if (!subscriptionId || !isSubscription(transaction)) return;
    if (!mostRecent) return (grouped[subscriptionId] = transaction);
    if (isMostRecent(mostRecent, transaction)) return;

    grouped[subscriptionId] = transaction;
  });

  return grouped;
}

export function getSubscriptions(transactions: transactionTypes.Transaction[]) {
  if (transactions.length === 0) return [];
  return transactions.filter((transaction: transactionTypes.Transaction) =>
    isSubscription(transaction),
  );
}
