import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {storeTypes} from '../../types';
import {Account, Currency, PrivacySecurity} from '.';

export default function Setting() {
  const {selected} = useSelector(
    (state: storeTypes.RootState) => state.settings,
  );
  if (selected.id === 'currency') return <Currency />;
  if (selected.id === 'account') return <Account />;
  if (selected.id === 'privacy-security') return <PrivacySecurity />;
  return <Text>{selected.name} Page</Text>;
}
