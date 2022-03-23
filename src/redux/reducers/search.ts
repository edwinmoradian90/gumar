import {constants} from '..';
import {searchTypes} from '../../types';

const initialState: searchTypes.State = {
  isFocused: false,
  query: '',
  results: [],
};

export default function searchReducer(state = initialState, action: any) {
  const {
    type,
    results = state.results,
    query = state.query,
    isFocused = state.isFocused,
  } = action || {};
  switch (type) {
    case constants.search.FOCUS:
      return {
        ...state,
        isFocused: true,
      };
    case constants.search.BLUR:
      return {
        ...state,
        isFocused: false,
      };
    case constants.search.UPDATE:
      return {
        ...state,
        query,
        results,
        isFocused,
      };
    case constants.search.CLEAR:
      return initialState;
    default:
      return state;
  }
}
