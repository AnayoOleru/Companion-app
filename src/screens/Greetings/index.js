
import React, { Component } from 'react';
import {
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import {
  sendToDialogFlowDisplay,
  sendEventToDialogFlow,
  sendToDialogFlow
} from '../../store/messages/actions';
import Modal from '../../shared/components/Modal/Modal';
import Send from './components/Send';
import InputToolbar from './components/InputToolBar';
import Message from './components/Message';
import styles from './components/styles';
import PinnedUser from '../UserCalendar/OtherCalendar/components/PinnedUser';
import SearchResults from '../UserCalendar/OtherCalendar/components/SearchResults';
import SearchInput from '../UserCalendar/OtherCalendar/components/SearchInput';
import SaveAttendeeButton from './InviteAttendees/components/SaveAttendeeButton';
import {
  pinAttendeesAction,
  unpinAttendeeAction
} from '../../store/attendees/action';
import { getCalendarData } from '../../store/calendar/actions';
import { getUserEmail as getAttendeeEmail } from '../../utils/helpers';
import BotProcessing from './components/BotProcessing';
import { store } from '../../store';

export class GreetingsScreen extends Component {
  listViewProps = {
    contentInset: { bottom: 40 }, style: { padding: 20, paddingLeft: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null, data: [], text: '', isModalVisible: false
    };
    this.getAttendeeEmail = getAttendeeEmail.bind(this);
  }

  async componentDidMount() {
    const { navigation: { setParams } = {}, fetchCalendar } = this.props;
    this.fetchCalendarData(fetchCalendar);
    const {
      auth: {
        currentUser: { email, picture, given_name: firstName },
        token
      }
    } = store.getState();
    setParams({ picture });
    this.setState({
      userAvatar: picture, email, firstName, token
    });
  }

  fetchCalendarData = (fetchCalendar) => {
    const today = new Date().toLocaleDateString();
    const todayFormated = today.split('/').join('-');
    fetchCalendar(todayFormated, []);
  }

  openAddAttendeesModal = () => {
    this.setState(state => ({ isModalVisible: !state.isModalVisible }));
  };

  pinSelectedAttendee = (item) => {
    const { email, id } = item;
    const { pinnedAttendees, pinAttendees } = this.props;
    const userExist = pinnedAttendees.find(user => user.userId === id);
    if (!userExist) {
      const users = [...pinnedAttendees.map(user => user.email), email];
      pinAttendees(item, users);
      this.getAttendeeEmail('');
    }
  };

  _onSend = (message) => {
    const { sendMessages } = this.props;
    const { email, token } = this.state;

    const messageWithEmail = {
      ...message, email, token, type: 'user'
    };

    sendMessages(messageWithEmail);
  }

  renderInputToolbar = props => <InputToolbar {...props} />;

  renderSend = props => <Send {...props} />;

  renderSearchBox = () => {
    const { text } = this.state;
    return <SearchInput onTextChange={this.getAttendeeEmail} value={text} />;
  };

  renderResult = () => {
    const { data } = this.state;
    return <SearchResults data={data} pinUser={this.pinSelectedAttendee} />;
  };

  renderPinnedAttendee = () => {
    const { pinnedAttendees, unpinAttendee } = this.props;
    return <PinnedUser pinnedUsers={pinnedAttendees} removeUser={unpinAttendee} />;
  };

  saveAttendees = () => {
    const { email } = this.state;
    const { sendEvents, pinnedAttendees } = this.props;
    const attendees = pinnedAttendees;
    const attendeeWithEmail = {
      attendees, email, type: 'user'
    };
    sendEvents(attendeeWithEmail);
    this.openAddAttendeesModal();
  };

  renderSaveButton = () => {
    const { pinnedAttendees: { length } } = this.props;
    if (length !== 0) return <SaveAttendeeButton action={this.saveAttendees} />;
    return null;
  };

  renderMessage = (props) => {
    const { sendHiddenMessage } = this.props;
    const {
      userAvatar, firstName, token, email
    } = this.state;
    const directionsMessage = {
      _id: uuid(),
      text: 'i am there',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: firstName,
        avatar: userAvatar
      },
      type: 'hidden'
    };

    const message = {
      ...directionsMessage, email, token, type: 'hidden'
    };


    return (
      <Message
        {...props}
        type="user"
        onPress={text => this._onSend({
          _id: uuid(),
          text,
          createdAt: new Date(),
          user: { _id: 1, name: firstName, avatar: userAvatar }
        })
        }
        action={{
          openAttendeesModal: this.openAddAttendeesModal,
          directionsArrival: () => { sendHiddenMessage(message); }
        }
        }
      />
    );
  };

  renderFooter = () => {
    const { isBotProcessing } = this.props;
    if (isBotProcessing) {
      return <BotProcessing />;
    }
    return null;
  };


  giftedChatProps = () => {
    const { messages } = this.props;
    const { userAvatar, firstName } = this.state;

    return {
      testID: 'GiftedChat',
      messages,
      onSend: message => this._onSend(message[0]),
      renderMessage: this.renderMessage,
      renderInputToolbar: this.renderInputToolbar,
      renderSend: this.renderSend,
      renderFooter: this.renderFooter,
      listViewProps: this.listViewProps,
      renderSuggestionMessage: this.renderSuggestionMessage,
      user: { _id: 1, name: firstName, avatar: userAvatar },
      showAvatarForEveryMessage: true,
      alignTop: true
    };
  }

  render() {
    const { data, isModalVisible } = this.state;

    return (
      <SafeAreaView behavior="padding" enabled style={[styles.container]}>
        <GiftedChat {...this.giftedChatProps()} />
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={this.openAddAttendeesModal}>
              <View style={styles.backDrop} />
            </TouchableWithoutFeedback>
            <View style={styles.contentContainer}>
              <View style={styles.content}>
                {this.renderSearchBox()}
                {data.length > 0 ? this.renderResult() : null}
                {this.renderPinnedAttendee()}
                {this.renderSaveButton()}
              </View>
            </View>
          </View>
        </Modal>
        {Platform.OS === 'ios' ? null : <KeyboardSpacer />}
      </SafeAreaView>
    );
  }
}


