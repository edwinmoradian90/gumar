import moment from 'moment';
import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  Colors,
  Divider,
  IconButton,
  List,
  Menu,
  Text,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {storeTypes, transactionTypes} from '../types';
import {colors, helpers} from '../utils';

export default function Category({
  title,
  paymentMethod,
  icon,
  iconColor,
}: {
  title: string;
  paymentMethod: transactionTypes.PaymentMethod;
  icon: string;
  iconColor?: string;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {symbol} = useSelector((state: storeTypes.RootState) => state.currency);

  const {total, lastUpdated} = useMemo(() => {
    let total = 0;
    let lastUpdated = null;

    const filtered =
      transactions.length > 0 &&
      transactions.filter(
        (transaction: transactionTypes.Transaction) =>
          transaction.paymentMethod === paymentMethod,
      );

    filtered.length > 0 &&
      filtered
        .sort(helpers.compare.adate)
        .forEach(
          (transaction: transactionTypes.Transaction) =>
            (total += parseInt(transaction.amount)),
        );

    lastUpdated = filtered.length > 0 ? filtered[0].date : lastUpdated;

    return {total, lastUpdated};
  }, [transactions]);

  const description = useMemo(() => {
    return `Last updated ${moment(lastUpdated).fromNow()}`;
  }, [transactions]);

  function handleView() {}

  function handleDelete() {}

  if (total === 0) return null;

  return (
    <React.Fragment>
      <Divider inset={true} />
      <List.Item
        left={() => <List.Icon color={iconColor} icon={icon} />}
        title={title}
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        description={description}
        descriptionStyle={{fontSize: 12}}
        right={() => (
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>{`${symbol}${total}`}</Text>
            <Menu
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <IconButton
                  onPress={() => setShowMenu(true)}
                  color={Colors.grey500}
                  icon="dots-vertical"
                />
              }>
              <Menu.Item
                onPress={handleView}
                icon="view-list-outline"
                title="View"
              />
              <Divider style={{marginHorizontal: 20, marginVertical: 10}} />
              <Menu.Item
                icon="trash-can-outline"
                titleStyle={{color: Colors.red500}}
                title="Delete"
                onPress={handleDelete}
              />
            </Menu>
          </View>
        )}
      />
    </React.Fragment>
  );
}
