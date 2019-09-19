import React from 'react';
import { shallow } from 'enzyme';
import ConnectionNotice from './index';
import {
  netInfoRemoveListenerTest,
  handleConnectionChangeTest
} from '../../utils/helpers';

describe('ConnectionNotice', () => {
  const wrapper = shallow(<ConnectionNotice />);
  const instance = wrapper.instance();
  it('renders correctly', () => {
    expect(instance).toMatchSnapshot();
  });

  it('renders when isConnect is false', () => {
    instance.setState({ isConnected: false });
    expect(instance).toMatchSnapshot();
  });

  netInfoRemoveListenerTest(instance);

  handleConnectionChangeTest(instance);
});
