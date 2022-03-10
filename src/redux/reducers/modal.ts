import {MODAL_NOT_VISIBLE, MODAL_VISIBLE} from '../constants/modal';
import {modalTypes} from '../../types';

const initialState: modalTypes.Props = {
  modalVisible: modalTypes.ModalVisible.NONE,
};

export default function modalReducer(state = initialState, action: any) {
  const {type, modalVisible} = action || {};
  switch (type) {
    case MODAL_VISIBLE:
      return {
        ...state,
        modalVisible,
      };
    case MODAL_NOT_VISIBLE:
      return {
        ...state,
        modalVisible: modalTypes.ModalVisible.NONE,
      };
    default:
      return state;
  }
}
