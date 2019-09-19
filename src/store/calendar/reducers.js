import { mapValues, uniqBy } from 'lodash';
import settings from '../../constants/calendarSettings';
import {
  FETCHING_EVENTS,
  FETCHING_EVENTS_SUCCESS,
  GET_SELECTED_DATE_EVENTS,
  HANDLE_CALENDAR_MONTH_CHANGE,
  PIN_USERS,
  UNPIN_USERS
} from './types';
import { getSelectedDayEvents } from '../../utils/helpers';

const today = new Date().toISOString().split('T')[0];

export const INITIAL_STATE = {
  events: {},
  currentEvents: [...Object.values(settings.hours)],
  selectedDate: today,
  error: {},
  text: '',
  pinnedUsers: [],
  isLoading: false
};

export const eventsAndCurrentEvents = (state, payload) => {
  const events = mapValues(state.events, item => item.filter((event) => {
    const { userEmail } = event;
    return userEmail !== payload;
  }));
  return {
    events,
    currentEvents: getSelectedDayEvents(events[state.selectedDate])
  };
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCHING_EVENTS:
      return {
        ...state,
        isLoading: true,
        error: {}
      };
    case FETCHING_EVENTS_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false
      };
    case GET_SELECTED_DATE_EVENTS:
      return {
        ...state,
        currentEvents: getSelectedDayEvents(state.events[payload]),
        selectedDate: payload
      };
    case HANDLE_CALENDAR_MONTH_CHANGE:
      return {
        ...state,
        selectedDate: payload,
        events: {},
        currentEvents: [...Object.values(settings.hours)],
        isLoading: true
      };
    case PIN_USERS:
      return {
        ...state,
        pinnedUsers: uniqBy([...state.pinnedUsers, payload], 'userId')
      };

    case UNPIN_USERS:
      return {
        ...state,
        pinnedUsers: state.pinnedUsers.filter(user => user.email !== payload),
        ...eventsAndCurrentEvents(state, payload)
      };
    default:
      return state;
  }
};
