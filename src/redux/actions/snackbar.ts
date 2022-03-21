import {constants} from '..';
import {snackbarTypes} from '../../types';

export function setVisible(snackBar: Partial<snackbarTypes.State>) {
  return {type: constants.snackbar.SET_VISIBLE, ...snackBar};
}

export function setNotVisible() {
  return {type: constants.snackbar.SET_NOT_VISIBLE};
}
