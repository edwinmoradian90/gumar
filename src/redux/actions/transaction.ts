import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction} from 'redux';
import {STORE} from '../../constants/shared';
import {ThunkAction} from 'redux-thunk';
import {Alert} from 'react-native';
import {modalTypes, storeTypes, transactionTypes} from '../../types';
import {actions, constants} from '..';

function parseTransactions(
  transaction: string | null,
): transactionTypes.Transaction[] | [] {
  return typeof transaction === 'string' ? JSON.parse(transaction) : [];
}

export function get(): ThunkAction<
  void,
  storeTypes.RootState,
  unknown,
  AnyAction
> {
  return async dispatch => {
    try {
      dispatch({type: constants.transaction.ACTION_TRANSACTION});
      const store: storeTypes.RootState = JSON.parse(
        (await AsyncStorage.getItem(STORE)) || '',
      );

      const transactions =
        store.transaction.transactions !== null
          ? store.transaction.transactions
          : [];
      dispatch({
        type: constants.transaction.ACTION_TRANSACTION_SUCCESS,
        transactions,
      });
    } catch (error) {
      console.error(error);
      dispatch({type: constants.transaction.ACTION_TRANSACTION_FAILURE, error});
    }
  };
}

export function append(
  newTransaction: transactionTypes.Transaction,
): ThunkAction<void, storeTypes.RootState, unknown, AnyAction> {
  return (dispatch, getState) => {
    try {
      dispatch({type: constants.transaction.ACTION_TRANSACTION});

      const {transactions} = getState().transaction;
      const {isUsingFilter} = getState().filter;

      if (isUsingFilter) dispatch(actions.filter.clear());

      dispatch({
        type: constants.transaction.ACTION_TRANSACTION_SUCCESS,
        transactions: [...transactions, newTransaction],
      });
    } catch (error) {
      console.error(error);
      dispatch({type: constants.transaction.ACTION_TRANSACTION_FAILURE, error});
    }
  };
}
export function update(
  id: string,
  updatedTransaction: transactionTypes.Transaction,
): ThunkAction<void, storeTypes.RootState, unknown, AnyAction> {
  return (dispatch, getState) => {
    const {transactions} = getState().transaction;
    try {
      dispatch({type: constants.transaction.ACTION_TRANSACTION});
      const updatedTransactions = transactions.map(
        (transaction: transactionTypes.Transaction) => {
          if (transaction.id === id) {
            return {...transaction, ...updatedTransaction};
          }

          return transaction;
        },
      );

      dispatch({
        type: constants.transaction.ACTION_TRANSACTION_SUCCESS,
        transactions: updatedTransactions,
      });
    } catch (error) {
      console.error(error);
      dispatch({type: constants.transaction.ACTION_TRANSACTION_FAILURE, error});
    }
  };
}

export function remove(
  selectedId: string,
): ThunkAction<void, storeTypes.RootState, unknown, AnyAction> {
  return (dispatch, getState) => {
    try {
      dispatch({type: constants.transaction.ACTION_TRANSACTION});
      const {transactions} = getState().transaction;
      const newTransactions = transactions.filter(
        (transaction: transactionTypes.Transaction) =>
          transaction.id !== selectedId,
      );
      dispatch({
        type: constants.transaction.ACTION_TRANSACTION_SUCCESS,
        transactions: newTransactions,
      });
    } catch (error) {
      console.error(error);
      dispatch({type: constants.transaction.ACTION_TRANSACTION_FAILURE, error});
    }
  };
}

export function removeAll(): ThunkAction<
  void,
  storeTypes.RootState,
  unknown,
  AnyAction
> {
  return dispatch => {
    try {
      dispatch({type: constants.transaction.ACTION_TRANSACTION});
      dispatch({
        type: constants.transaction.ACTION_TRANSACTION_SUCCESS,
        transaction: [],
      });
    } catch (error) {
      console.error(error);
      dispatch({type: constants.transaction.ACTION_TRANSACTION_FAILURE, error});
    }
  };
}

export function select(selected: transactionTypes.Transaction) {
  return {type: constants.transaction.SELECT_TRANSACTION, selected};
}
