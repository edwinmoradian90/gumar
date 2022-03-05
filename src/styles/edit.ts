import {StyleSheet} from 'react-native';
import {gray, mainText, muted, white} from '../utils/colors';

const editStyles = StyleSheet.create({
  container: {
    backgroundColor: white,
  },
  card: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: gray,
    margin: 0,
    padding: 0,
    paddingVertical: 20,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  heading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingTitle: {
    color: muted,
    fontSize: 12,
  },
  sectionText: {
    color: mainText,
    fontSize: 16,
    fontWeight: '500',
  },
  datePicker: {
    backgroundColor: 'grey',
  },
  snapshotContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: gray,
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 30,
    marginHorizontal: 16,
  },
  snapshotAmount: {
    color: mainText,
    fontSize: 50,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  snapshotName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  snapshotDate: {
    color: muted,
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    alignItems: 'center',
    backgroundColor: gray,
    borderRadius: 22,
    display: 'flex',
    height: 44,
    justifyContent: 'center',
    marginRight: 16,
    width: 44,
  },
});

export default editStyles;
