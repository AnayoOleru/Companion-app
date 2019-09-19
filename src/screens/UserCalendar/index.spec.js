import React from 'react';
import { shallow } from 'enzyme';
import { CalendarContainer as UserCalendar } from './index';
import navigation from '../../../__tests__/helpers/navigationProps';
import { user, accessToken } from '../../../__tests__/mock/data';
import {
  mockAsyncStorage, mockFetchWithValues
} from '../../../__tests__/mock/libraries';

const users = [user];
const removeUser = jest.fn();
const [fetchCalendar, getDayEvents, setUser] = Array(4).fill(jest.fn());
const props = {
  ...navigation,
  currentEvents: [],
  events: {},
  isLoading: false,
  selectedDate: '2019-08-01',
  error: {},
  pinnedUsers: [],
  setUser,
  removeUser,
  fetchCalendar,
  getDayEvents
};

const component = shallow(<UserCalendar {...props} />);
describe('User Calendar Component', () => {
  let instance;
  beforeEach(() => {
    instance = component.instance();
    jest.spyOn(instance, 'getUserCalendar');
    jest.spyOn(instance, 'handleDateSelect');
    jest.spyOn(instance, 'handleMonthChange');
    instance.forceUpdate();
  });
  afterEach(() => {
    instance.getUserCalendar.mockClear();
    instance.handleDateSelect.mockClear();
    instance.handleMonthChange.mockClear();
    setUser.mockClear();
    removeUser.mockClear();
    fetchCalendar.mockClear();
    getDayEvents.mockClear();
  });
  test('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should fetch user calendar data', async () => {
    await instance.componentDidMount();
    expect(instance.getUserCalendar).toHaveBeenCalled();
  });

  test('should fetch user calendar data', async () => {
    await instance.componentDidMount();
    expect(instance.getUserCalendar).toHaveBeenCalled();
  });

  test('should change date on data press', () => {
    const container = component.find(`[testId="calendar-container"]`);
    container.props().handleDateSelect('2019-07-07');
    expect(instance.handleDateSelect).toBeCalled();
  });

  test('should not fetch more if month did not change', () => {
    const container = component.find(`[testId="calendar-container"]`);
    container.props().onMonthChange({ dateString: '2019-08-01' });
    expect(instance.handleMonthChange).toBeCalled();
    expect(fetchCalendar).not.toBeCalled();
  });

  test('should fetch more date on month change', () => {
    const container = component.find(`[testId="calendar-container"]`);
    container.props().onMonthChange({ dateString: '2019-09-08' });
    expect(instance.handleMonthChange).toBeCalled();
    expect(fetchCalendar).toBeCalledWith('2019-09-08', []);
  });

  test('should respond on pin user', () => {
    component.props().pinUser(users[0]);
    expect(setUser).toBeCalled();
  });

  test('should respond on unpin user', () => {
    component.props().unpinUser(users[0], '2019-08-01', []);
    expect(removeUser).toBeCalledWith(users[0].email, '2019-08-01', []);
  });

  test('should search user by email', async () => {
    mockAsyncStorage(accessToken);
    mockFetchWithValues(users);
    const text = 'me@example.com';
    await component.props().getUserEmail(text);
    expect(component.state().text).toEqual(text);
    expect(component.state().data.length).toEqual(1);
  });

  test('should search user by email', async () => {
    const text = '';
    await component.props().getUserEmail(text);
    expect(component.state().text).toEqual(text);
    expect(component.state().data.length).toEqual(0);
  });
});
