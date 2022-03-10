import {StyleSheet} from 'react-native';
import {primary, secondary, white} from '../utils/colors';

const newTransactionStyles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    backgroundColor: white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    padding: 30,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    padding: 10,
  },
  closeButton: {
    padding: 5,
  },
  buttonSubmit: {
    marginTop: 10,
    backgroundColor: secondary,
  },
  buttonNewTransaction: {
    alignItems: 'center',
    backgroundColor: secondary,
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
    borderBottomColor: secondary,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default newTransactionStyles;
