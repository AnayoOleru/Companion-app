import React from 'react';
import { shallow } from 'enzyme';
import EventDurationQueryMessage from '../EventDurationQueryMessage';
import DurationMessage from '../DurationMessage';

const props = { onPress: jest.fn() };

const wrapper = shallow(<EventDurationQueryMessage {...props} />);

describe('Ask for event duration', () => {
  test('event duration suggestion should be rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('isAccepted state for duration message should be true', () => {
    wrapper
      .find(DurationMessage)
      .first()
      .props()
      .onDurationPress();
    expect(wrapper.instance().state.isAccepted).toBe(true);
  });
});
