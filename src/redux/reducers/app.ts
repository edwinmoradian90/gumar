import {appTypes} from '../../types';

const appInitialState = {
  sheets: [],
  transactions: [],
  status: appTypes.Status.SUCCESS,
};

export default function appReducer(state = appInitialState, action: any) {
  const {type} = action || {};
  switch (type) {
    default:
      return state;
  }
}
