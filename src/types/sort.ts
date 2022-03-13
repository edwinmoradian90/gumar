import {sortTypes} from '.';

export enum SortBy {
  AMOUNT = 'amount',
  DATE = 'date',
  NAME = 'name',
}

export interface State {
  sortBy: sortTypes.SortBy;
  isDescending: boolean;
}
