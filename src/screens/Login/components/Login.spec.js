import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

const [handleLoginPress] = Array(1).fill(jest.fn());
const props = {
  handleLoginPress,
  disabled: false
};
const componentWrapper = shallow(<Login {...props} />);
describe('Login Screen', () => {
  describe('Component Rendering', () => {
    test('should match the snapshot', () => {
      expect(componentWrapper).toMatchSnapshot();
    });

    test('should respond to Google auth button onPress', () => {
      const button = componentWrapper.find(`[testID="google-btn"]`);
      button.props().onPress();
      expect(button).toBeTruthy();
      expect(handleLoginPress).toHaveBeenCalled();
    });
  });
});
