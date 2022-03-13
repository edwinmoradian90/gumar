import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {constants} from '..';
import {filterTypes, storeTypes} from '../../types';

export function create(filter: Partial<filterTypes.InitialState>) {
  return {type: constants.filter.CREATE, filter};
}

export function update(
  newFilterSettings: Partial<filterTypes.InitialState>,
): ThunkAction<void, storeTypes.RootState, null, AnyAction> {
  return (dispatch, getState) => {
    const currentFilterSettings = getState().filter;
    const filter = {...currentFilterSettings, ...newFilterSettings};

    dispatch({type: constants.filter.UPDATE, filter});
  };
}

export function clear() {
  return {type: constants.filter.CLEAR};
}

export function on(isUsingFilter: boolean) {
  return {type: constants.filter.TOGGLE_FILTER, isUsingFilter};
}
