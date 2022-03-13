import {constants} from '..';
import {sortTypes} from '../../types';

export function setSortBy(sortBy: sortTypes.SortBy) {
  return {type: constants.sort.SET_SORT_BY, sortBy};
}

export function setIsDescending(isDescending: boolean) {
  return {type: constants.sort.SET_IS_DESCENDING, isDescending};
}
