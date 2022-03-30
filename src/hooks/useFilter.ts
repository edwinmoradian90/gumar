import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {filterTypes, modalTypes, storeTypes} from '../types';

export default function useFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: storeTypes.RootState) => state.filter);

  const isEnabled = filter.isUsingFilter;

  function update(filter: Partial<filterTypes.State>) {
    dispatch(actions.filter.update(filter));
  }

  function enable() {
    dispatch(actions.filter.enable());
  }

  function disable() {
    dispatch(actions.filter.disable());
  }

  function show() {
    dispatch(actions.filter.enable());
    dispatch(actions.modal.setVisible(modalTypes.ModalVisible.FILTER));
  }

  function hide() {
    dispatch(actions.filter.disable());
    dispatch(actions.modal.setNotVisible());
  }

  function hideAndReset() {
    dispatch(actions.modal.setNotVisible());
    dispatch(actions.filter.clear());
  }

  function reset() {
    dispatch(actions.filter.clear());
  }

  return {
    update,
    enable,
    disable,
    show,
    hide,
    hideAndReset,
    reset,
    isEnabled,
    data: filter,
  };
}
