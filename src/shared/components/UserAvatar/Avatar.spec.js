import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './Avatar';

const props = {
  profileAvatar: ''
};
const wrapper = shallow(<Avatar {...props} />);

describe('User Avatar Component', () => {
  describe('Component Render', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
