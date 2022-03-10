import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  DEFAULT = 'DEFAULT',
}

type RootStackParamList = {
  HomeScreen: undefined;
  EditScreen: undefined;
  SettingsScreen: undefined;
  SettingScreen: undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackParamList>;
