import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  DEFAULT = 'DEFAULT',
}

export type Transaction = {
  [index: string]: string | Date;
  id: string;
  name: string;
  amount: string;
  year: string;
  month: string;
  week: string;
  day: string;
  time: string;
  date: Date;
};

type RootStackParamList = {
  HomeScreen: undefined;
  EditScreen: undefined;
  SettingsScreen: undefined;
  SettingScreen: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
