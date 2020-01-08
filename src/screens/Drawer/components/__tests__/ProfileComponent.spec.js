import React from 'react';
import { shallow } from 'enzyme';
import ProfileComponent from '../ProfileComponent';

describe('ProfileComponent', () => {
  const props = {
    userData: {
      picture: 'http://link-to-image.com',
      lastName: 'lastname',
      firstName: 'firstname',
    }
  };
  const wrapper = shallow(<ProfileComponent {...props} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
