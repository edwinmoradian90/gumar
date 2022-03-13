import {transactionTypes} from '.';

export interface InitialState {
  isUsingFilter: boolean;
  isDescending: boolean;
  name: string;
  paymentMethods: string[];
  installments: string[];
  paymentIntervals: string[];
  amountRangeFrom: string;
  amountRangeTo: string;
  dateRangeFrom: Date | null;
  dateRangeTo: Date | null;
}
