import {settingTypes} from '../../types';
import {
  SELECT_CURRENCY,
  SELECT_SETTING,
  SET_PASSWORD,
  SET_PASSWORD_STATE,
} from '../constants/settings';

const initialState: settingTypes.InitialState = {
  selected: null,
  currency: 'usd',
  isUsingPassword: false,
  password: '',
};

export default function settingsReducer(state = initialState, action: any) {
  const {type, selected, currency, isUsingPassword, password} = action || {};
  switch (type) {
    case SELECT_SETTING:
      return {
        ...state,
        selected,
      };
    case SELECT_CURRENCY:
      return {
        ...state,
        currency,
      };
    case SET_PASSWORD_STATE:
      return {
        ...state,
        isUsingPassword,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password,
      };
    default:
      return state;
  }
}
