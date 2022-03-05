import {Status} from '../../utils/ds';

const appInitialState = {
  sheets: [],
  transactions: [],
  status: Status.SUCCESS,
};

export default function appReducer(state = appInitialState, action: any) {
  const {type} = action || {};
  switch (type) {
    default:
      return state;
  }
}
