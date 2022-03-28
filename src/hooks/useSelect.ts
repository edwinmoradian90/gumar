import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {selectTypes, storeTypes} from '../types';
import {helpers} from '../utils';

export default function useSelect() {
  const dispatch = useDispatch();
  const {selected, aselection, oselection} = useSelector(
    (state: storeTypes.RootState) => state.select,
  );

  function getSelectionObjectProperty(
    name: string,
  ): selectTypes.SelectionObject {
    return oselection[name] || {};
  }

  function filterSelectionObject(
    selectionObject: selectTypes.SelectionObject,
    value: any,
  ): string[] {
    return helpers.keyFilter(selectionObject, value);
  }

  function setAllSelectionObjectProperty(name: string, value: any = false) {
    const updated: selectTypes.SelectionObject = {};
    Object.keys(oselection[name]).forEach(
      (key: string) => (updated[key] = value),
    );
    dispatch(actions.select.oselection.set(name, updated));
  }

  function hasAnySelected(name: string, value: any = true) {
    const selectionObject = oselection[name];
    return helpers.isArrayAny(filterSelectionObject(selectionObject, value));
  }

  function clearSelectionObject() {
    dispatch(actions.select.oselection.clear());
  }

  function setSelectionObject(
    name: string,
    selectionObject: selectTypes.SelectionObject,
  ) {
    dispatch(actions.select.oselection.set(name, selectionObject));
  }

  function setSelectionArray(selectionArray: selectTypes.SelectionArray) {
    return dispatch(actions.select.aselection.set(selectionArray));
  }

  const selectionArray = {
    set: setSelectionArray,
    data: aselection,
  };

  const selectionObject = {
    get: getSelectionObjectProperty,
    set: setSelectionObject,
    filter: filterSelectionObject,
    setAll: setAllSelectionObjectProperty,
    clear: clearSelectionObject,
    data: oselection,
    hasAnySelected: hasAnySelected,
  };

  return {selectionArray, selectionObject, selected};
}
