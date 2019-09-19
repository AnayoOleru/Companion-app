import React from 'react';
import { shallow } from 'enzyme';
import BotProcessing from '../BotProcessing';

const wrapper = shallow(<BotProcessing />);

describe('Gifted chat bot processing loader', () => {
  test('should render the bot processing loader', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
