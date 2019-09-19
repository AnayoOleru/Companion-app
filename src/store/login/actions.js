import { AsyncStorage } from 'react-native';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGING_IN } from './types';

import { getJwtToken, getAccessToken } from '../../services/AuthService';

export const loginRequest = () => ({
  type: LOGING_IN
});

export const loginSuccess = ({
  accessToken, refreshToken, user, token
}) => {
  const data = {
    accessToken,
    refreshToken
  };
  if (user) {
    data.currentUser = user;
  }
  if (token) {
    data.token = token;
  }
  return ({
    type: LOGIN_SUCCESS,
    payload: data
  });
};
export const loginFailure = message => ({
  type: LOGIN_FAILED,
  payload: message
});

export default loginAction => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { accessToken, refreshToken, currentUser: user } = await getAccessToken();
    const { token } = await getJwtToken(accessToken);
    await AsyncStorage.multiSet([
      ['accessToken', accessToken],
      ['refreshToken', refreshToken],
      ['token', token],
      ['currentUser', JSON.stringify(user)]
    ]);
    dispatch(loginSuccess({
      accessToken, refreshToken, user, token
    }));
    if (loginAction) loginAction();
  } catch (error) {
    let { message } = error;
    if (message.includes('cancel')) message = 'You cancelled the login process.';
    dispatch(loginFailure(message));
  }
};
