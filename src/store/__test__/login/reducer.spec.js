import reducer, { INITIAL_STATE } from '../../login/reducers';
import * as actions from '../../login/actions';


const data = {
  error: {},
  currentUser: { email: 'my.email@email.com' },
  token: 'token',
  accessToken: 'accesstoken',
  refreshToken: 'refreshtoken',
  isLoading: false
};
describe('Auth reducer', () => {
  it('Should test the reducer export', () => {
    expect(reducer).toBeTruthy();
  });
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  it('Should return the a new state from login initiation', () => {
    const action = actions.loginRequest();
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.isLoading).toEqual(true);
  });
  it('Should return the a new state from login success', () => {
    const {
      accessToken, refreshToken, currentUser, token
    } = data;
    const action = actions.loginSuccess({
      accessToken, refreshToken, user: currentUser, token
    });
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.isLoading).toEqual(false);
  });
  it('Should display a message from failure to login', () => {
    const message = 'You cancelled the login process.';
    const action = actions.loginFailure(message);
    const newState = reducer(INITIAL_STATE, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error.message).toEqual(message);
  });
});
