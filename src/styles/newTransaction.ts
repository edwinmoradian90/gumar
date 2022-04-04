import {StyleSheet} from 'react-native';
import {colors} from '../utils';

const newTransactionStyles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
  },
  container: {
    padding: 20,
  },
  header: {
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 'auto',
    color: colors.secondary,
  },
  closeButton: {
    padding: 5,
  },
  buttonSubmit: {
    marginTop: 10,
    backgroundColor: colors.secondary,
  },
  buttonNewTransaction: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 70,
    display: 'flex',
    justifyContent: 'center',
    padding: 18,
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 70,
  },
  input: {
    backgroundColor: colors.mutedSoft,
    marginBottom: 20,
  },
  textStyle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default newTransactionStyles;
