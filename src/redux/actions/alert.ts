import {constants} from '..';
import {alertTypes} from '../../types';

export function setVisible(alert: Partial<alertTypes.State>) {
  return {type: constants.alert.SET_VISIBLE, alert};
}

export function setNotVisible() {
  return {type: constants.alert.SET_NOT_VISIBLE};
}
