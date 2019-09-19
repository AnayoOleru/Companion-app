import moment from 'moment';
import uuid from 'uuid/v4';
import {
  flattenDeep, groupBy, mapValues, uniqBy
} from 'lodash';
import jwtDecode from 'jwt-decode';
import { AsyncStorage, NetInfo } from 'react-native';
import settings from '../constants/calendarSettings';
import companionAppLogo from
  '../screens/Greetings/components/icons/companion-logo.png';
import { messageConstants } from './constants';

const BOT_USER = { _id: 2, name: 'SmartBot', avatar: companionAppLogo };

export const currentUserEmail = async () => {
  const token = await AsyncStorage.getItem('token');
  const decoded = await jwtDecode(token);
  const {
    UserInfo: { email }
  } = decoded;
  return email;
};

const isValidDate = (value) => {
  if (!value) {
    return false;
  }
  if (!new Date(value).getTime() || !moment(value).isValid) {
    return false;
  }
  return true;
};

export const formatDate = (value) => {
  if (isValidDate(value)) {
    return moment(value).format('YYYY-MM-DD');
  }
  return undefined;
};

export const getStartHour = (value) => {
  if (isValidDate(value)) {
    return moment(value)
      .startOf('hour')
      .format('HH:mm');
  }
  return undefined;
};

const checkIfPrivate = (event) => {
  let summary = '';
  if (event.userEmail === 'primary') {
    return event.summary;
  }
  if (
    event.visibility !== 'undefined'
    && event.visibility === 'private'
    && event.userEmail !== event.currentUserEmail
  ) {
    summary = 'Busy';
  } else {
    const currentSummary = event.summary;
    summary = currentSummary;
  }
  return summary;
};

export const eventDuration = (start, end) => {
  const startTime = moment(new Date(start));
  const endTime = moment(new Date(end));
  const duration = endTime.diff(startTime, 'minutes');
  if (!duration) return undefined;
  return duration;
};

export const sample = (array = []) => {
  const results = array[Math.floor(Math.random() * array.length)];
  return results;
};

export const formatCalendarData = (data = []) => {
  if (!(data instanceof Array)) return {};
  const newDate = data.map((item) => {
    const event = {};
    ({
      id: event.id,
      sequence: event.sequence,
      status: event.status,
      location: event.location,
      creator: event.creator,
      organizer: event.organizer,
      end: event.end,
      summary: event.summary,
      start: event.start,
      originalStartTime: event.originalStartTime,
      color: event.color = {
        dot: settings.dotColors,
        event: settings.eventColors
      },
      userEmail: event.userEmail
    } = item);
    event.date = item.start && formatDate(item.start.dateTime);
    event.summary = checkIfPrivate(item);
    return event;
  });
  return groupBy(newDate, 'date');
};

export const markDayEvents = (dates = {}) => {
  const results = {};
  if (typeof dates !== 'object' || dates instanceof Array) {
    return results;
  }
  Object.keys(dates).forEach((key) => {
    const colors = flattenDeep(
      dates[key].map(date => ({
        key: date.id,
        color: date.color.dot
      }))
    );
    const dots = uniqBy(colors, 'color');
    results[key] = { dots };
  });
  return results;
};

export const getSelectedDayEvents = (events = []) => {
  if (!(events instanceof Array)) {
    return [];
  }

  const allEvents = mapValues(settings.hours, item => ({
    ...item,
    data: [[]]
  }));

  events.forEach((event) => {
    const startHour = event.start && getStartHour(event.start.dateTime);
    allEvents[startHour].data[0].push(event);
  });

  return Object.values(allEvents);
};

export const starOfMonth = date => moment(date)
  .startOf('month')
  .toISOString();
export const endOfMonth = date => moment(date)
  .endOf('month')
  .toISOString();
export const getMonth = date => moment(date).format('YYYY-MM');

export const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = Math.round((date.getMinutes() / 60) * 100) / 100;

  return hours + minutes;
};

/**
 * Fetch user emails from the andela API.
 * @param {keyWord} keyWord the keyword that helps identify a user.
 * @returns {text} the user email after successful fetch .
 */
export async function getUserEmail(keyWord) {
  this.setState({ text: keyWord });
  const text = keyWord.trim();
  if (text) {
    const token = await AsyncStorage.getItem('token');
    const attendeeData = await fetch(
      `https://api-prod.andela.com/api/v1/users/basic?search=${text}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if (attendeeData) {
      const currentResults = await attendeeData.json();
      this.setState({ data: currentResults.values });
      return currentResults;
    }
  }
  this.setState({ data: [] });
  return text;
}
const handleDurationSuggestion = (message, outputContexts) => {
  if (
    outputContexts[2]
    && outputContexts[2].name.split('/').pop()
      === 'book_a_meeting_dialog_params_duration'
  ) {
    message.unshift({
      _id: uuid(),
      text: 'isDuration',
      type: 'bot',
      createdAt: new Date(),
      user: BOT_USER
    });
  }
  return message;
};
export const handleGoogleResponse = (result) => {
  const {
    queryResult: { fulfillmentText: text, outputContexts = [], parameters }
  } = result;
  let message = [
    {
      _id: uuid(),
      text,
      type: 'bot',
      createdAt: new Date(),
      user: BOT_USER,
      parameters
    }
  ];
  message = handleDurationSuggestion(message, outputContexts);
  return message;
};

export const getAccessToken = () => AsyncStorage.getItem('accessToken');

export const generateKey = (text, type) => {
  const isCalender = text === messageConstants.CalenderInvite;
  const isDuration = text === messageConstants.DurationSuggestion;
  const isUser = type === messageConstants.UserSting;
  const isGreeting = type === messageConstants.GreetingString;
  const isDirection = typeof text === 'string'
    ? text.includes(messageConstants.directionString) : false;
  const key = `${isCalender}-${isUser}-${isGreeting}-${isDuration}-${isDirection}`;
  return key;
};
export const getUserData = (data, defaultImage) => ({
  imageUrl: data.picture || defaultImage,
  username: data.name,
  userId: data.id,
  email: data.email
});

export const netInfoRemoveListenerTest = (
  instance,
  description = 'should call removeEventListener in componentWillUnmount'
) => {
  it(description, () => {
    const spy = jest.spyOn(NetInfo.isConnected, 'removeEventListener');
    instance.componentWillUnmount();
    expect(spy).toHaveBeenCalled();
  });
};

export const handleConnectionChangeTest = (
  instance,
  description = 'should call handleConnectionChange'
) => {
  it(description, () => {
    instance.handleConnectionChange(true);
    expect(instance.state.isConnected).toBeTruthy();
  });
};
