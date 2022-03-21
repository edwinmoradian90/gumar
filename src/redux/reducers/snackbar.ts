import {constants} from '..';
import {snackbarTypes} from '../../types';

const initialState: snackbarTypes.State = {
  visible: false,
  message: '',
  onDismiss: () => {},
  actionLabel: '',
  actionOnpress: () => {},
};

export default function snackbarReducer(state = initialState, action: any) {
  const {message, onDismiss, actionLabel, actionOnpress, type} = action || {};
  switch (type) {
    case constants.snackbar.SET_VISIBLE:
      return {
        ...state,
        visible: true,
        message: message || state.message,
        onDismiss: onDismiss || state.onDismiss,
        actionLabel: actionLabel || state.actionLabel,
        actionOnpress: actionOnpress || state.actionOnpress,
      };
    case constants.snackbar.SET_NOT_VISIBLE:
      return initialState;
    default:
      return state;
  }
}
