import React from 'react';
import { shallow } from 'enzyme';
import HeaderRight from '../HeaderRight';

const onPress = jest.fn();
const props = {
  onPress
};
const wrapper = shallow(<HeaderRight {...props} />);

describe('Navigation bar Right part', () => {
  test('should render right part of navigation with correct icon', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should navigate to user calendar screen', () => {
    const calendarBtn = wrapper.find(`[testId="calendar-btn"]`);
    calendarBtn.props().onPress();
    expect(onPress).toBeCalled();
  });
});
