import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

const props = {
  goBack: jest.fn(),
  onToggle: jest.fn(),
  isCalendarOpen: true,
  onSearchPress: jest.fn(),
  usersHeaderAvatar: [
    {
      imageUrl: 'https://mex.hello.png',
      username: 'Me You',
      userId: '345678'
    }
  ]
};

const props1 = {
  goBack: jest.fn(),
  onToggle: jest.fn(),
  isCalendarOpen: true,
  onSearchPress: jest.fn(),
  usersHeaderAvatar: []
};
const component = shallow(<Header {...props} />);
const component1 = shallow(<Header {...props1} />);

describe('Calendar Header Component', () => {
  it('should should match the snapshot if usersHeaderAvatar is not empty', () => {
    expect(component).toMatchSnapshot();
  });
  it('should should match the snapshot if usersHeaderAvatar is empty', () => {
    expect(component1).toMatchSnapshot();
  });
});
