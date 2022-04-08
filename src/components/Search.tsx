import {useNavigation} from '@react-navigation/native';
import getSymbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, Pressable, ScrollView, View} from 'react-native';
import {Divider, IconButton, List, Searchbar, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {appTypes, storeTypes, transactionTypes} from '../types';
import {colors, filter, helpers} from '../utils';

// TODO: work on case where query has no match
// currently it returns all of the transactions

export default function Search({
  containerBackgroundColor = 'transparent',
  searchBackgroundColor = colors.white,
}: {
  containerBackgroundColor?: string;
  searchBackgroundColor?: string;
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation<appTypes.Navigation>();
  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );

  const [isFocused, setIsFocused] = useState(false);

  const {name} = useSelector((state: storeTypes.RootState) => state.currency);
  const {query} = useSelector((state: storeTypes.RootState) => state.search);

  console.log('FOCUS ', isFocused);

  // fix type
  const searchbarRef = useRef() as any;

  const symbol = getSymbolFromCurrency(name);

  const onChangeSearch = (newQuery: string) =>
    dispatch(actions.search.update({query: newQuery}));

  function onFocus() {
    dispatch(actions.search.focus());
  }

  function onBlur() {
    // if (query !== '') return null;
    dispatch(actions.search.clear());
  }

  function onCancel() {
    dispatch(actions.search.clear());
    searchbarRef.current.blur();
  }

  function handleQueryPress(transaction: transactionTypes.Transaction) {
    dispatch(actions.transaction.select(transaction));
    dispatch(actions.search.clear());
    navigation.navigate('EditScreen');
  }

  function onSubmitEditing() {
    console.log('SUBMIT');
    dispatch(
      actions.search.update({
        query: '',
        results: filteredData,
        isFocused: false,
      }),
    );
    navigation.navigate('TransactionsScreen', {
      navigationInitiator: appTypes.NavigationInitiator.SEARCH,
    });
  }

  const Description = ({data}: {data: any}) => {
    const date = moment(data.date).format('MMMM DD YYYY');
    const time = moment(data.date).format('hh:mm A');

    return (
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            color: colors.muted,
            fontSize: 12,
            fontWeight: '300',
          }}>
          {date}
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontSize: 12,
            fontWeight: '300',
          }}>
          {time}
        </Text>
      </View>
    );
  };

  const Right = ({
    data: {paymentMethod, amount},
  }: {
    data: {paymentMethod: string; amount: string};
  }) => {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flexDirection: 'column'}}>
          <Text>
            {symbol}
            {amount}
          </Text>
          <Text style={{color: colors.muted, fontSize: 12, marginLeft: 6}}>
            {helpers.capitalize(paymentMethod)}
          </Text>
        </View>
        <IconButton color={colors.muted} size={20} icon="arrow-top-right" />
      </View>
    );
  };

  // fix type
  const Results = ({filteredData}: {filteredData: any}) => {
    if (!filteredData || filteredData.length === 0 || query === '') return null;

    return (
      <Pressable
        style={{
          backgroundColor: colors.overlay,
          height: Dimensions.get('screen').height - 70,
          top: 70,
          left: 0,
          position: 'absolute',
          width: '100%',
          zIndex: 20,
        }}
        onPress={onCancel}>
        <List.Section
          style={{
            backgroundColor: colors.background,
            borderRadius: 5,
            elevation: 4,
            marginLeft: 20,
            justifyContent: 'center',
            width: '90%',
          }}>
          {filteredData.length > 0 &&
            filteredData.slice(0, 5).map((data: any, index: number) => {
              return (
                <View key={`search-list-item__${index}`}>
                  {index !== 0 && <Divider style={{marginHorizontal: 16}} />}
                  <List.Item
                    title={data.name}
                    titleStyle={{paddingBottom: 5}}
                    description={<Description data={data} />}
                    right={() => <Right data={data} />}
                    onPress={() => handleQueryPress(data)}
                  />
                </View>
              );
            })}
        </List.Section>
      </Pressable>
    );
  };

  const filteredData = useMemo(() => {
    if (transactions.length === 0) return [];
    return transactions.filter((transaction: transactionTypes.Transaction) => {
      return filter.conditions.isMatch(transaction.name, query);
    });
  }, [query]);

  return (
    <View
      style={{
        backgroundColor: containerBackgroundColor,
        position: 'absolute',
        top: 56,
        left: 0,
        width: '100%',
      }}>
      <Searchbar
        ref={searchbarRef}
        style={{
          backgroundColor: searchBackgroundColor,
          elevation: isFocused ? 3 : 0,
          borderRadius: 30,
          margin: 20,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={query}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        onIconPress={onSubmitEditing}
      />
      {/* <Results filteredData={filteredData} /> */}
    </View>
  );
}
