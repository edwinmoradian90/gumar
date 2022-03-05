import React from 'react';
import {Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import List from '../../components/List';
import {gray, muted, primary, secondary} from '../../utils/colors';
import settingsListStyles from '../../styles/list/settings';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {selectSetting} from '../../redux/actions/settings';
import {Selected} from '../../redux/types/settings';
import {NavigationProps} from '../../types/app';
import Header from '../../components/Header';

export default function Settings() {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const settingsData = [
    {
      id: 'currency',
      name: 'Currency',
    },
    {
      id: 'account',
      name: 'Account',
    },
    {
      id: 'privacy-security',
      name: 'Privacy & Security',
    },
    {
      id: 'terms-of-use',
      name: 'Terms of use',
    },
  ];

  function onPress(selected: Selected) {
    dispatch(selectSetting(selected));
    navigation.navigate('SettingScreen');
  }

  return (
    <>
      <Header title="Settings" left={['back', 'title']} />
      <List
        data={settingsData}
        exclude={['id']}
        styles={settingsListStyles}
        onPress={onPress}>
        <EntypoIcon name="chevron-thin-right" size={14} color={secondary} />
      </List>
    </>
  );
}
