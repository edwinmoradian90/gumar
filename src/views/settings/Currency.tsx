import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Appbar, Headline, RadioButton} from 'react-native-paper';
import currencyToSymbolMap from 'currency-symbol-map/map';
import {actions} from '../../redux';
import settingsStyles from '../../styles/settings';
import {currencyTypes, storeTypes} from '../../types';
import {colors} from '../../utils';
import {useNavigation} from '@react-navigation/native';

function Currency() {
  const currencyState = useSelector(
    (state: storeTypes.RootState) => state.currency,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currencies = useMemo(() => {
    return Object.keys(currencyToSymbolMap).map((name: any, index: number) => {
      const symbol = currencyToSymbolMap[name];
      const label = `${name}   ${symbol}`;
      const currency: currencyTypes.Currency = {
        id: name,
        fullName: name,
        name,
        symbol,
      };
      return (
        <RadioButton.Item
          key={`currency-setting__${index}`}
          mode="ios"
          label={label}
          value={name}
          status={name === currencyState.name ? 'checked' : 'unchecked'}
          onPress={() => dispatch(actions.currency.select(currency))}
        />
      );
    });
  }, [currencyState.id]);

  return (
    <React.Fragment>
      <Appbar.Header
        style={{backgroundColor: colors.primary, elevation: 0}}
        dark={false}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Currency" />
      </Appbar.Header>
      <ScrollView style={settingsStyles.container}>
        <Headline style={settingsStyles.heading}>Select a currency</Headline>
        {currencies}
      </ScrollView>
    </React.Fragment>
  );
}

export default React.memo(Currency);
