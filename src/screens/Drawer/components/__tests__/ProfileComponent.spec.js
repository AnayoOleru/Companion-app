import React from 'react';
import { shallow } from 'enzyme';
import ProfileComponent from '../ProfileComponent';

describe('ProfileComponent', () => {
  const props = {
    userData: {
      picture: 'http://link-to-image.com',
      lastName: 'lastname',
      firstName: 'firstname',
      email: 'first.last@andela.com'
    }
  };
  const wrapper = shallow(<ProfileComponent {...props} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
