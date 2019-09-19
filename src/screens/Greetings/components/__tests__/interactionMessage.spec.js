import React from 'react';
import { shallow } from 'enzyme';
import InteractionMessage from '../InteractionMessage';

const props = {
  action: jest.fn(),
  text: 'Invite Attendees',
  icon: 'image.png',
  AcceptedPrcolor: 'rgba(4,89,228,1)',
  NotAcceptedPrcolor: 'rgba(4,89,28,1)',
  AcceptedBgcolor: 'rgba(4,89,228,1)',
  NotAcceptedBgcolor: 'rgba(4,89,28,1)'
};

const wrapper = shallow(<InteractionMessage {...props} />);

describe('Interaction message Component', () => {
  test('should render interaction message', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
