import {
  SELECT_CURRENCY,
  SELECT_SETTING,
  SET_PASSWORD,
  SET_PASSWORD_STATE,
} from '../constants/settings';
import {Selected} from '../types/settings';

export function selectSetting(selected: Selected) {
  return {type: SELECT_SETTING, selected};
}

export function selectCurrency(currency: string) {
  return {type: SELECT_CURRENCY, currency};
}

export function setPasswordUse(isUsingPassword: boolean) {
  // maybe better name for SET_PASSWORD_STATE
  return {type: SET_PASSWORD_STATE, isUsingPassword};
}

export function setPassword(password: string) {
  return {type: SET_PASSWORD, password};
}
