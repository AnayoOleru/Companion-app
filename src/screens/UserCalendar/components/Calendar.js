import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  NetInfo
} from 'react-native';
import { CalendarProvider, LocaleConfig } from 'react-native-calendars';
import Modal from '../../../shared/components/Modal/Modal';
import calendarSettings from '../../../constants/calendarSettings';
import { markDayEvents } from '../../../utils/helpers';
import AgendaList from './AgendaList';
import ExpandableCalendar from './ExpandableCalendar';
import Header from './Header';
import Loading from '../../../shared/components/ActivityIndicator/Loading';
import PinnedUser from '../OtherCalendar/components/PinnedUser';
import { styles } from './styles';
import { addCalendarStyles } from './agendaStyles';
import SearchResults from '../OtherCalendar/components/SearchResults';
import SearchInput from '../OtherCalendar/components/SearchInput';

LocaleConfig.locales.en = {
  monthNames: calendarSettings.monthNames,
  monthNamesShort: calendarSettings.monthNamesShort,
  dayNames: calendarSettings.dayNames,
  dayNamesShort: calendarSettings.dayNamesShort,
  today: calendarSettings.today
};
LocaleConfig.defaultLocale = 'en';

class Calendar extends Component {
  state = {
    isCalendarOpen: true,
    isModalVisible: false,
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  handleConnectionChange = (isConnected) => {
    this.setState({ isConnected });
  }

  navigateBack = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  toggleCalendar = () => {
    this.setState(state => ({
      isCalendarOpen: !state.isCalendarOpen
    }));
  };

  handleMonthChange = (month) => {
    const { onMonthChange, pinnedUsers } = this.props;
    onMonthChange(month, pinnedUsers.map(user => user.email));
  };

  renderSearchBox = () => {
    const { getUserEmail, text } = this.props;
    return <SearchInput onTextChange={getUserEmail} value={text} />;
  };

  renderResult = () => {
    const { data, pinUser } = this.props;
    return <SearchResults data={data} pinUser={pinUser} />;
  };

  renderPinnedCalendar = () => {
    const { pinnedUsers, unpinUser } = this.props;
    return <PinnedUser pinnedUsers={pinnedUsers} removeUser={unpinUser} />;
  };

  openSearchModal = () => {
    this.setState(state => ({
      isCalendarOpen: false,
      isModalVisible: !state.isModalVisible
    }));
  };

  renderModalChild = () => {
    const { data, pinnedUsers } = this.props;
    return (
      <View style={addCalendarStyles.innerModel}>
        <TouchableWithoutFeedback onPress={this.openSearchModal}>
          <View style={addCalendarStyles.backDrop} />
        </TouchableWithoutFeedback>
        <View style={addCalendarStyles.contentContainer}>
          <View style={addCalendarStyles.content}>
            {pinnedUsers.length < 4 ? (
              this.renderSearchBox()
            ) : (
              <Text style={addCalendarStyles.searchText}>
                You can only view 4 calendars
              </Text>
            )}
            {data.length > 0 ? this.renderResult() : null}
            {this.renderPinnedCalendar()}
          </View>
        </View>
      </View>
    );
  }

  renderCalendarProvider = () => {
    const { isCalendarOpen, isConnected } = this.state;
    const {
      events,
      currentEvents,
      handleDateSelect,
      selectedDate,
      isLoading
    } = this.props;
    const dots = markDayEvents(events);

    return (
      <CalendarProvider
        date={selectedDate}
        onDateChanged={handleDateSelect}
        onMonthChange={this.handleMonthChange}
        testID="calendar-provider"
      >
        {isCalendarOpen && (
          <View>
            <ExpandableCalendar dots={dots} selected={selectedDate} />
            {isConnected && isLoading && <Loading size="small" color="#4D6EFF" />}
          </View>
        )}

        <AgendaList
          currentEvents={currentEvents}
          extraData={events}
          currentDate={selectedDate}
          isLoading={isLoading}
        />
      </CalendarProvider>
    );
  }

  headerProps = () => {
    const { isModalVisible, isCalendarOpen } = this.state;
    const { pinnedUsers } = this.props;

    return {
      onSearchPress: this.openSearchModal,
      goBack: this.navigateBack,
      onToggle: this.toggleCalendar,
      title: '',
      closeIcon: isCalendarOpen,
      testID: 'calendar-header',
      usersHeaderAvatar: pinnedUsers,
      isCalendarOpen,
      isModalVisible
    };
  }

  render() {
    const { isModalVisible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default" />
        <Header {...this.headerProps()} />
        <Modal
          isVisible={isModalVisible}
          style={addCalendarStyles.modal}
        >
          {this.renderModalChild()}
        </Modal>
        {this.renderCalendarProvider()}
      </SafeAreaView>
    );
  }
}

Calendar.propTypes = {
  events: PropTypes.shape({}).isRequired,
  currentEvents: PropTypes.instanceOf(Array).isRequired,
  handleDateSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  navigation: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
  onMonthChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  getUserEmail: PropTypes.func.isRequired,
  pinUser: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pinnedUsers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  unpinUser: PropTypes.func.isRequired
};

Calendar.defaultProps = {
  isLoading: false
};

export default Calendar;
