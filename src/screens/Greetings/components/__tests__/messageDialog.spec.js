import React from 'react';
import { shallow } from 'enzyme';
import MessageDialog from '../MessageDialog';

const props = {
  currentMessage: {
    text: 'Here is the calendar, book your meeting'
  },
  onPress: jest.fn
};

const wrapper1 = shallow(<MessageDialog position="right" {...props} />);
const wrapper2 = shallow(<MessageDialog position="left" {...props} />);

describe('Gifted chat bot message', () => {
  test('should render the bot message', () => {
    expect(wrapper1).toMatchSnapshot();
  });

  test('should render the bot message', () => {
    expect(wrapper2).toMatchSnapshot();
  });
});
