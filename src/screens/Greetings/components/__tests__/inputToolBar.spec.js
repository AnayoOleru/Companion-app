import React from 'react';
import { shallow } from 'enzyme';
import InputToolBar from '../InputToolBar';

const props = {
  onPress: jest.fn(),
  skipOnBoarding: jest.fn()
};
const wrapper = shallow(<InputToolBar {...props} />);

describe('the input tool bar ', () => {
  test('should render the input tool bar ', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
