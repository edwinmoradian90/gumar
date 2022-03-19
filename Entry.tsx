import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import configureStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import themes from './src/themes';

export default function Entry() {
  const {store, persistor} = configureStore();
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <PaperProvider theme={themes.main as any}>
          <App />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
