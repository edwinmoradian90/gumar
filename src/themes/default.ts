import {DefaultTheme} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default {
  ...DefaultTheme,
  roundness: 2,
  dark: false,
  mode: 'exact',
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.indigo700,
    background: Colors.grey100,
    surface: Colors.white,
    text: Colors.black,
    mutedText: Colors.grey300,
    placeholder: Colors.grey300,
    backdrop: Colors.white,
  },
  fonts: {},
  animation: {
    scale: 1,
  },
};
