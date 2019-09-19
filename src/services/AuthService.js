import * as Google from 'expo-app-auth';
import { AsyncStorage } from 'react-native';
import config from '../../config';

const { GOOGLE_CLIENT_ID, ANDELA_AUTH_API } = config;
export const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: GOOGLE_CLIENT_ID,
  scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
};

export const getAccessToken = async () => {
  const response = await Google.authAsync(googleConfig);
  const profileData = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${response.accessToken}` }
  });

  let currentUser = {};
  if (profileData.ok) {
    currentUser = await profileData.json();
  }

  if (response.accessToken && response.refreshToken) {
    return { ...response, currentUser };
  }
  throw new Error('Please make sure to use a valid Andela email');
};

export const getJwtToken = async (accessToken) => {
  const response = await fetch(
    `${ANDELA_AUTH_API}/token?google_token=${accessToken}`
  );

  const data = await response.json();

  switch (response.status) {
    case 200:
      return data;
    case 401:
      throw new Error('You can only login with your Andela email!');
    default:
      throw new Error('We weren\'t able to authenticate you, please try again');
  }
};

export const signOut = async (accessToken) => {
  try {
    if (accessToken) {
      const options = {
        token: accessToken,
        isClientIdProvided: true
      };
      await Google.revokeAsync(googleConfig, options);
    }
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'token']);
    return;
  } catch (error) {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'token']);
    throw new Error(error.message || 'Sign out failed');
  }
};
const authState = async (accessToken, refreshToken, callback) => {
  const jwtToken = await getJwtToken(accessToken);
  if (accessToken && jwtToken) {
    if (callback) {
      callback({
        accessToken,
        refreshToken,
        token: jwtToken
      });
    }
    return true;
  }
  return false;
};
export const refreshAuth = async (
  currentRefreshToken, currentAccessToken, callback
) => {
  try {
    if (!currentRefreshToken) {
      await signOut(currentAccessToken);
      return false;
    }
    const { accessToken, refreshToken } = await Google.refreshAsync(
      googleConfig,
      currentRefreshToken
    );
    return await authState(accessToken, refreshToken, callback);
  } catch (error) {
    signOut(currentAccessToken);
    return false;
  }
};
