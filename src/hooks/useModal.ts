import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {modalTypes, storeTypes} from '../types';
import {helpers} from '../utils';

export default function useModal(): any {
  const dispatch = useDispatch();
  const modal = useSelector((state: storeTypes.RootState) => state.modal);

  const isVisible = modal.modalVisible !== modalTypes.ModalVisible.NONE;
  const current = modal.modalVisible;

  const modals = useMemo(() => {
    const modals: {[index: string]: boolean} = {};
    Object.keys(modalTypes.ModalVisible).forEach((key: string) => {
      const value =
        modalTypes.ModalVisible[key as keyof typeof modalTypes.ModalVisible];
      return (modals[`is${helpers.capitalize(value)}Modal`] =
        modal.modalVisible === value);
    });

    return modals;
  }, [modal.modalVisible]);

  function show(modal: modalTypes.ModalVisible) {
    dispatch(actions.modal.setVisible(modal));
  }

  function hide() {
    dispatch(actions.modal.setNotVisible());
  }

  return {show, hide, isVisible, current, data: modal, ...modals};
}
