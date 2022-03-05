import {StyleSheet} from 'react-native';
import {muted, primary, secondary, white} from '../utils/colors';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: primary,
    justifyContent: 'center',
    paddingTop: 40,
  },
  deleteTransactionsButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 5,
  },
  header: {
    backgroundColor: primary,
    color: white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
    textAlign: 'center',
  },
  bagIcon: {
    marginTop: 30,
  },
  p: {
    color: muted,
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
});

export default homeStyles;
