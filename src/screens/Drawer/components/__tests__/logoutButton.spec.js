import React from 'react';
import { shallow } from 'enzyme';
import LogoutButton from '../LogoutButton';

describe('LogoutButton', () => {
  const wrapper = shallow(<LogoutButton />);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
