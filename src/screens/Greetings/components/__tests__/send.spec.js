import React from 'react';
import { shallow } from 'enzyme';
import Send from '../Send';

const wrapper = shallow(<Send />);

describe('send button', () => {
  test('should render the send button', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
