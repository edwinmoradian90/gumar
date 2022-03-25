import {constants} from '..';
import {selectTypes} from '../../types';

const initialState: selectTypes.State = {
  selected: '',
  aselection: [],
  oselection: {},
};

// TODO: determine if refactor candidate

export default function selectReducer(state = initialState, action: any) {
  const {type, selected, aselection, oselection} = action || {};
  switch (type) {
    case constants.select.UPDATE:
      return {...state, selected, aselection};
    case constants.select.CLEAR:
      return initialState;
    case constants.select.selected.SET:
      return {
        ...state,
        selected,
      };
    case constants.select.selected.CLEAR:
      return {
        ...state,
        selected: initialState.selected,
      };
    case constants.select.aselection.SET: {
      return {
        ...state,
        aselection,
      };
    }
    case constants.select.aselection.APPEND:
      return {
        ...state,
        aselection,
      };
    case constants.select.aselection.REMOVE:
      return {
        ...state,
        aselection,
      };
    case constants.select.aselection.CLEAR:
      return {
        ...state,
        aselection: initialState.aselection,
      };
    case constants.select.oselection.SET:
      return {
        ...state,
        oselection,
      };
    case constants.select.oselection.CLEAR:
      return {
        ...state,
        oselection: initialState.oselection,
      };
    default:
      return state;
  }
}
