export enum ModalVisible {
  'EXPORT',
  'ADD',
  'FILTER',
  'PASSWORD',
  'NONE',
}

export interface Props {
  modalVisible: ModalVisible;
}
