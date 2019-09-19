import React from 'react';
import { shallow } from 'enzyme';
import AddCalendarButton from '../HeaderIconButton';

const props = {
  onPress: jest.fn(),
  icon: 'search',
  size: 23,
  containerStyles: {}
};
const wrapper = shallow(<AddCalendarButton {...props} />);

describe('User AddCalendarButton Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should should press button', () => {
    wrapper.props().onPress();
    expect(props.onPress).toBeCalled();
  });
});
