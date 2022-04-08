import moment from 'moment';
import React, {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {
  Colors,
  Divider,
  IconButton,
  List,
  Menu,
  Text,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {appTypes, storeTypes, transactionTypes} from '../types';
import {colors, helpers} from '../utils';
import {useTransactions} from '../hooks';

export default function Category({
  category,
  title,
  icon,
  iconColor,
}: {
  category: transactionTypes.PaymentMethod;
  title: string;
  icon: string;
  iconColor?: string;
}) {
  const navigation = useNavigation<appTypes.Navigation>();
  const [showMenu, setShowMenu] = useState(false);
  const {symbol} = useSelector((state: storeTypes.RootState) => state.currency);

  const transactions = useTransactions({category});

  const {total, lastUpdated} = useMemo(() => {
    let total = 0;
    let lastUpdated = null;

    transactions.modifiedTransactions.length > 0 &&
      transactions.modifiedTransactions
        .sort(helpers.compare.adate)
        .forEach(
          (transaction: transactionTypes.Transaction) =>
            (total += parseInt(transaction.amount)),
        );

    lastUpdated =
      transactions.modifiedTransactions.length > 0
        ? transactions.modifiedTransactions[0].date
        : lastUpdated;

    return {total, lastUpdated};
  }, [transactions.modifiedTransactions]);

  const description = useMemo(() => {
    return `Updated ${moment(lastUpdated).fromNow()}`;
  }, [transactions.modifiedTransactions]);

  function handleView() {
    setShowMenu(false);
    navigation.navigate('TransactionsScreen', {category});
  }

  function handleDelete() {}

  if (total === 0) return null;

  return (
    <React.Fragment>
      <Divider inset={true} />
      <List.Item
        left={() => (
          <IconButton
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 5,
              marginTop: 11,
              marginLeft: 14,
              marginRight: 10,
            }}
            size={20}
            color={iconColor || colors.iconColor}
            icon={icon}
          />
        )}
        title={title}
        titleStyle={{color: colors.text, fontSize: 16, fontWeight: '300'}}
        description={description}
        descriptionStyle={{
          color: colors.muted,
          fontSize: 12,
        }}
        right={() => (
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '300',
              }}>{`${symbol}${total}`}</Text>
            <Menu
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <IconButton
                  style={{padding: 0, margin: 0, marginTop: 2}}
                  onPress={() => setShowMenu(true)}
                  color={colors.muted}
                  icon="dots-vertical"
                  size={20}
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
