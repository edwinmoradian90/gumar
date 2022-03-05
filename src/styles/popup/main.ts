import {StyleSheet} from 'react-native';
import {gray, muted} from '../../utils/colors';

const popupStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    zIndex: 10000,
  },
  underlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    paddingHorizontal: 35,
    paddingVertical: 20,
    width: '90%',
  },
  tab: {
    borderRadius: 70,
    height: 5,
    marginTop: -10,
    marginBottom: 20,
    width: 35,
    backgroundColor: '#e7e7e7',
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});

export default popupStyles;
