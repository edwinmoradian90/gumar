import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {transactionTypes} from '.';

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading',
}

export enum EditTarget {
  NAME = 'name',
  AMOUNT = 'amount',
  PAYMENT_METHOD = 'paymentMethod',
  DATE = 'date',
  TIME = 'time',
  NONE = 'none',
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

export type RootStackParamList = {
  HomeScreen: undefined;
  EditScreen: undefined;
  SettingsScreen: undefined;
  SettingScreen: undefined;
  TransactionsScreen:
    | {paymentMethod: transactionTypes.PaymentMethod}
    | undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackParamList>;

export type TransactionsScreenProp = RouteProp<
  RootStackParamList,
  'TransactionsScreen'
>;

export interface TransactionScreenProps {
  route?: TransactionsScreenProp;
}
