import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {appTypes, storeTypes} from '../types';
import {helpers} from '../utils';

export default function useModeCheck(): {
  [index: string]: boolean;
} {
  const app = useSelector((state: storeTypes.RootState) => state.app);

  const modes = useMemo(() => {
    const modes: {[index: string]: boolean} = {};
    Object.keys(appTypes.Mode).forEach((key: string) => {
      const value = appTypes.Mode[key as keyof typeof appTypes.Mode];
      return (modes[`is${helpers.capitalize(value)}Mode`] = app.mode === value);
    });
    return modes;
  }, [app.mode]);

  return modes;
}
