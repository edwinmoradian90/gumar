export enum ModalVisible {
  'EXPORT',
  'ADD',
  'FILTER',
  'SORT_OPTIONS',
  'PASSWORD',
  'NONE',
}

export interface Props {
  modalVisible: ModalVisible;
}
