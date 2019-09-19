import { LOGIN_FAILED, LOGIN_SUCCESS, LOGING_IN } from './types';

export const INITIAL_STATE = {
  error: {},
  currentUser: {},
  token: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGING_IN:
      return {
        ...state,
        error: {},
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
        error: {}
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: {
          message: payload
        }
      };
    default:
      return state;
  }
};
