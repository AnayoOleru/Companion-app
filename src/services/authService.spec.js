import * as Google from 'expo-app-auth';
import moxios from 'moxios';
import { AsyncStorage } from 'react-native';
import * as AuthService from './AuthService';
import {
  user as userProfile,
  accessToken,
  refreshToken,
  token
} from '../../__tests__/mock/data';

describe('Authentication Service', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('https://companion-app-dialogflow.herokuapp.com/tokens', {
      status: 200,
      responseText: 'hello'
    });
  });

  describe('Get Google AccessToken', () => {
    test('should get access token from Google', async () => {
      jest.spyOn(Google, 'authAsync').mockImplementation(() => ({
        accessToken,
        refreshToken
      }));
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve(userProfile),
        ok: true
      }));
      const { googleConfig } = AuthService;
      await AuthService.getAccessToken();
      expect(Google.authAsync).toBeCalledWith(googleConfig);
    });
  });

  describe('Get JWT token', () => {
    test('should retrieve JWT token', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({ token }),
        ok: true,
        status: 200
      }));
      const response = await AuthService.getJwtToken(accessToken);
      expect(response instanceof Object).toBeTruthy();
      expect.objectContaining({ token: response.token });
    });
    test('should throw an unauthorized', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({}),
        ok: false
      }));
      let response;
      try {
        response = await AuthService.getJwtToken(accessToken);
      } catch (error) {
        response = error.message;
      }
      expect(response).toEqual(
        'We weren\'t able to authenticate you, please try again'
      );
    });

    test('should throw unknown error', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({}),
        ok: 'something else'
      }));
      let response;
      try {
        response = await AuthService.getJwtToken(accessToken);
      } catch (error) {
        response = error.message;
      }
      expect(response).toEqual(
        'We weren\'t able to authenticate you, please try again'
      );
    });
  });

  describe('Sign Out and Token refresh', () => {
    test('should sign out and revoke accessToken', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => accessToken);
      jest.spyOn(Google, 'revokeAsync').mockImplementation(() => true);
      await AuthService.signOut(accessToken);
      expect(Google.revokeAsync).toBeCalledWith(AuthService.googleConfig, {
        isClientIdProvided: true,
        token: accessToken
      });
    });

    test('should sign out throw an error', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => accessToken);
      jest.spyOn(Google, 'revokeAsync').mockImplementation(() => {
        throw new Error('Invalid token');
      });
      try {
        await AuthService.signOut(accessToken);
      } catch (error) {
        expect(error.message).toEqual('Invalid token');
      }
    });

    test('should throw sign out failed error', async () => {
      jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => accessToken);
      jest.spyOn(Google, 'revokeAsync').mockImplementation(() => {
        const err = 'error';
        throw err;
      });
      try {
        await AuthService.signOut(accessToken);
      } catch (error) {
        expect(error.message).toEqual('Sign out failed');
      }
    });

    test('should refresh token succeed', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({ token }),
        ok: true,
        status: 200
      }));
      jest
        .spyOn(Google, 'refreshAsync')
        .mockImplementation(() => ({ accessToken, refreshToken }));
      const isAuthenticated = await AuthService.refreshAuth(
        refreshToken,
        accessToken
      );
      expect(isAuthenticated).toBeTruthy();
    });
  });
});
