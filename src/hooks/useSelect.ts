import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {selectTypes, storeTypes} from '../types';

export default function useSelect() {
  const dispatch = useDispatch();
  const {selected, aselection, oselection} = useSelector(
    (state: storeTypes.RootState) => state.select,
  );

  function getSelectionObjectProperty(
    name: string,
  ): selectTypes.SelectionObject {
    return oselection[name];
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
    clear: clearSelectionObject,
    data: oselection,
  };

  return {selectionArray, selectionObject, selected};
}
