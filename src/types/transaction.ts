export enum PaymentMethod {
  'CASH' = 'cash',
  'CREDIT' = 'credit',
  'DEBIT' = 'debit',
  'CHECK' = 'check',
  'OTHER' = 'other',
}

export enum PaymentInterval {
  'DAILY' = 'daily',
  'WEEKLY' = 'weekly',
  'BIWEEKLY' = 'biweekly',
  'MONTHLY' = 'monthly',
  'SEMI_ANNUALLY' = 'semiAnnually',
  'ANNUALLY' = 'annually',
  'OTHER' = 'other',
  'NONE' = 'none',
}

export enum Installment {
  'SINGLE' = 'single',
  'RECURRING' = 'recurring',
  'OTHER' = 'other',
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
