import {constants} from '..';
import {appTypes, storeTypes} from '../../types';

export function setMode(mode: appTypes.Mode) {
  return {type: constants.app.SET_MODE, mode};
}

export function setStatus(status: appTypes.Status) {
  return {type: constants.app.SET_STATUS, status};
}

export function setEditTarget(editTarget: appTypes.EditTarget) {
  return {type: constants.app.SET_EDIT_TARGET, editTarget};
}
