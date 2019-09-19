import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '../MenuItem';

const props = {
  onPress: jest.fn()
};
const wrapper = shallow(<MenuItem {...props} />);

describe('Available choices', () => {
  test('should render the menu item', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
