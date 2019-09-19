import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../Avatar';

const wrapper = shallow(<Avatar />);

describe('Conversation avatar', () => {
  test('should render avatar with an image', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
