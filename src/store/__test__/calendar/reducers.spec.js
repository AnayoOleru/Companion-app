import reducers, {
  INITIAL_STATE,
  eventsAndCurrentEvents
} from '../../calendar/reducers';
import {
  FETCHING_EVENTS,
  PIN_USERS,
  FETCHING_EVENTS_SUCCESS,
  GET_SELECTED_DATE_EVENTS,
  HANDLE_CALENDAR_MONTH_CHANGE,
  UNPIN_USERS
} from '../../calendar/types';
import dummyEvents from '../../../../__tests__/mock/calendar.json';

describe('Test calendar reducers', () => {
  it('should return an initial state', () => {
    expect(
      reducers(undefined, {
        type: '',
        payload: {}
      })
    ).toEqual(INITIAL_STATE);
  });

  it('should unpin user and remove his calendar', () => {
    const store = reducers(
      {
        ...INITIAL_STATE,
        pinnedUsers: [{ email: 'test@gmail.com' }, { email: 'caleb@gmail.com' }]
      },
      {
        type: UNPIN_USERS,
        payload: 'caleb@gmail.com'
      }
    );
    expect(store.pinnedUsers.length).toEqual(1);
  });

  it('should add the user\'s calendar', () => {
    const store = reducers(
      {
        ...INITIAL_STATE
      },
      {
        type: PIN_USERS,
        payload: {
          pinnedUsers: [{ id: 1, email: 'caleb@gmail.com' }]
        }
      }
    );
    expect(store.pinnedUsers.length).toEqual(1);
  });

  it('should fetch events', () => {
    const store = reducers(
      {
        ...INITIAL_STATE,
        isLoading: true
      },
      {
        type: FETCHING_EVENTS
      }
    );
    expect(store.isLoading).toEqual(true);
  });

  it('FETCHING_EVENTS_SUCCESS', () => {
    const store = reducers(
      {
        ...INITIAL_STATE,
        events: dummyEvents,
        currentEvents: {},
        isLoading: false
      },
      {
        type: FETCHING_EVENTS_SUCCESS
      }
    );
    expect(store.isLoading).toEqual(false);
  });

  it('GET_SELECTED_DATE_EVENTS', () => {
    const store = reducers(
      {
        ...INITIAL_STATE,
        selectedEvents: dummyEvents,
        currentEvents: {}
      },
      {
        type: GET_SELECTED_DATE_EVENTS
      }
    );
    expect(store.currentEvents).toBeDefined();
  });

  it('HANDLE_CALENDAR_MONTH_CHANGE', () => {
    const store = reducers(
      {
        ...INITIAL_STATE,
        selectedDate: dummyEvents,
        currentEvents: [],
        isLoading: true,
        events: {}
      },
      {
        type: HANDLE_CALENDAR_MONTH_CHANGE
      }
    );
    expect(store.isLoading).toEqual(true);
  });

  it('should test eventsAndCurrentEvents function', async () => {
    const response = eventsAndCurrentEvents(dummyEvents, 'caleb@email.com');
    expect(response.events).toBeDefined();
  });
});
