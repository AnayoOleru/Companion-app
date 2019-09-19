/* eslint-disable no-undef */
import {
  createStore, combineReducers, compose, applyMiddleware
} from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import messages from './messages';
import calendar from './calendar/reducers';
import attendees from './attendees/reducers';
import auth from './login/reducers';

export const rootReducer = combineReducers({
  [messages.stateKey]: messages.messageReducer,
  calendar,
  attendees,
  auth
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWare = [thunk];

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(...middleWare))
);

const persistor = persistStore(store);

export { persistor, store };
