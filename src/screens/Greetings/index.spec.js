import React from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
import { Dialogflow_V2 as DialogFlow } from 'react-native-dialogflow-text';
import navigationProps from '../../../__tests__/helpers/navigationProps';
import { GreetingsScreen, mapStateToProps, mapDispatchToProps } from './index';
import { user, accessToken } from '../../../__tests__/mock/data';
import {
  mockAsyncStorage,
  mockFetchWithValues
} from '../../../__tests__/mock/libraries';

jest.mock('jwt-decode');

const [pinAttendees] = Array(4).fill(jest.fn());

const props = {
  ...navigationProps,
  sendHiddenMessage: jest.fn(),
  sendMessages: jest.fn(),
  sendMessage: jest.fn(),
  getAttendeeEmail: jest.fn(),
  sendEvents: jest.fn(),
  pinAttendees,
  pinnedAttendees: [],
  isBotProcessing: true
};

const wrapper = shallow(<GreetingsScreen {...props} />);
const wrapperInstance = wrapper.instance();

describe('Greetings screen', () => {
  test('should render greetings screen', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should simulate the onSend message method', () => {
    const text = { text: 'hello companion' };
    const message = ['hello companion'];
    expect(wrapperInstance._onSend(text)).toMatchSnapshot();
    wrapper
      .find('GiftedChat')
      .props()
      .onSend(message);
  });

  test('should render the input toolbar correctly', () => {
    expect(wrapperInstance.renderInputToolbar()).toMatchSnapshot();
  });

  test('should render the send button', () => {
    expect(wrapperInstance.renderSend()).toMatchSnapshot();
  });

  test('should render the new message', () => {
    expect(wrapperInstance.renderMessage()).toMatchSnapshot();
  });

  test('should render the footer', () => {
    expect(wrapperInstance.renderFooter()).toMatchSnapshot();
  });

  test('should render the null footer', () => {
    const nullProps = { ...props, isBotProcessing: null };
    const Nullwrapper = shallow(<GreetingsScreen {...nullProps} />);
    const NullwrapperInstance = Nullwrapper.instance();
    expect(NullwrapperInstance.renderFooter()).toMatchSnapshot();
  });

  test('render message on press', () => {
    wrapperInstance.renderMessage().props.onPress();
    wrapperInstance.renderMessage().props.action.directionsArrival();
  });

  test('should mount the keyboard spacer if the platform is not iOS', () => {
    Platform.OS = 'android';
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
      () => new Promise((resolve) => {
        resolve(null);
      })
    );
    const shallowComponent = shallow(<GreetingsScreen />);
    expect(shallowComponent).toMatchSnapshot();
  });

  test('componentDidMount', () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
      () => new Promise((resolve) => {
        resolve('test');
      })
    );
    return AsyncStorage.getItem('token').then((token) => {
      jest.spyOn(DialogFlow, 'setConfiguration');
      expect(token).toEqual('test');
    });
  });
});

describe('Add attendees to a meeting', () => {
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should search attendee by email', async () => {
    mockAsyncStorage(accessToken);
    mockFetchWithValues([user]);
    const text = 'example@example.com';
    await wrapper.instance().getAttendeeEmail(text);
    expect(wrapper.state().text).toEqual(text);
    expect(wrapper.state().data.length).toEqual(1);
  });

  test('should remove the searches after a user is selected', async () => {
    await wrapper.instance().getAttendeeEmail('');
    expect(wrapper.state().text).toEqual('');
    expect(wrapper.state().data.length).toEqual(0);
  });
  test('should respond to pin attendee', async () => {
    await wrapper.instance().pinSelectedAttendee(user);
    expect(pinAttendees).toBeCalled();
  });
});

describe('test for dispatch actions', () => {
  const item = {
    email: 'test@andela.com'
  };
  test('should dispatch action', () => {
    const initialState = {
      messages: {
        messages: []
      },
      error: {},
      text: '',
      pinnedAttendees: [],
      isLoading: false,
      auth: {
        currentUser: {}
      }
    };
    expect(mapStateToProps(initialState).messages).toEqual([]);
  });
  test('should dispatch sendMessage action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).sendMessages();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
  test('should dispatch sendEvents action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).sendEvents();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  test('should dispatch sendHiddenMessage action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).sendHiddenMessage();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  test('should dispatch pinAttendees action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).pinAttendees();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
  test('should dispatch fetchCalendar action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchCalendar();
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
  test('should dispatch unpinAttendee action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).unpinAttendee(item);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});

describe('The mapDispatchToProps function', () => {
  let dispatch;
  let dispatchProp;
  const item = {
    email: 'test@andela.com'
  };
  beforeEach(() => {
    dispatch = jest.fn(() => Promise.resolve());
    dispatchProp = mapDispatchToProps(dispatch);
  });

  it('should dispacth send messages when sendmessages is called', () => {
    dispatchProp.sendMessages();
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispacth send messages when sendmessages is called', () => {
    dispatchProp.sendHiddenMessage();
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispacth send messages when unpinAttendee is called', () => {
    dispatchProp.unpinAttendee(item);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispacth send messages when unpinAttendee is called', () => {
    dispatchProp.sendEvents();
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispacth send messages when unpinAttendee is called', () => {
    dispatchProp.pinAttendees(item);
    expect(dispatch).toHaveBeenCalled();
  });
});
