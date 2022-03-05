import {StyleSheet} from 'react-native';
import popupStyles from './main';

const newTransactionPopupStyles = StyleSheet.create({
  ...popupStyles,
  modal: {
    ...popupStyles.modal,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
  },
});

export default newTransactionPopupStyles;
