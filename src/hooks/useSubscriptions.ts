import {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {storeTypes, subscriptionTypes, transactionTypes} from '../types';
import {_} from '../utils';

export default function useSubscriptions() {
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state: storeTypes.RootState) => state.subscriptions,
  );

  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

  const [subscriptionData, setSubscriptionData] = useState([]);

  function isSubscription(installment: transactionTypes.Installment) {
    return installment !== transactionTypes.Installment.SINGLE;
  }

  function create(
    name: string,
    amount: string,
    paymentMethod: transactionTypes.PaymentMethod,
    paymentInterval: transactionTypes.Installment,
  ) {
    const id = uuid.v4() as string;
    const date = new Date();

    const subscription: subscriptionTypes.Subscription = {
      id,
      name,
      amount,
      paymentMethod,
      paymentInterval,
      frozen: false,
      recent: date,
      createdAt: date,
      updatedAt: date,
    };
    const updatedSubscriptions = [...subscriptions.data, subscription];

    dispatch(actions.subscriptions.create(updatedSubscriptions));

    return subscription;
  }

  function update(
    updatedSubscription: Partial<subscriptionTypes.Subscription>,
  ) {
    const updatedSubscriptions = subscriptions.data.map(
      (subscription: subscriptionTypes.Subscription) => {
        if (subscription.id !== updatedSubscription.id) return subscription;
        return {...subscription, ...updatedSubscription};
      },
    );
    dispatch(actions.subscriptions.update(updatedSubscriptions));
  }

  function remove(id: string) {
    const newSubscriptions = subscriptions.data.filter(
      (subscription: subscriptionTypes.Subscription) => subscription.id !== id,
    );

    dispatch(actions.subscriptions.remove(newSubscriptions));
  }

  function removeAll() {
    dispatch(actions.subscriptions.removeAll());
  }

  function freeze(id: string) {
    const s = subscriptions.data.map(
      (subscription: subscriptionTypes.Subscription) => {
        if (subscription.id !== id) return subscription;
        return {...subscription, frozen: true};
      },
    );

    dispatch(actions.subscriptions.update(s));
  }

  function unfreeze(id: string) {
    const s = subscriptions.data.map(
      (subscription: subscriptionTypes.Subscription) => {
        if (subscription.id !== id) return subscription;
        return {...subscription, frozen: false};
      },
    );

    dispatch(actions.subscriptions.update(s));
  }

  useEffect(() => {
    const transactionSubscriptions = transactions.filter(
      (t: transactionTypes.Transaction) => t.subscriptionId !== null,
    );

    const transactionSubscriptionsData = subscriptions.data.map(
      (subscription: subscriptionTypes.Subscription) => {
        const transactionIndex = transactionSubscriptions.findIndex(
          (t: transactionTypes.Transaction) => {
            return t.subscriptionId === subscription.id;
          },
        );

        return {
          ...subscription,
          ...transactionSubscriptions[transactionIndex],
          id: transactionSubscriptions[transactionIndex].id,
        };
      },
    );

    setSubscriptionData(transactionSubscriptionsData);
  }, [subscriptions.data]);

  return {
    create,
    update,
    remove,
    removeAll,
    freeze,
    unfreeze,
    isSubscription,
    data: subscriptions.data,
    dataWithTransactions: subscriptionData,
  };
}
