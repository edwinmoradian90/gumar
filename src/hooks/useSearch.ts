import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {searchTypes, storeTypes} from '../types';

export default function useSearch() {
  const dispatch = useDispatch();
  const search = useSelector((state: storeTypes.RootState) => state.search);

  function focus() {
    dispatch(actions.search.focus());
  }

  function blur() {
    dispatch(actions.search.blur());
  }

  function update(search: Partial<searchTypes.State>) {
    dispatch(actions.search.update(search));
  }

  function clear() {
    dispatch(actions.search.clear());
  }

  return {
    focus,
    blur,
    update,
    clear,
    data: search,
  };
}
