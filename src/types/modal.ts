export enum ModalVisible {
  EXPORT = 'export',
  ADD = 'add',
  FILTER = 'filter',
  SORT_OPTIONS = 'sort_options',
  PASSWORD = 'password',
  NONE = 'none',
}

export interface Props {
  modalVisible: ModalVisible;
}
