import {StyleSheet} from 'react-native';
import {white} from '../../utils/colors';
import popupStyles from './main';

const fullScreenPopupStyles = StyleSheet.create({
  ...popupStyles,
  underlay: {
    ...popupStyles.underlay,
    backgroundColor: white,
    justifyContent: 'flex-start',
  },
  modal: {
    ...popupStyles.modal,
    elevation: 0,
    width: '100%',
  },
});

export default fullScreenPopupStyles;
