import {constants} from '..';
import {currencyTypes} from '../../types';

export function select(currency: currencyTypes.Currency) {
  return {type: constants.currency.SET_CURRENCY, currency};
}
