import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './Home';

const props = {
  navigation: {
    setParams: jest.fn()
  },
  loginSuccess: jest.fn()
};
const wrapper = shallow(<Home {...props} />);

describe('Home Test', () => {
  it('Home Screen to Render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
