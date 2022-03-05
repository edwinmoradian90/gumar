export enum ModalVisible {
  'EXPORT',
  'ADD',
  'FILTER',
  'PASSWORD',
  'NONE',
}

export interface ModalProps {
  modalVisible: ModalVisible;
}
