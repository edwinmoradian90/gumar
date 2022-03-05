import {StyleSheet} from 'react-native';
import {
  hightlightWhite,
  mainText,
  primary,
  secondary,
  secondaryHighlight,
} from '../../utils/colors';

const listStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
  },
  listItemContainer: {
    backgroundColor: secondary,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  listItemTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listItemBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  listItemText: {
    color: mainText,
    flexDirection: 'row',
    paddingRight: 10,
  },
  listItemText1: {
    color: primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemText2: {
    color: primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  defaultPalette: {
    backgroundColor: secondary,
    color: 'white',
    underlayColor: secondaryHighlight,
    primary,
    secondary,
  },
  selected: {
    backgroundColor: hightlightWhite,
    color: 'white',
  },
});

export default listStyles;
