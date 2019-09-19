const props = {
  alignTop: false,
  bottomOffset: 0,
  onPress: jest.fn,
  action: { openAttendeesModal: jest.fn },
  currentMessage: {
    _id: 1,
    createdAt: '2019-06-17T17:10:37.523Z',
    text: {
      options: [
        {
          itemColor: 'rgba(239,243,251,1)',
          itemDescription: 'Book a Meeting',
          itemIcon: 3,
          onPress: jest.fn(),
          textColor: 'rgba(77,128,209,1)'
        }
      ],
      title: `Hi Ebun, Welcome to the Converge Companion App.
         What would you like to do?`
    },
    user: {
      _id: 2,
      avatar: 6,
      name: 'Companion App'
    }
  },
  dateFormat: 'll',
  extraData: null,
  forceGetKeyboardHeight: false,
  imageProps: {},
  inverted: true,
  invertibleScrollViewProps: {
    inverted: true,
    keyboardShouldPersistTaps: 'never',
    onKeyboardDidHide: jest.fn(),
    onKeyboardDidShow: jest.fn(),
    onKeyboardWillHide: jest.fn(),
    onKeyboardWillShow: jest.fn()
  },
  isAnimated: true,
  isLoadingEarlier: false,
  keyboardShouldPersistTaps: 'never',
  lightboxProps: {},
  listViewProps: {},
  loadEarlier: false,
  locale: null,
  maxComposerHeight: 200,
  maxInputLength: null,
  messageIdGenerator: jest.fn(),
  minComposerHeight: 33,
  minInputToolbarHeight: 44,
  nextMessage: {},
  onInputTextChanged: null,
  onLoadEarlier: jest.fn(),
  onLongPress: null,
  onPressActionButton: null,
  onPressAvatar: null,
  onSend: jest.fn(),
  placeholder: 'Type a message...',
  position: 'left',
  previousMessage: {},
  renderAccessory: null,
  renderActions: null,
  renderAvatar: undefined,
  renderAvatarOnTop: false,
  renderBubble: null,
  renderChatFooter: null,
  renderComposer: null,
  renderCustomView: null,
  renderDay: null,
  renderFooter: null,
  renderInputToolbar: jest.fn(),
  renderLoadEarlier: null,
  renderLoading: null,
  renderMessage: jest.fn(),
  renderMessageImage: null,
  renderMessageText: null,
  renderSend: jest.fn(),
  renderSystemMessage: null,
  renderTime: null,
  renderUsernameOnMessage: false,
  scrollToBottom: false,
  scrollToBottomOffset: 200,
  showUserAvatar: false,
  text: 'hello',
  textInputProps: {},
  timeFormat: 'LT',
  user: {
    _id: 1,
    avatar: 'https://placeimg.com/140/140/any',
    name: 'Ebun'
  },
  videoProps: {}
};

export default props;
