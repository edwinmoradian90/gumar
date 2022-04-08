import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {snackbarTypes, storeTypes} from '../types';

export default function useSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: storeTypes.RootState) => state.snackbar);

  const isVisible = snackbar.visible;

  function dismiss() {
    dispatch(actions.snackbar.setNotVisible());
  }

  function create(
    message: string,
    actionLabel: string = 'Dismiss',
    actionOnpress: () => void = dismiss,
    onDismiss: () => void = dismiss,
  ) {
    return {
      message,
      actionLabel,
      actionOnpress,
      onDismiss,
    };
  }

  function show(snackbar: Partial<snackbarTypes.State>) {
    dispatch(actions.snackbar.setVisible(snackbar));
  }

  function createAndShow(
    message: string,
    actionLabel: string = 'Dismiss',
    actionOnpress: () => void = dismiss,
    onDismiss: () => void = dismiss,
  ) {
    show(create(message, actionLabel, actionOnpress, onDismiss));
  }

  function hide() {
    dispatch(actions.snackbar.setNotVisible());
  }

  return {
    create,
    show,
    createAndShow,
    hide,
    isVisible,
  };
}
