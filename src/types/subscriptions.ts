import {transactionTypes} from '.';

export interface Subscription {
  id: string;
  name: string;
  amount: string;
  frozen: boolean;
  paymentInterval: transactionTypes.Installment;
  recent: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface State {
  data: Subscription[];
}
