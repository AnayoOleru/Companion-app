import React from 'react';
import { shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import Calendar from '../Calendar';
import navigation from '../../../../../__tests__/helpers/navigationProps';
import { user } from '../../../../../__tests__/mock/data';
import {
  netInfoRemoveListenerTest,
  handleConnectionChangeTest
} from '../../../../utils/helpers';

const props = {
  ...navigation,
  events: {},
  currentEvents: [],
  handleDateSelect: jest.fn(),
  onMonthChange: jest.fn(),
  selectedDate: '2019-07-05',
  isLoading: false,
  getUserEmail: jest.fn(),
  pinUser: jest.fn(),
  text: '',
  data: [user],
  pinnedUsers: [{ ...user, userId: '56afdhgaf', imageUrl: user.picture }],
  unpinUser: jest.fn()
};

const wrapper = Renderer.create(<Calendar {...props} />);
const shallowWrapper = shallow(<Calendar {...props} />);
const testInstance = wrapper.root;
describe('User Calendar Component', () => {
  const instance = shallowWrapper.instance();

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  netInfoRemoveListenerTest(instance);

  handleConnectionChangeTest(instance);
});


describe('Interaction', () => {
  let instance;
  beforeEach(() => {
    instance = wrapper.getInstance();
    jest.spyOn(instance, 'handleMonthChange');
    jest.spyOn(instance, 'toggleCalendar');
    jest.spyOn(instance, 'navigateBack');
    instance.forceUpdate();
  });
  afterEach(() => {
    instance.handleMonthChange.mockClear();
    instance.toggleCalendar.mockClear();
    instance.navigateBack.mockClear();
  });

  it('should call toggleCalendar', () => {
    const calendarHeader = testInstance.findByProps({
      testID: 'calendar-header'
    });
    calendarHeader.props.onToggle();
    expect(instance.toggleCalendar).toBeCalled();
    expect(instance.state.isCalendarOpen).toBe(false);
  });

  it('should call handleMonthChange', () => {
    const calendarProvider = testInstance.findByProps({
      testID: 'calendar-provider'
    });
    calendarProvider.props.onMonthChange({ dateString: '2018-09-09' });
    expect(instance.handleMonthChange).toBeCalledWith({
      dateString: '2018-09-09'
    });
    expect(props.onMonthChange).toBeCalledWith({
      dateString: '2018-09-09'
    }, [user.email]);
  });

  it('should navigate to the previous screen', () => {
    const calendarHeader = testInstance.findByProps({
      testID: 'calendar-header'
    });
    calendarHeader.props.goBack();
    expect(instance.navigateBack).toBeCalled();
    expect(props.navigation.goBack).toBeCalledWith(null);
  });
});
