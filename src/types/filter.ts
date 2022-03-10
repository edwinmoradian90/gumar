import {transactionTypes} from '.';

export interface InitialState {
  isUsingFilter: boolean;
  isDescending: boolean;
  transactionName: string;
  paymentMethod: transactionTypes.PaymentMethod;
  installmentType: transactionTypes.InstallmentType;
  paymentInterval: transactionTypes.PaymentInterval;
  rangeFrom: number;
  rangeTo: number;
  dateFrom: Date | null;
  dateTo: Date | null;
}
