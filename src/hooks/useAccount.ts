import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {storeTypes} from '../types';

export default function useAccount() {
  const dispatch = useDispatch();
  const account = useSelector((state: storeTypes.RootState) => state.account);

  const {isLoggedIn} = account;

  function login() {
    dispatch(actions.account.login());
  }

  function logout() {
    dispatch(actions.account.logout);
  }

  return {
    login,
    logout,
    isLoggedIn,
    data: account,
  };
}
