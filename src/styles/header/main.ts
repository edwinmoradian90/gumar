import {StyleSheet} from 'react-native';
import {muted, primary, secondary, white} from '../../utils/colors';

const HEADER_HORIZONTAL_PADDING = 10;
const HEADER_VERTICAL_PADDING = 20;

const headerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
    paddingVertical: HEADER_VERTICAL_PADDING,
  },
  left: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: HEADER_HORIZONTAL_PADDING * 2,
  },
  center: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    paddingHorizontal: 10,
  },
  titleText: {
    color: secondary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  addButton: {
    color: secondary,
    paddingVertical: 5,
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
  },
  filterButton: {
    color: secondary,
    paddingVertical: 5,
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
  },
  exportButton: {
    color: secondary,
    paddingVertical: 5,
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
  },
  trashButton: {
    color: secondary,
    paddingVertical: 5,
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
  },
  backButton: {
    color: secondary,
    paddingVertical: 5,
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
  },
  closeButton: {
    color: muted,
    paddingVertical: 5,
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
  },
});

export default headerStyles;
