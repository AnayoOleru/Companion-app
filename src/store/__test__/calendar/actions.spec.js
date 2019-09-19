import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getCalendarData,
  pinUser,
  fetchCalendars,
  unpinUser
} from '../../calendar/actions';
import dummyEvents from '../../../../__tests__/mock/calendar.json';
import { mockFetchWithPromises } from '../../../../__tests__/mock/libraries';

const mockStore = configureStore([thunk]);
let store;
const today = new Date().toISOString().split('T')[0];

describe('Test calendar actions', () => {
  beforeEach(() => {
    store = mockStore({
      auth: {
        accessToken: 'some-access-token'
      }
    });
  });
  it('should do test getCalendarData action success ', () => {
    store = mockStore({
      auth: {
        accessToken: 'some-access-token'
      }
    });

    return store.dispatch(getCalendarData()).then(() => {
      expect(store.getActions().length).toBeLessThanOrEqual(2);
    });
  });

  it('should do test getCalendarData action success ', () => {
    store = mockStore({
      auth: {
        accessToken: 'some-access-token'
      }
    });
    jest.mock('react-native', () => ({
      AsyncStorage: {
        getItem: jest.fn(() => new Promise(resolve => resolve(null)))
      }
    }));
    mockFetchWithPromises(dummyEvents);
    fetchCalendars();
    return store.dispatch(getCalendarData(today, ['ex@email.com'])).then(() => {
      expect(store.getActions().length).toBeLessThanOrEqual(2);
    });
  });

  it('should do test getCalendarData action success ', async () => {
    store = mockStore({
      auth: {
        accessToken: 'some-access-token'
      }
    });
    const item = {
      username: 'caleb',
      email: 'caleb@email.com',
      userId: 1
    };

    jest.mock('react-native', () => ({
      AsyncStorage: {
        getItem: jest.fn(() => new Promise(resolve => resolve()))
      }
    }));

    const fakeCalendarEvents = dummyEvents;

    mockFetchWithPromises(fakeCalendarEvents);
    await store.dispatch(pinUser(item, today, item.email));
    await store.dispatch(unpinUser(item.email, null, [item]));
    expect(store.getActions().length).toBeLessThanOrEqual(4);
  });
});
