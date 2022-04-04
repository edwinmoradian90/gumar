import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {appTypes, storeTypes} from '../types';
import {helpers} from '../utils';

export default function useAccount(): any {
  const dispatch = useDispatch();
  const account = useSelector((state: storeTypes.RootState) => state.account);

  const {isLoggedIn} = account;

  const statuses = useMemo(() => {
    const statuses: {[index: string]: boolean} = {};
    Object.keys(appTypes.Status).forEach((key: string) => {
      const value = appTypes.Status[key as keyof typeof appTypes.Status];
      return (statuses[`is${helpers.capitalize(value)}Status`] =
        account.status === value);
    });
    return statuses;
  }, [account.status]);

  function login() {
    dispatch(actions.account.login());
  }

  function logout() {
    dispatch(actions.account.logout());
  }

  return {
    login,
    logout,
    isLoggedIn,
    data: account,
    ...statuses,
  };
}
