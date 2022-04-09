import {constants} from '..';
import {subscriptionTypes} from '../../types';

export function create(updatedSubscriptions: subscriptionTypes.Subscription[]) {
  return {type: constants.subscriptions.CREATE, data: updatedSubscriptions};
}

export function update(updatedSubscriptions: subscriptionTypes.Subscription[]) {
  return {
    type: constants.subscriptions.UPDATE,
    data: updatedSubscriptions,
  };
}

export function remove(updatedSubscriptions: subscriptionTypes.Subscription[]) {
  return {
    type: constants.subscriptions.REMOVE,
    data: updatedSubscriptions,
  };
}

export function removeAll() {
  return {type: constants.subscriptions.REMOVE_ALL};
}
