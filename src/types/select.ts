export enum Status {
  CHECKED = 'checked',
  UNCHECKED = 'unchecked',
  INDETERMINATE = 'indeterminate',
}

export interface ArrayItem {
  [index: string]: any;
  id: string;
}

export interface SelectionObject {
  [index: string]: any;
}

export type SelectionArray = ArrayItem[];

export interface State {
  selected: string;
  aselection: SelectionArray;
  oselection: SelectionObject;
}
