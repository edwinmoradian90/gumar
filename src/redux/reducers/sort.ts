import {constants} from '..';
import {sortTypes} from '../../types';

const initialState: sortTypes.State = {
  sortBy: sortTypes.SortBy.DATE,
  isDescending: false,
};

export default function sortReducer(state = initialState, action: any) {
  const {isDescending, sortBy, type} = action || {};
  switch (type) {
    case constants.sort.SET_SORT_BY:
      return {
        ...state,
        sortBy,
      };
    case constants.sort.SET_IS_DESCENDING:
      return {
        ...state,
        isDescending,
      };
    default:
      return state;
  }
}
