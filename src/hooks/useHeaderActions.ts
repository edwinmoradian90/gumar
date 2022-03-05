import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setModalNotVisible, setModalVisible} from '../redux/actions/modal';
import {removeTransaction} from '../redux/actions/transaction';
import {RootState} from '../redux/types/store';
import {ModalVisible} from '../redux/types/modal';

export default function useHeaderActions(overrideActions?: any) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {selected} = useSelector((state: RootState) => state.transaction);

  function handleRemoveTransaction() {
    dispatch(removeTransaction(selected.id));
    navigation.goBack();
  }

  function handleNewTransaction() {
    dispatch(setModalVisible(ModalVisible.ADD));
  }

  function handleGoBack() {
    if (navigation.canGoBack()) navigation.goBack();
  }

  function handleFilter() {
    dispatch(setModalVisible(ModalVisible.FILTER));
  }

  function handleExport() {
    console.log('EXPORT');
    dispatch(setModalVisible(ModalVisible.EXPORT));
  }

  function handleClose() {
    dispatch(setModalNotVisible());
  }

  const defaultActions = {
    trash: handleRemoveTransaction,
    add: handleNewTransaction,
    back: handleGoBack,
    filter: handleFilter,
    close: handleClose,
    export: handleExport,
  };

  if (overrideActions !== undefined && typeof overrideActions === 'object') {
    return {...defaultActions, ...overrideActions};
  }

  return defaultActions;
}
