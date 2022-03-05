const initialFilterState = {
  isUsingFilter: false,
  isDescending: false,
  transactionName: '',
  paymentMethod: 'none',
  installmentType: 'single',
  paymentInterval: 'none',
  rangeFrom: 0,
  rangeTo: 0,
  dateFrom: Date,
  dateTo: Date,
};

export default function filterReducer(state = initialFilterState, action: any) {
  const {type} = action || {};
  switch (type) {
    default:
      return state;
  }
}
