import {constants} from '..';
import {subscriptionTypes} from '../../types';

const initialState: subscriptionTypes.State = {
  data: [],
};

export default function subscriptionReducer(state = initialState, action: any) {
  const {type, data} = action || {};

  switch (type) {
    case constants.subscriptions.UPDATE:
      return {
        ...state,
        data,
      };
    case constants.subscriptions.CREATE:
      return {
        ...state,
        data,
      };
    case constants.subscriptions.REMOVE:
      return {
        ...state,
        data,
      };
    case constants.subscriptions.REMOVE_ALL:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
}
