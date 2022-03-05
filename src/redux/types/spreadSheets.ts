import {Status} from '../../types/app';

export enum Separator {
  'days',
  'weeks',
  'months',
  'years',
}

export interface SpreadSheetProps {
  [index: string]: string | Separator | Status | undefined;
  id: string;
  title?: string;
  from?: string;
  to?: string;
  separator: Separator;
  numberOfDays: number;
}
