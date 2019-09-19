import React from 'react';
import { shallow } from 'enzyme';
import HeaderLeft from '../HeaderLeft';

const wrapper = shallow(<HeaderLeft />);

describe('Navigation bar left part', () => {
  test('should render left part without icon', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render left part of navigation with avatar', () => {
    const container = shallow(<HeaderLeft profileAvatar="fakeUri" />);
    expect(container).toMatchSnapshot();
  });
});
