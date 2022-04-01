import {modalTypes} from '../types';
import useModal from './useModal';

export default function useExport() {
  const modal = useModal();

  function show() {
    modal.show(modalTypes.ModalVisible.EXPORT);
  }

  function hide() {
    modal.hide();
  }

  return {
    show,
    hide,
  };
}
