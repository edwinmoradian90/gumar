import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Divider, IconButton, List} from 'react-native-paper';
import {selectSetting} from '../../redux/actions/settings';
import {appTypes, settingTypes} from '../../types';
import {colors} from '../../utils';
import {Appbar} from 'react-native-paper';
import {View} from 'react-native';
// TODO: move to data

interface Setting {
  id: string;
  name: string;
  description?: string;
  iconLeft: string;
}

const settingsData = [
  {
    id: 'currency',
    name: 'Currency',
    description: 'Select the currency used in your transactions',
    iconLeft: 'swap-horizontal',
  },
  {
    id: 'account',
    name: 'Account',
    description: 'Connect to your google account',
    iconLeft: 'account-check-outline',
  },
  {
    id: 'privacy-security',
    name: 'Privacy & Security',
    description: 'Add and update app password',
    iconLeft: 'hand-front-right-outline',
  },
  {
    id: 'terms-of-use',
    name: 'Terms of use',
    description: 'Privacy policy and terms of service',
    iconLeft: 'file-document-multiple-outline',
  },
];

export default function Settings() {
  const navigation = useNavigation<appTypes.Navigation>();
  const dispatch = useDispatch();

  function onPress(selected: settingTypes.Selected) {
    dispatch(selectSetting(selected));
    navigation.navigate('SettingScreen');
  }

  return (
    <React.Fragment>
      <Appbar.Header
        style={{backgroundColor: colors.background, elevation: 0}}
        dark={false}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <List.Section>
        {settingsData.map((setting: Setting) => {
          return (
            <List.Item
              key={`setting-list-item__${setting.id}`}
              title={setting.name}
              description={setting?.description}
              left={() => (
                <IconButton
                  color={colors.iconButtonColor}
                  icon={setting.iconLeft}
                />
              )}
              right={() => (
                <IconButton color={colors.secondary} icon="chevron-right" />
              )}
              onPress={() => onPress(setting)}
            />
          );
        })}
      </List.Section>
    </React.Fragment>
  );
}
