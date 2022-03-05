import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import configureStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function Entry() {
  const {store, persistor} = configureStore();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  );
}
