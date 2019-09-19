import configureStore from 'redux-mock-store';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as Google from 'expo-app-auth';

import loginAction, { loginSuccess, loginFailure } from '../../login/actions';

import * as types from '../../login/types';

const mockStore = configureStore([thunk]);

let store;

const auth = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: { email: 'email@email.com' },
  token: '123459601345678'
};

describe('async login actions', () => {
  it('Starts the login action', () => {
    const mockSuccessResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      currentUser: { email: 'email@email.com' }
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    store = mockStore({ auth: {} });
  });
  it('Call loginAction with success', async () => {
    const accessResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      currentUser: { email: 'email@email.com' }
    };
    const tokenResponse = {
      status: 200,
      json: () => Promise.resolve({ token: '123459601345678' })
    };
    jest.spyOn(Google, 'authAsync').mockImplementation(() => ({
      accessToken: accessResponse.accessToken,
      refreshToken: accessResponse.refreshToken
    }));
    jest.spyOn(global, 'fetch').mockImplementation(() => accessResponse);
    jest.spyOn(global, 'fetch').mockImplementation(() => tokenResponse);
    store = mockStore({});
    jest.spyOn(AsyncStorage, 'multiSet').mockImplementation();
    await store.dispatch(
      loginAction()
    );
    expect(store.getActions().length).toBeLessThanOrEqual(2);

    expect(loginSuccess(auth)).toEqual({
      type: types.LOGIN_SUCCESS,
      payload: {
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        currentUser: auth.user,
        token: auth.token
      }
    });
  });
  it('Call loginAction with failure', async () => {
    const accessResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      currentUser: { email: 'email@email.com' }
    };
    const tokenResponse = {
      status: 401,
      json: () => Promise.resolve({ token: '123459601345678' })
    };
    jest.spyOn(Google, 'authAsync').mockImplementation(() => ({
      accessToken: accessResponse.accessToken,
      refreshToken: accessResponse.refreshToken
    }));
    jest.spyOn(global, 'fetch').mockImplementation(() => accessResponse);
    jest.spyOn(global, 'fetch').mockImplementation(() => tokenResponse);
    store = mockStore({});

    const message = 'You cancelled the login process.';
    await store.dispatch(loginAction());
    expect(store.getActions().length).toBeLessThanOrEqual(2);
    expect(loginFailure(message)).toEqual({
      type: types.LOGIN_FAILED,
      payload: message
    });
  });
});
