import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Calendar from './components/Calendar';
import { getMonth, getUserEmail } from '../../utils/helpers';

import {
  getCalendarData,
  getSelectedDateEvents,
  pinUser,
  unpinUser
} from '../../store/calendar/actions';

const today = new Date().toISOString().split('T')[0];

export class CalendarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: ''
    };
    this.getUserEmail = getUserEmail.bind(this);
  }

  async componentDidMount() {
    const { navigation, selectedDate, pinnedUsers } = this.props;
    navigation.setParams({ isCalendarOpen: true });
    await this.getUserCalendar(selectedDate, pinnedUsers);
  }

  handleDateSelect = (date) => {
    const { getDayEvents } = this.props;
    getDayEvents(date);
  };

  handleMonthChange = (date, users = []) => {
    const { dateString } = date;
    const { fetchCalendar, selectedDate } = this.props;
    if (getMonth(selectedDate) !== getMonth(dateString)) {
      fetchCalendar(dateString, users);
    }
  };

  getUserCalendar = async (date = today, emails = []) => {
    const { fetchCalendar } = this.props;
    fetchCalendar(date, emails);
  };

  pinUser = (item) => {
    const { email } = item;
    const { pinnedUsers, setUser, selectedDate } = this.props;
    const userExist = pinnedUsers.find(user => user.userId === item.id);
    if (pinnedUsers.length <= 3 && !userExist) {
      const users = [...pinnedUsers.map(user => user.email), email];
      setUser(item, selectedDate, users);
      this.getUserEmail('');
    }
  };

  unpinUser = (user) => {
    const { email } = user;
    const { removeUser, selectedDate, pinnedUsers } = this.props;
    const users = pinnedUsers.filter(item => item.email !== email);
    const emails = users.map(item => item.email);
    removeUser(email, selectedDate, emails);
  };

  render() {
    const { text, data } = this.state;

    const {
      navigation, currentEvents, events, isLoading, selectedDate, pinnedUsers, error
    } = this.props;

    return (
      <Calendar
        events={events}
        currentEvents={currentEvents}
        handleDateSelect={this.handleDateSelect}
        selectedDate={selectedDate}
        onMonthChange={this.handleMonthChange}
        error={error}
        navigation={navigation}
        isLoading={isLoading}
        pinnedUsers={pinnedUsers}
        fetchCalendar={this.getUserCalendar}
        getUserEmail={this.getUserEmail}
        pinUser={this.pinUser}
        unpinUser={this.unpinUser}
        testId="calendar-container"
        text={text}
        data={data}
      />
    );
  }
}

CalendarContainer.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func,
    getParam: PropTypes.func
  }).isRequired,
  fetchCalendar: PropTypes.func.isRequired,
  getDayEvents: PropTypes.func.isRequired,
  currentEvents: PropTypes.instanceOf(Array).isRequired,
  events: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedDate: PropTypes.string.isRequired,
  error: PropTypes.shape({}).isRequired,
  pinnedUsers: PropTypes.instanceOf(Array).isRequired,
  setUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  ...state.calendar
});
export default connect(
  mapStateToProps,
  {
    fetchCalendar: getCalendarData,
    getDayEvents: getSelectedDateEvents,
    setUser: pinUser,
    removeUser: unpinUser
  }
)(CalendarContainer);
