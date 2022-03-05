import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/types/store';
import Account from './Account';
import Currency from './Currency';
import PrivacySecurity from './PrivacySecurity';

export default function Setting() {
  const {selected} = useSelector((state: RootState) => state.settings);
  if (selected.id === 'currency') return <Currency />;
  if (selected.id === 'account') return <Account />;
  if (selected.id === 'privacy-security') return <PrivacySecurity />;
  return <Text>{selected.name} Page</Text>;
}
