import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {IconButton, List} from 'react-native-paper';
import {selectSetting} from '../../redux/actions/settings';
import {appTypes, settingTypes} from '../../types';
import {colors} from '../../utils';
import {Appbar} from 'react-native-paper';
// TODO: move to data

interface Setting {
  id: string;
  name: string;
  iconLeft: string;
}

const settingsData = [
  {
    id: 'currency',
    name: 'Currency',
    iconLeft: 'swap-horizontal',
  },
  {
    id: 'account',
    name: 'Account',
    iconLeft: 'account-check-outline',
  },
  {
    id: 'privacy-security',
    name: 'Privacy & Security',
    iconLeft: 'hand-front-right-outline',
    // iconLeft: 'shield-lock-outline',
  },
  {
    id: 'terms-of-use',
    name: 'Terms of use',
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
