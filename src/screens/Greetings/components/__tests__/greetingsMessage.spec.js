import React from 'react';
import { AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
import GreetingsMessage from '../GreetingsMessage';
import { token } from '../../../../../__tests__/mock/data';

const props = {
  currentMessage: {
    text: ''
  },
  onPress: jest.fn()
};

jest.mock('jwt-decode');

const wrapper = shallow(<GreetingsMessage {...props} />);

describe('Greetings message', () => {
  let instance;
  beforeEach(() => {
    instance = wrapper.instance();
  });

  jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
    () => new Promise((resolve) => {
      resolve('hello');
    })
  );

  test('should render GreetingsMessage with correct message', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should update component after token is set', async () => {
    AsyncStorage.setItem('token', token);
    await instance.forceUpdate();
  });


  test('test welcome message', () => {
    shallow(<GreetingsMessage {...props} />);
    return AsyncStorage.getItem('token').then((testToken) => {
      expect(testToken).toEqual('hello');
    });
  });
});
