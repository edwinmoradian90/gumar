import {modalTypes} from '../../types';
import {MODAL_NOT_VISIBLE, MODAL_VISIBLE} from '../constants/modal';

export function setVisible(modalVisible: modalTypes.ModalVisible) {
  return {type: MODAL_VISIBLE, modalVisible};
}

export function setNotVisible() {
  return {type: MODAL_NOT_VISIBLE};
}
