import {StyleSheet} from 'react-native';
import {mainText, muted, white} from '../../utils/colors';
import headerStyles from '../header/main';

const editHeaderStyles = StyleSheet.create({
  ...headerStyles,
  backButton: {
    ...headerStyles.backButton,
    color: muted,
  },
  trashButton: {
    ...headerStyles.trashButton,
    color: muted,
  },
  container: {
    ...headerStyles.container,
    backgroundColor: white,
  },
});

export default editHeaderStyles;
