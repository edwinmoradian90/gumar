import {StyleSheet} from 'react-native';
import popupStyles from './main';

const fromBottomPopupStyles = StyleSheet.create({
  ...popupStyles,
  underlay: {
    ...popupStyles.underlay,
    justifyContent: 'flex-end',
  },
  // maybe move border radius to newTransactionPopupStyles
  modal: {
    ...popupStyles.modal,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
  },
});

export default fromBottomPopupStyles;
