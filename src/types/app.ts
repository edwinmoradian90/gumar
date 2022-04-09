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
  INSTALLMENT = 'installment',
  DATE = 'date',
  TIME = 'time',
  NONE = 'none',
}

export enum Mode {
  DEFAULT = 'default',
  EDIT = 'edit',
  VIEW = 'view',
  SELECT = 'select',
}

export enum Page {
  HOME = 'HomeScreen',
  EDIT = 'EditScreen',
  TRANSACTIONS = 'TransactionsScreen',
  SUBSCRIPTIONS = 'SubscriptionsScreen',
  SETTINGS = 'SettingsScreen',
  SETTING = 'SettingScreen',
}

export enum NavigationInitiator {
  SEARCH = 'search',
}

export interface State {
  mode: Mode;
  editTarget: EditTarget;
  status: Status;
  page: Page;
}

export type RootStackParamList = {
  HomeScreen: undefined;
  EditScreen: undefined;
  SettingsScreen: undefined;
  SettingScreen: undefined;
  TransactionsScreen?: {
    category?: transactionTypes.PaymentMethod;
    paymentMethod?: transactionTypes.PaymentMethod;
    navigationInitiator?: NavigationInitiator;
  };
  Transactions: undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackParamList>;

export type TransactionsScreenProp = RouteProp<
  RootStackParamList,
  'TransactionsScreen'
>;

export interface TransactionScreenProps {
  route?: TransactionsScreenProp;
}
