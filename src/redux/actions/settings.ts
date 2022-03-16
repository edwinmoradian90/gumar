import {settingTypes} from '../../types';
import {
  SELECT_CURRENCY,
  SELECT_SETTING,
  SET_PASSWORD,
  SET_PASSWORD_STATE,
} from '../constants/settings';

export function selectSetting(selected: settingTypes.Selected) {
  return {type: SELECT_SETTING, selected};
}

export function setPasswordUse(isUsingPassword: boolean) {
  // maybe better name for SET_PASSWORD_STATE
  return {type: SET_PASSWORD_STATE, isUsingPassword};
}

export function setPassword(password: string) {
  return {type: SET_PASSWORD, password};
}
