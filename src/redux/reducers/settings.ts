import {settingTypes} from '../../types';
import {
  SELECT_CURRENCY,
  SELECT_SETTING,
  SET_PASSWORD,
  SET_PASSWORD_STATE,
} from '../constants/settings';

const initialState: settingTypes.State = {
  selected: null,
  currencyId: 'usd',
  currencySymbol: '$',
  currencyFullName: 'United States Dollar',
  isUsingPassword: false,
  password: '',
};

export default function settingsReducer(state = initialState, action: any) {
  const {
    type,
    selected,
    currencyFullName,
    currencySymbol,
    currencyId,
    isUsingPassword,
    password,
  } = action || {};
  switch (type) {
    case SELECT_SETTING:
      return {
        ...state,
        selected,
      };
    case SELECT_CURRENCY:
      return {
        ...state,
        currencyId,
        currencyFullName,
        currencySymbol,
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
