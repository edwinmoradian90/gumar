import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Caption,
  Divider,
  IconButton,
  List,
  Menu,
  Subheading,
  Text,
} from 'react-native-paper';
import {useAlert, useSnackbar, useSubscriptions} from '../../hooks';
import {subscriptionTypes, transactionTypes} from '../../types';
import {colors, helpers, _} from '../../utils';

export default function Subscriptions() {
  const subscriptions = useSubscriptions();
  const snackbar = useSnackbar();
  const alert = useAlert();

  const [showMenu, setShowMenu] = useState(
    helpers.arrayToMap(
      subscriptions.dataWithTransactions,
      'subscriptionId',
      false,
    ),
  );

  const RightMenu = ({
    subscription,
  }: {
    subscription: subscriptionTypes.Subscription & transactionTypes.Transaction;
  }) => {
    const subscriptionId = subscription.subscriptionId as string;

    function onPressFreeze() {
      setShowMenu({...showMenu, [subscriptionId]: false});

      if (!subscription.frozen) {
        const onConfirm = () => {
          alert.hide();
          subscriptions.freeze(subscriptionId);
          snackbar.createAndShow(
            `Subscription "${subscription.name}" is now frozen`,
          );
        };

        alert.createAndShow(
          'Are you sure?',
          `Freezing a subscription will halt all automatically generated transactions. It will not remove any previous transactions. 
Freeze subscription?`,
          'Freeze',
          'Cancel',
          onConfirm,
        );
      } else {
        subscriptions.unfreeze(subscriptionId);
        snackbar.createAndShow(
          `Subscription "${subscription.name}" is now active`,
        );
      }
    }

    function onPressRemove() {
      setShowMenu({...showMenu, [subscriptionId]: false});

      const onConfirm = () => {
        const snackbarTitle = `Subscription "${subscription.name}" has been removed`;

        alert.hide();
        subscriptions.remove(subscriptionId);
        snackbar.createAndShow(snackbarTitle);
      };

      alert.createAndShow(
        'Are you sure?',
        `Removing a subscription is irreversible, however, the transactions created by the subscription will not be affected.
Remove subscription?
        `,
        'Remove',
        'Cancel',
        onConfirm,
      );
    }

    console.log('SUB ', subscription);
    return (
      <React.Fragment>
        <Menu.Item
          icon={subscription.frozen ? 'snowflake-melt' : 'snowflake'}
          title={subscription.frozen ? 'Activate' : 'Freeze'}
          onPress={onPressFreeze}
        />
        <Divider style={{marginHorizontal: 20}} />
        <Menu.Item
          icon="trash-can-outline"
          title="Remove"
          onPress={onPressRemove}
        />
      </React.Fragment>
    );
  };

  const Description = ({
    subscription,
  }: {
    subscription: transactionTypes.Transaction & subscriptionTypes.Subscription;
  }) => {
    return (
      <View>
        <Text style={styles.subscriptionBodyText}>
          Amount: {subscription.amount}
        </Text>
        <Text style={styles.subscriptionBodyText}>
          Payment method: {helpers.capitalize(subscription.paymentMethod)}
        </Text>
        <Text style={styles.subscriptionBodyText}>
          Installment: {helpers.capitalize(subscription.paymentInterval)}
        </Text>
        <Text style={styles.subscriptionBodyText}>
          Created: {moment(subscription.createdAt).format('MMMM DD, YYYY')}
        </Text>
        <Text style={styles.subscriptionBodyText}>
          Last updated: {moment(subscription.updatedAt).format('MMMM DD, YYYY')}
        </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: -8,
          }}>
          <Caption
            style={{
              backgroundColor: colors.white,
              color: subscription.frozen ? colors.darkGray : colors.success,
              fontSize: 12,
              paddingVertical: 2,
              marginTop: 4,
              textAlign: 'left',
              width: 40,
              height: 20,
            }}>
            {subscription.frozen ? 'Frozen' : 'Active'}
          </Caption>
          <IconButton
            color={colors.darkGray}
            style={{marginTop: 14, marginLeft: 0}}
            size={14}
            icon={subscription.frozen ? 'snowflake' : 'repeat-variant'}
          />
        </View>
      </View>
    );
  };

  if (_.array.isEmpty(subscriptions.dataWithTransactions))
    return (
      <Subheading
        style={{
          color: colors.muted,
          paddingVertical: 20,
          textAlign: 'center',
        }}>
        No subscriptions to show...
      </Subheading>
    );

  return (
    <List.Section>
      {subscriptions.dataWithTransactions.map(
        (
          subscription: subscriptionTypes.Subscription &
            transactionTypes.Transaction,
          index: number,
        ) => {
          const subscriptionId = subscription.subscriptionId as string;

          return (
            <React.Fragment key={subscription.id}>
              <List.Item
                title={subscription.name}
                titleStyle={{
                  fontSize: 18,
                  marginBottom: 4,
                }}
                description={() => <Description subscription={subscription} />}
                right={() => (
                  <View
                    style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                    <Menu
                      visible={showMenu[subscriptionId]}
                      anchor={
                        <IconButton
                          color={colors.mutedIcon}
                          icon="dots-vertical"
                          onPress={() =>
                            setShowMenu({
                              ...showMenu,
                              [subscriptionId]: true,
                            })
                          }
                        />
                      }
                      onDismiss={() =>
                        setShowMenu({
                          ...showMenu,
                          [subscriptionId]: false,
                        })
                      }>
                      <RightMenu subscription={subscription} />
                    </Menu>
                  </View>
                )}
              />
              {index < subscriptions.dataWithTransactions.length && <Divider />}
            </React.Fragment>
          );
        },
      )}
    </List.Section>
  );
}

const styles = StyleSheet.create({
  subscriptionBodyText: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 2,
  },
});
