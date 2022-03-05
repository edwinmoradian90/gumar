import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, Dispatch} from 'redux';
import {
  ACTION_TRANSACTION,
  ACTION_TRANSACTION_SUCCESS,
  ACTION_TRANSACTION_FAILURE,
  SELECT_TRANSACTION,
} from '../constants/transaction';
import {STORE, TRANSACTIONS} from '../../constants/shared';
import {Transaction} from '../../types/app';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../types/store';
import {Alert} from 'react-native';
import {setModalVisible} from './modal';
import {ModalVisible} from '../types/modal';

function parseTransactions(transaction: string | null): Transaction[] | [] {
  return typeof transaction === 'string' ? JSON.parse(transaction) : [];
}

export function getTransactions(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async dispatch => {
    try {
      dispatch({type: ACTION_TRANSACTION});
      const store: RootState = JSON.parse(
        (await AsyncStorage.getItem(STORE)) || '',
      );

      const transactions =
        store.transaction.transactions !== null
          ? store.transaction.transactions
          : [];
      dispatch({type: ACTION_TRANSACTION_SUCCESS, transactions});
    } catch (error) {
      console.error(error);
      dispatch({type: ACTION_TRANSACTION_FAILURE, error});
    }
  };
}

export function appendTransaction(
  newTransaction: Transaction,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return (dispatch, getState) => {
    try {
      dispatch({type: ACTION_TRANSACTION});
      const {transactions} = getState().transaction;
      dispatch({
        type: ACTION_TRANSACTION_SUCCESS,
        transactions: [...transactions, newTransaction],
      });
      Alert.alert('Transaction created.', '', [
        {
          text: 'Add another',
          onPress: () => dispatch(setModalVisible(ModalVisible.ADD)),
        },
        {
          text: 'Close',
        },
      ]);
    } catch (error) {
      console.error(error);
      dispatch({type: ACTION_TRANSACTION_FAILURE, error});
    }
  };
}
export function updateTransaction(
  id: string,
  updatedTransaction: Transaction,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return (dispatch, getState) => {
    const {transactions} = getState().transaction;
    try {
      dispatch({type: ACTION_TRANSACTION});
      const updatedTransactions = transactions.map(
        (transaction: Transaction) => {
          if (transaction.id === id) {
            return {...transaction, ...updatedTransaction};
          }

          return transaction;
        },
      );

      dispatch({
        type: ACTION_TRANSACTION_SUCCESS,
        transactions: updatedTransactions,
      });
    } catch (error) {
      console.error(error);
      dispatch({type: ACTION_TRANSACTION_FAILURE, error});
    }
  };
}

export function removeTransaction(
  selectedId: string,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return (dispatch, getState) => {
    try {
      dispatch({type: ACTION_TRANSACTION});
      const {transactions} = getState().transaction;
      const newTransactions = transactions.filter(
        (transaction: Transaction) => transaction.id !== selectedId,
      );
      dispatch({
        type: ACTION_TRANSACTION_SUCCESS,
        transactions: newTransactions,
      });
    } catch (error) {
      console.error(error);
      dispatch({type: ACTION_TRANSACTION_FAILURE, error});
    }
  };
}

export function selectTransaction(selected: Transaction) {
  return {type: SELECT_TRANSACTION, selected};
}
