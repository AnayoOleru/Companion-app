import React from 'react';
import { shallow } from 'enzyme';
import MenuOptions from '../MenuOptions';

const props = {
  onPress: jest.fn()
};
const wrapper = shallow(<MenuOptions {...props} />);

describe('MenuOptions', () => {
  test('should render the menu options', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
