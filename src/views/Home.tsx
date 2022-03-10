import moment from 'moment';
import React, {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import * as Component from '../components';
import {actions} from '../redux';
import {currencies} from '../data/currency';
import homeStyles from '../styles/home';
import listStyles from '../styles/list/main';
import {appTypes, transactionTypes, storeTypes} from '../types';
import {colors, helpers} from '../utils';

export default function Home() {
  const navigation = useNavigation<appTypes.Navigation>();
  const dispatch = useDispatch();
  const {transactions, status} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  const {currency} = useSelector(
    (state: storeTypes.RootState) => state.settings,
  );
  const currencySymbol: any = useMemo(() => {
    let symbol;
    currencies.forEach((c: {[index: string]: string}) =>
      c.id === currency ? (symbol = c.symbol) : null,
    );
    return symbol;
  }, [currency]);

  function onLongPress() {
    console.log('LONG');
  }

  function onPress(transaction: transactionTypes.Transaction) {
    console.log(transaction);
    dispatch(actions.transaction.select(transaction));
    navigation.navigate('EditScreen');
  }

  function createDateMap(unit: string) {
    const dateMap: any = {};
    transactions.forEach((transaction: transactionTypes.Transaction) => {
      if (!dateMap[transaction[unit] as any]) {
        return (dateMap[transaction[unit] as any] = [transaction]);
      }

      dateMap[transaction[unit] as any].push(transaction);
    });

    return dateMap;
  }

  function separateByMonth(dateMap: {[index: string]: string}) {
    return helpers.months
      .filter((month: string) => dateMap[month])
      .map((month: string) => {
        return (
          <View style={{flex: 1}} key={month}>
            <Text style={{textAlign: 'center'}}>{month}</Text>
            <Component.List
              scrollable={false}
              data={dateMap[month]}
              onPress={onPress}
              onLongPress={onLongPress}
              include={['name', 'amount']}
              before={{key: 'amount', value: currencySymbol}}
              styles={listStyles}
            />
          </View>
        );
      });
  }

  function createDateSeparatedLists(unitOfTime: string = 'month') {
    const dateMap = createDateMap(unitOfTime);
    if (unitOfTime === 'month') return separateByMonth(dateMap);
  }

  const dateSeparatedList = useCallback(
    () => createDateSeparatedLists('month'),
    [transactions],
  );

  const settings = {
    hide: {
      beforeDate: '2022-05-25',
    },
  };

  function filter(item: transactionTypes.Transaction): boolean {
    if (!settings.hide.beforeDate) return true;

    return moment(item.date).isBefore(settings.hide.beforeDate);
  }

  // clean up modals
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.primary}}>
      <Component.Header
        title="Overview"
        left={['title']}
        right={['export', 'filter', 'add']}
      />
      <View>
        {status === appTypes.Status.SUCCESS &&
        transactions &&
        transactions.length === 0 ? (
          <View style={homeStyles.container}>
            <Text style={homeStyles.p}>
              Looks like you have no transactions...
            </Text>
            <Text style={homeStyles.p}>Go buy something!</Text>
            <View style={homeStyles.bagIcon}>
              <Icon name="shopping-bag" size={50} color={colors.secondary} />
            </View>
          </View>
        ) : (
          <Component.IList data={transactions} filter={filter}>
            <Component.ListItem currency={currencySymbol} onPress={onPress} />
          </Component.IList>
        )}
        <Component.NewTransaction />
        <Component.Filter />
        <Component.Export />
      </View>
    </ScrollView>
  );
}
