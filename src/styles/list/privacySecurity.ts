import {StyleSheet} from 'react-native';
import settingsListStyles from './settings';

const privacySecurityListStyles = StyleSheet.create({
  ...settingsListStyles,
  listItemBody: {
    ...settingsListStyles.listItemBody,
  },
  listItemTextContainer: {
    ...settingsListStyles.listItemTextContainer,
    width: '90%',
  },
  listItemText2: {
    ...settingsListStyles.listItemText2,
  },
});

export default privacySecurityListStyles;
