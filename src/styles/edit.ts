import {StyleSheet} from 'react-native';
import {colors} from '../utils';

const editStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginHorizontal: 20,
  },
  card: {
    alignItems: 'center',
    margin: 0,
    padding: 0,
    paddingVertical: 20,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  cardTitle: {
    color: colors.title,
    fontSize: 32,
    fontWeight: '300',
  },
  heading: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingTitle: {
    color: colors.muted,
    fontSize: 12,
  },
  sectionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  datePicker: {
    backgroundColor: colors.muted,
  },
  snapshotContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 30,
    marginHorizontal: 16,
  },
  snapshotAmount: {
    color: colors.text,
    fontSize: 50,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  snapshotName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  snapshotDate: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: 22,
    display: 'flex',
    height: 44,
    justifyContent: 'center',
    marginRight: 16,
    width: 44,
  },
});

export default editStyles;
