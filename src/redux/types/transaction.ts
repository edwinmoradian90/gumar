import {Transaction} from '../../types/app';

export interface TransactionState {
  status: string;
  selected: Transaction | null;
  transactions: Transaction[] | [];
  error: typeof Error | null;
}
