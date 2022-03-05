import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import List from '../components/List';
import NewTransaction from '../components/NewTransaction';
import {currencies} from '../data/currency';
import {selectTransaction} from '../redux/actions/transaction';
import {RootState} from '../redux/types/store';
import homeStyles from '../styles/home';
import listStyles from '../styles/list/main';
import {NavigationProps, Transaction} from '../types/app';
import {secondary} from '../utils/colors';
import {Status} from '../types/app';
import Filter from '../components/Filter';
import Export from '../components/Export';
import {months} from '../utils/helpers';

export default function Home() {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const {transactions, status} = useSelector(
    (state: RootState) => state.transaction,
  );
  const {currency} = useSelector((state: RootState) => state.settings);
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

  function onPress(transaction: Transaction) {
    dispatch(selectTransaction(transaction));
    navigation.navigate('EditScreen');
  }

  function createDateMap(unit: string) {
    const dateMap: any = {};
    transactions.forEach((transaction: Transaction) => {
      if (!dateMap[transaction[unit] as any]) {
        return (dateMap[transaction[unit] as any] = [transaction]);
      }

      dateMap[transaction[unit] as any].push(transaction);
    });

    return dateMap;
  }

  function separateByMonth(dateMap: {[index: string]: string}) {
    return months
      .filter((month: string) => dateMap[month])
      .map((month: string) => {
        return (
          <View key={month} style={{flex: 1}}>
            <Text style={{textAlign: 'center'}}>{month}</Text>
            <List
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

  // clean up modals
  return (
    <ScrollView>
      <Header
        title="Overview"
        left={['title']}
        right={['export', 'filter', 'add']}
      />
      <View style={homeStyles.container}>
        {status === Status.SUCCESS &&
        transactions &&
        transactions.length === 0 ? (
          <View style={homeStyles.container}>
            <Text style={homeStyles.p}>
              Looks like you have no transactions...
            </Text>
            <Text style={homeStyles.p}>Go buy something!</Text>
            <View style={homeStyles.bagIcon}>
              <Icon name="shopping-bag" size={50} color={secondary} />
            </View>
          </View>
        ) : (
          createDateSeparatedLists('month')
        )}
        <NewTransaction />
        <Filter />
        <Export />
      </View>
    </ScrollView>
  );
}
