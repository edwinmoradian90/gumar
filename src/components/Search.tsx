import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {List, Searchbar, Surface} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {appTypes, storeTypes, transactionTypes} from '../types';
import {colors} from '../utils';

export default function Search() {
  const dispatch = useDispatch();
  const navigation = useNavigation<appTypes.Navigation>();
  const {transactions} = useSelector(
    (state: storeTypes.RootState) => state.transaction,
  );
  // TODO: move to redux, turn off scroll when active, remove search bar background
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  function handleQueryPress(transaction: transactionTypes.Transaction) {
    dispatch(actions.transaction.select(transaction));
    navigation.navigate('EditScreen');
    setSearchQuery('');
  }

  const Results = ({filteredData}: {filteredData: any}) => {
    if (!filteredData || filteredData.length === 0 || searchQuery === '')
      return null;
    console.log(filteredData);
    return (
      <Surface
        style={{
          flex: 1,
          borderBottomEndRadius: 5,
          borderBottomStartRadius: 5,
          position: 'absolute',
          top: 70,
          left: 0,
          marginLeft: 20,
          justifyContent: 'center',
          width: '90%',
          elevation: 7,
        }}>
        {filteredData !== undefined &&
          filteredData.map((data: any, index: number) => {
            return (
              <List.Item
                key={`search-list-item__${index}`}
                title={data.name}
                onPress={() => handleQueryPress(data)}
              />
            );
          })}
      </Surface>
    );
  };

  const filteredData = useMemo(() => {
    if (transactions.length === 0) return [];
    return transactions.filter((transaction: transactionTypes.Transaction) => {
      const regex = new RegExp(searchQuery.toLowerCase().replace(/\s+/g, ''));
      return transaction.name.toLowerCase().replace(/\s+/g, '').match(regex);
    });
  }, [searchQuery]);

  return (
    <View
      style={{
        backgroundColor: colors.altBackground,
        position: 'absolute',
        top: 56,
        left: 0,
        width: '100%',
      }}>
      <Searchbar
        style={{
          elevation: 0,
          borderRadius: 30,
          margin: 20,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Results filteredData={filteredData} />
    </View>
  );
}
