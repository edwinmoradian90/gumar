export enum PaymentMethod {
  'CASH',
  'CREDIT',
  'DEBIT',
  'OTHER',
}

export enum PaymentInterval {
  'NONE',
  'DAILY',
  'WEEKLY',
  'BIWEEKLY',
  'MONTHLY',
  'SEMIANNUALLY',
  'ANNUALLY',
  'OTHER',
}

export enum InstallmentType {
  'SINGLE',
  'RECURRING',
  'OTHER',
}

export interface InitialState {
  status: string;
  selected: Transaction | null;
  transactions: Transaction[] | [];
  error: typeof Error | null;
}

export interface Transaction {
  [index: string]: string | Date | PaymentMethod;
  id: string;
  name: string;
  amount: string;
  paymentMethod: PaymentMethod;
  date: Date;
}
