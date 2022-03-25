import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {constants} from '..';
import {selectTypes, storeTypes} from '../../types';

function setSelectionArray(selectionArray: selectTypes.SelectionArray) {
  return {type: constants.select.aselection.SET, aselection: selectionArray};
}

function appendSelectionArrayItem(
  selectionArrayItem: selectTypes.ArrayItem,
): ThunkAction<void, storeTypes.RootState, null, AnyAction> {
  return (dispatch, getState) => {
    const {aselection = []} = getState().select;
    const selectionArray = [...aselection, selectionArrayItem];

    return dispatch({
      type: constants.select.selected.SET,
      aselection: selectionArray,
    });
  };
}

function removeSelectionArrayItem(
  selectedId: string,
): ThunkAction<void, storeTypes.RootState, null, AnyAction> {
  return (dispatch, getState) => {
    const {aselection = []} = getState().select;
    if (aselection.length === 0)
      return dispatch({
        type: constants.select.aselection.REMOVE,
        aselection,
      });

    const newSelection =
      aselection.filter((s: selectTypes.ArrayItem) => s.id !== selectedId) ||
      aselection;

    return dispatch({
      type: constants.select.selected.SET,
      aselection: newSelection,
    });
  };
}

function setSelectionObjectProperty(
  name: string,
  newSelectionObject: selectTypes.SelectionObject,
): ThunkAction<void, storeTypes.RootState, null, AnyAction> {
  return (dispatch, getState) => {
    const {oselection = {}} = getState().select;
    const data = {...oselection, [name]: newSelectionObject};

    dispatch({
      type: constants.select.oselection.SET,
      oselection: data,
    });
  };
}

function removeSelectionObjectProperty(
  name: string,
): ThunkAction<void, storeTypes.RootState, null, AnyAction> {
  return (dispatch, getState) => {
    const {oselection = {}} = getState().select;
    const {[name]: removed, ...selectionObject} = oselection || {};
    dispatch({
      type: constants.select.oselection.SET,
      oselection: selectionObject,
    });
  };
}

function clearSelectionObject() {
  return {type: constants.select.oselection.CLEAR};
}

function clearSelectionArray() {
  return {type: constants.select.aselection.CLEAR};
}

function clearSelected() {
  return {type: constants.select.selected.CLEAR};
}

function setSelected(selected: string) {
  return {type: constants.select.selected.SET, selected};
}

export function update(select: Partial<selectTypes.State>) {
  return {type: constants.select.UPDATE, select};
}

export function clear() {
  return {type: constants.select.CLEAR};
}

export const aselection = {
  set: setSelectionArray,
  append: appendSelectionArrayItem,
  remove: removeSelectionArrayItem,
  clear: clearSelectionArray,
};

export const oselection = {
  set: setSelectionObjectProperty,
  clear: clearSelectionObject,
  removeOne: removeSelectionObjectProperty,
};

export const selected = {
  set: setSelected,
  clear: clearSelected,
};
