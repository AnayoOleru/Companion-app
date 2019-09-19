import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';
import screenshotHandler from '../../../../../__tests__/helpers/screenshotsHandler';

const [onPress] = Array(1).fill(jest.fn());
const props = {
  onPress
};
const componentWrapper = shallow(<Button {...props} />);

describe('Button', () => {
  describe('Component rendering', () => {
    screenshotHandler(componentWrapper);

    test('should button respond to onPress', () => {
      componentWrapper.props().onPress();
      expect(onPress).toBeCalled();
    });
    test('should be a loading button', () => {
      componentWrapper.setProps({ loading: true });
      const loadingIndicator = componentWrapper.find(
        `[testId="activity-indicator"]`
      );
      expect(loadingIndicator).toBeTruthy();
    });
  });
});