GreetingsScreen.propTypes = {
  navigation: PropTypes.shape({ setParams: PropTypes.func }),
  pinnedAttendees: PropTypes.arrayOf(PropTypes.shape({})),
  fetchCalendar: PropTypes.func,
  unpinAttendee: PropTypes.func,
  pinAttendees: PropTypes.func,
  messages: PropTypes.arrayOf(
    PropTypes.shape({ messageProps: PropTypes.shape({}) })
  ),
  sendMessages: PropTypes.func,
  sendEvents: PropTypes.func,
  isBotProcessing: PropTypes.bool,
  sendHiddenMessage: PropTypes.func
};

GreetingsScreen.defaultProps = {
  navigation: {
    setParams: () => {}
  },
  messages: [{}],
  fetchCalendar: () => { },
  unpinAttendee: () => { },
  pinAttendees: () => { },
  sendMessages: () => { },
  sendHiddenMessage: () => { },
  sendEvents: () => { },
  pinnedAttendees: [{}],
  isBotProcessing: false
};
export const mapStateToProps = state => ({
  isBotProcessing: state.messages.isBotProcessing,
  messages: state.messages.messages,
  ...state.attendees,
  currentUser: state.auth.currentUser
});
export const mapDispatchToProps = dispatch => ({
  fetchCalendar: () => dispatch(getCalendarData()),
  sendMessages: message => dispatch(sendToDialogFlowDisplay(message)),
  sendHiddenMessage: message => dispatch(sendToDialogFlow(message)),
  pinAttendees: item => dispatch(pinAttendeesAction(item)),
  unpinAttendee: item => dispatch(unpinAttendeeAction(item.email)),
  sendEvents: attendees => dispatch(sendEventToDialogFlow(attendees))
});

export const ConnectedGreetingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(GreetingsScreen);
