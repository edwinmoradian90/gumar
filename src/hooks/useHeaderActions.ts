import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {modalTypes, storeTypes} from '../types';

export default function useHeaderActions(overrideActions?: any) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {selected} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

  function handleRemoveTransaction() {
    dispatch(actions.transaction.remove(selected.id));
    navigation.goBack();
  }

  function handleNewTransaction() {
    dispatch(actions.modal.setVisible(modalTypes.ModalVisible.ADD));
  }

  function handleGoBack() {
    if (navigation.canGoBack()) navigation.goBack();
  }

  function handleFilter() {
    dispatch(actions.modal.setVisible(modalTypes.ModalVisible.FILTER));
  }

  function handleExport() {
    console.log('EXPORT');
    dispatch(actions.modal.setVisible(modalTypes.ModalVisible.EXPORT));
  }

  function handleClose() {
    dispatch(actions.modal.setNotVisible());
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
