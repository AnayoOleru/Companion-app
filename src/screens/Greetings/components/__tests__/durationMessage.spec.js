import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { shallow } from 'enzyme';
import DurationMessage from '../DurationMessage';

const onDurationPress = jest.fn();
const duration = '30 minutes';
const isAccepted = false;

const wrapper = shallow(
  <DurationMessage
    onDurationPress={onDurationPress}
    duration={duration}
    isAccepted={isAccepted}
  />
);

describe('Render Duration message', () => {
  test('specific duration message should be rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('isAccepted state for duration message should be true', () => {
    wrapper
      .find(TouchableWithoutFeedback)
      .first()
      .props()
      .onPress();
    expect(onDurationPress).toHaveBeenCalled();
  });
});
