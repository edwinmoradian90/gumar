import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux';
import {appTypes, storeTypes} from '../types';
import {helpers} from '../utils';

export default function useMode(): any {
  const dispatch = useDispatch();
  const app = useSelector((state: storeTypes.RootState) => state.app);

  const modes = useMemo(() => {
    const modes: {[index: string]: boolean} = {};
    Object.keys(appTypes.Mode).forEach((key: string) => {
      const value = appTypes.Mode[key as keyof typeof appTypes.Mode];
      return (modes[`is${helpers.capitalize(value)}Mode`] = app.mode === value);
    });
    return modes;
  }, [app.mode]);

  function setMode(mode: appTypes.Mode) {
    dispatch(actions.app.setMode(mode));
  }

  return {currentMode: app.mode, setMode, ...modes};
}
