import {TransactionState} from '../types/transaction';
import {Status} from '../../types/app';
import {
  ACTION_TRANSACTION_FAILURE,
  ACTION_TRANSACTION_SUCCESS,
  ACTION_TRANSACTION,
  SELECT_TRANSACTION,
} from '../constants/transaction';

const initialState: TransactionState = {
  status: Status.SUCCESS,
  transactions: [],
  selected: null,
  error: null,
};

export default function transactionReducer(state = initialState, action: any) {
  const {type, transactions, selected, error} = action || {};
  switch (type) {
    case SELECT_TRANSACTION:
      return {
        ...state,
        selected,
      };
    // General cases
    case ACTION_TRANSACTION:
      return {
        ...state,
        status: Status.LOADING,
      };
    case ACTION_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions,
        status: Status.SUCCESS,
      };
    case ACTION_TRANSACTION_FAILURE:
      return {
        ...state,
        error,
        status: Status.ERROR,
      };
    default:
      return state;
  }
}
