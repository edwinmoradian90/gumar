import {StyleSheet} from 'react-native';
import {
  gray,
  hightlightWhite,
  mainText,
  primary,
  secondary,
  white,
} from '../../utils/colors';

const settingsListStyles = StyleSheet.create({
  listContainer: {
    backgroundColor: primary,
    flex: 1,
    width: '100%',
  },
  listItemContainer: {
    backgroundColor: primary,
    borderBottomColor: gray,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  listItemTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
  },
  listItemBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginHorizontal: 5,
  },
  listItemText: {
    color: mainText,
    flexDirection: 'row',
    paddingRight: 10,
  },
  listItemText2: {
    color: mainText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  defaultPalette: {
    backgroundColor: secondary,
    color: 'white',
    underlayColor: hightlightWhite,
    primary,
    secondary,
  },
  selected: {
    backgroundColor: hightlightWhite,
    color: primary,
  },
});

export default settingsListStyles;
