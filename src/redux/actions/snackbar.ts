import {constants} from '..';
import {snackbarTypes} from '../../types';

export function setVisible(snackbar: Partial<snackbarTypes.State>) {
  return {type: constants.snackbar.SET_VISIBLE, ...snackbar};
}

export function setNotVisible() {
  return {type: constants.snackbar.SET_NOT_VISIBLE};
}
