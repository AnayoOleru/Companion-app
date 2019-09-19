import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-app-auth';
import { shallow } from 'enzyme';
import { LoginContainer } from './index';
import navigationProps from '../../../__tests__/helpers/navigationProps';

jest.useFakeTimers();
const [show] = Array(1).fill(jest.fn());
const accessToken = 'converge673companion25appa-kjahdfkjah-akjdfhakjfh';

const props = {
  navigation: {
    ...navigationProps.navigation
  },
  loginAction: jest.fn()
};

const componentWrapper = shallow(<LoginContainer {...props} />);
const instance = componentWrapper.instance();
instance.toast = {
  show
};
instance.forceUpdate();

describe('Login Container', () => {
  beforeEach(() => {
    jest.spyOn(AsyncStorage, 'multiSet');
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve(true),
      ok: true
    }));
  });

  afterEach(() => {
    AsyncStorage.multiSet.mockClear();
    navigationProps.navigation.navigate.mockClear();
    show.mockClear();
  });

  test('should match snapshot', () => {
    const toast = componentWrapper.find(`[testId="toast-notification"]`);
    expect(componentWrapper).toMatchSnapshot();
    expect(toast).toBeTruthy();
  });

  test('should catch error if Google auth failed', async () => {
    Google.authAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'canceled',
      error: { message: 'cancel' }
    }));
    await componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.multiSet).not.toHaveBeenCalled();
    expect(instance.state.authenticating).toBe(false);
  });

  test('should respond to Google auth button onPress', async () => {
    jest.spyOn(instance, 'signInWithGoogle');
    instance.forceUpdate();
    expect(instance.state.authenticating).toBe(false);
    await componentWrapper.props().handleLoginPress();
    expect(instance.signInWithGoogle).toHaveBeenCalled();
    expect(props.loginAction).toBeCalled();
  });

  test('should respond to Google auth error', async () => {
    componentWrapper.setProps({
      auth: {
        error: {
          message: 'Please make sure to use a valid Andela email'
        },
        isLoading: false
      }
    });

    expect(show).toBeCalledWith(
      'Please make sure to use a valid Andela email',
      5000
    );
  });

  test('should cancel the login process', async () => {
    Google.authAsync = jest.fn().mockImplementationOnce(() => ({
      type: 'success',
      accessToken
    }));
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ error: { message: 'user cancel' } }),
      ok: false
    }));
    expect(instance.state.authenticating).toBe(false);
    await componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.multiSet).not.toHaveBeenCalled();
    expect(instance.state.error).not.toBe(null);
  });

  test('should button not respond if authenticating', () => {
    componentWrapper.setState({ authenticating: true });
    instance.forceUpdate();
    componentWrapper.props().handleLoginPress();
    expect(AsyncStorage.multiSet).not.toHaveBeenCalled();
    expect(instance.state.authenticating).toBe(true);
    expect(navigationProps.navigation.navigate).not.toBeCalled();
  });
});
