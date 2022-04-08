import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {actions, constants} from '../redux';
import {storeTypes, subscriptionTypes, transactionTypes} from '../types';

export default function useSubscriptions() {
  const dispatch = useDispatch();
  const {data} = useSelector(
    (state: storeTypes.RootState) => state.subscriptions,
  );

  function isSubscription(installment: transactionTypes.Installment) {
    return installment !== transactionTypes.Installment.SINGLE;
  }

  function create(paymentInterval: transactionTypes.Installment) {
    const id = uuid.v4() as string;
    const date = new Date();

    const newSubscription: subscriptionTypes.Subscription = {
      id,
      paymentInterval,
      date,
      frozen: false,
    };
    const updatedSubscriptions = [...data, newSubscription];

    dispatch(actions.subscriptions.create(updatedSubscriptions));

    return {subscriptionId: id};
  }

  function update(
    updatedSubscription: Partial<subscriptionTypes.Subscription>,
  ) {
    const updatedSubscriptions = data.map(
      (subscription: subscriptionTypes.Subscription) => {
        if (subscription.id !== updatedSubscription.id) return subscription;
        return {...subscription, ...updatedSubscription};
      },
    );
    dispatch(actions.subscriptions.update(updatedSubscriptions));
  }

  function remove(id: string) {
    const newSubscriptions = data.filter(
      (subscription: subscriptionTypes.Subscription) => subscription.id !== id,
    );
    dispatch(actions.subscriptions.remove(newSubscriptions));
  }

  function removeAll() {
    dispatch(actions.subscriptions.removeAll());
  }

  function freeze(id: string) {
    const subscriptions = data.map(
      (subscription: subscriptionTypes.Subscription) => {
        if (subscription.id === id) return subscription;
        return {...subscription, frozen: true};
      },
    );

    dispatch({type: constants.subscriptions.UPDATE, subscriptions});
  }

  function unfreeze(id: string) {
    const subscriptions = data.map(
      (subscription: subscriptionTypes.Subscription) => {
        if (subscription.id === id) return subscription;
        return {...subscription, frozen: false};
      },
    );

    dispatch({type: constants.subscriptions.UPDATE, subscriptions});
  }

  return {
    data,
    create,
    update,
    remove,
    removeAll,
    freeze,
    unfreeze,
    isSubscription,
  };
}
