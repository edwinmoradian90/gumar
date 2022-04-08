import {constants} from '..';
import {subscriptionTypes} from '../../types';

const initialState: subscriptionTypes.State = {
  data: [],
};

export default function subscriptionReducer(state = initialState, action: any) {
  const {type} = action || {};
  switch (type) {
    case constants.subscriptions.CREATE:
      return state;
    case constants.subscriptions.REMOVE:
      return state;
    case constants.subscriptions.REMOVE_ALL:
      return state;
    default:
      return state;
  }
}
