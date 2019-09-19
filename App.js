import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Navigation from './src/navigation/index';
import { persistor, store } from './src/store';
import ConnectionNotice from './src/screens/ConnectionNotice';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Navigation />
      <ConnectionNotice />
    </PersistGate>
  </Provider>
);
