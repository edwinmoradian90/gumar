import {transactionTypes} from '.';

export interface Subscription {
  id: string;
  frozen: boolean;
  paymentInterval: transactionTypes.Installment;
  date: Date;
}

export interface State {
  data: Subscription[];
}
