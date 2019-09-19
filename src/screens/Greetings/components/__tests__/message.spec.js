import React from 'react';
import { shallow } from 'enzyme';
import Message from '../Message';
import InteractionMessage from '../InteractionMessage';
import { messageConstants } from '../../../../utils/constants';
import props from './utils/componentProps';
import screenshotHandler from '../../../../../__tests__/helpers/screenshotsHandler';
import { directionProps } from '../Props';


const newProps = {
  ...props,
  currentMessage: {
    _id: 2,
    createdAt: '2019-06-17T17:10:37.523Z',
    text: 'Hello world',
    user: {
      _id: 1,
      avatar: 6,
      name: 'Companion App'
    }
  }
};

const props2 = {
  ...props,
  currentMessage: {
    _id: 2,
    createdAt: '2019-06-17T17:10:37.523Z',
    text: 'Hello world',
    user: {
      _id: 2,
      avatar: 'hello',
      name: 'Companion App'
    }
  }
};

describe('Gifted chat message', () => {
  const componentInitialMsg = shallow(<Message {...props} />);
  screenshotHandler(componentInitialMsg, 'should render the initial message');
  test('should render the initial message', () => {
    const wrapper = shallow(<Message {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render a location suggestion message', () => {
    const newprops = {
      ...props2,
      parameters: {
        floor: 'first'
      }
    };

    newprops.currentMessage.type = 'suggestion';
    const wrapper = shallow(<Message {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render a location suggestion message with blocks', () => {
    const newprops = { ...props2, parameters: { block: 'block A' } };
    newprops.currentMessage.type = 'suggestion';
    const wrapper = shallow(<Message {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render a location suggestion message with blocks', () => {
    const newprops = { ...props2, parameters: undefined };
    newprops.currentMessage.type = 'suggestion';
    const wrapper = shallow(<Message {...newprops} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Interaction message', () => {
  test('should test the interaction message', () => {
    const wrapper = shallow(<InteractionMessage
      {...directionProps('floor')}
      action={jest.fn()}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('test message constants', () => {
  test('should render the messageconstancts', () => {
    expect(messageConstants.BotString).toEqual('bot');
  });
});
