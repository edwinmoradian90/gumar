import {constants} from '..';
import {filterTypes, transactionTypes} from '../../types';

export const initialState: filterTypes.InitialState = {
  isUsingFilter: false,
  isDescending: false,
  name: '',
  paymentMethods: [],
  installments: [],
  paymentIntervals: [],
  amountRangeFrom: '',
  amountRangeTo: '',
  dateRangeFrom: null,
  dateRangeTo: null,
};

export default function filterReducer(state = initialState, action: any) {
  const {filter, isUsingFilter, type} = action || {};
  switch (type) {
    case constants.filter.TOGGLE_FILTER:
      return {
        ...state,
        isUsingFilter,
      };
    case constants.filter.CREATE:
      return {
        ...state,
        ...filter,
      };
    case constants.filter.UPDATE:
      return {
        ...state,
        ...filter,
      };
    case constants.filter.CLEAR:
      return initialState;
    default:
      return state;
  }
}
