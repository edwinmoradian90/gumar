import {MODAL_NOT_VISIBLE, MODAL_VISIBLE} from '../constants/modal';
import {ModalVisible} from '../types/modal';

export function setModalVisible(modalVisible: ModalVisible) {
  return {type: MODAL_VISIBLE, modalVisible};
}

export function setModalNotVisible() {
  return {type: MODAL_NOT_VISIBLE};
}
