import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}

export enum EditTarget {
  'NAME' = 'name',
  'AMOUNT' = 'amount',
  'PAYMENT_METHOD' = 'paymentMethod',
  'DATE' = 'date',
  'NONE' = 'none',
}

export enum Mode {
  'DEFAULT' = 'default',
  'EDIT' = 'edit',
  'VIEW' = 'view',
}

export enum PAGE {
  'HOME_SCREEN' = 'HomeScreen',
  'EDIT_SCREEN' = 'EditScreen',
  'SETTINGS_SCREEN' = 'SettingsScreen',
  'SETTING_SCREEN' = 'SettingScreen',
  'STATS_SCREEN' = 'StatsScreen',
}

type RootStackParamList = {
  HomeScreen: undefined;
  EditScreen: undefined;
  SettingsScreen: undefined;
  SettingScreen: undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackParamList>;
