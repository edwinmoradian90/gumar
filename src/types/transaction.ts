export enum PaymentMethod {
  'CASH' = 'cash',
  'CREDIT' = 'credit',
  'DEBIT' = 'debit',
  'CHECK' = 'check',
  'OTHER' = 'other',
}

export enum PaymentInterval {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUALLY = 'semiAnnually',
  ANNUALLY = 'annually',
  OTHER = 'other',
  NONE = 'none',
}

export enum Installment {
  SINGLE = 'single',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUALLY = 'semiAnnually',
  ANNUALLY = 'annually',
  NONE = 'none',
  OTHER = 'other',
}

export interface InitialState {
  status: string;
  selected: Transaction | null;
  transactions: Transaction[] | [];
  error: typeof Error | null;
}

export interface Transaction {
  [index: string]: string | Date | PaymentMethod | null;
  id: string;
  name: string;
  amount: string;
  paymentMethod: PaymentMethod;
  installment: Installment;
  subscriptionId: string | null;
  date: Date;
}
