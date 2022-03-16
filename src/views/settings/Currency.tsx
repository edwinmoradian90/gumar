import React from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Appbar, Headline, RadioButton} from 'react-native-paper';
import {currencies} from '../../data/currency';
import {actions} from '../../redux';
import settingsStyles from '../../styles/settings';
import {currencyTypes, storeTypes} from '../../types';
import {colors} from '../../utils';
import {useNavigation} from '@react-navigation/native';

export default function Currency() {
  const {id} = useSelector((state: storeTypes.RootState) => state.currency);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header
        style={{backgroundColor: colors.primary, elevation: 0}}
        dark={false}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Currency" />
      </Appbar.Header>
      <ScrollView style={settingsStyles.container}>
        <Headline style={settingsStyles.heading}>Select a currency</Headline>
        {currencies.map((currency: currencyTypes.Currency, index: number) => {
          const label = `${currency.symbol}   ${currency.fullName}`;
          return (
            <RadioButton.Item
              key={`currency-setting__${index}`}
              mode="ios"
              label={label}
              value={currency.id}
              status={currency.id === id ? 'checked' : 'unchecked'}
              onPress={() => dispatch(actions.currency.select(currency))}
            />
          );
        })}
      </ScrollView>
    </>
  );
}
