import {appTypes} from '.';

export enum Separator {
  'DAYS',
  'WEEKS',
  'MONTHS',
  'YEARS',
}

export interface SpreadSheet {
  [index: string]: string | Separator | appTypes.Status | undefined;
  id: string;
  title?: string;
  from?: string;
  to?: string;
  separator: Separator;
  numberOfDays: number;
}

export interface InitialState {
  sheets: SpreadSheet[] | [];
  status: appTypes.Status;
}
