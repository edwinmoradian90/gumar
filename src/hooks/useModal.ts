import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {modalTypes, storeTypes} from '../types';

export default function useModal() {
  const dispatch = useDispatch();
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );

  const isVisible = modalVisible !== modalTypes.ModalVisible.NONE;

  function show(modal: modalTypes.ModalVisible) {
    dispatch(actions.modal.setVisible(modal));
  }

  function hide() {
    dispatch(actions.modal.setNotVisible());
  }

  return {show, hide, isVisible};
}
