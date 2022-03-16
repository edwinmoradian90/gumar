import {constants} from '..';
import {currencies} from '../../data/currency';

const initialState = {
  id: currencies[0].id,
  name: currencies[0].name,
  fullName: currencies[0].fullName,
  symbol: currencies[0].symbol,
};

export default function currencyReducer(state = initialState, action: any) {
  const {currency, type} = action || {};
  switch (type) {
    case constants.currency.SET_CURRENCY:
      return {
        ...state,
        ...currency,
      };
    default:
      return state;
  }
}
