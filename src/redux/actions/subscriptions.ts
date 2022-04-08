import {constants} from '..';
import {subscriptionTypes} from '../../types';

export function create(updatedSubscriptions: subscriptionTypes.Subscription[]) {
  return {type: constants.subscriptions.CREATE, updatedSubscriptions};
}

export function update(updatedSubscriptions: subscriptionTypes.Subscription[]) {
  return {
    type: constants.subscriptions.UPDATE,
    subscriptions: updatedSubscriptions,
  };
}

export function remove(updatedSubscriptions: subscriptionTypes.Subscription[]) {
  return {
    type: constants.subscriptions.REMOVE,
    subscriptions: updatedSubscriptions,
  };
}

export function removeAll() {
  return {type: constants.subscriptions.REMOVE_ALL};
}
