import {
  ACTION_TRANSACTION_FAILURE,
  ACTION_TRANSACTION_SUCCESS,
  ACTION_TRANSACTION,
  SELECT_TRANSACTION,
} from '../constants/transaction';
import {appTypes, transactionTypes} from '../../types';

const initialState: transactionTypes.InitialState = {
  status: appTypes.Status.SUCCESS,
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
        status: appTypes.Status.LOADING,
      };
    case ACTION_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions,
        status: appTypes.Status.SUCCESS,
      };
    case ACTION_TRANSACTION_FAILURE:
      return {
        ...state,
        error,
        status: appTypes.Status.ERROR,
      };
    default:
      return state;
  }
}
