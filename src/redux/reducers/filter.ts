import {filterTypes, transactionTypes} from '../../types';

const initialState: filterTypes.InitialState = {
  isUsingFilter: false,
  isDescending: false,
  transactionName: '',
  paymentMethod: transactionTypes.PaymentMethod.CASH,
  installmentType: transactionTypes.InstallmentType.SINGLE,
  paymentInterval: transactionTypes.PaymentInterval.NONE,
  rangeFrom: 0,
  rangeTo: 0,
  dateFrom: null,
  dateTo: null,
};

export default function filterReducer(state = initialState, action: any) {
  const {type} = action || {};
  switch (type) {
    default:
      return state;
  }
}
