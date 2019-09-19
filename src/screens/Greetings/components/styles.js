import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';

import {
  widthPercentageToDP,
  checkDeviceWidth,
  checkDeviceHeight
} from '../../../shared/styles/responsiveStyles';
import { addCalendarStyles } from '../../UserCalendar/components/agendaStyles';


const { width, height } = Dimensions.get('window');

const container = {
  alignItems: 'center',
  justifyContent: 'center'
};
const textStyles = {
  fontSize: checkDeviceWidth(3.8, 4, 3.2, 3.5, 2.6),
  padding: 3,
  lineHeight: checkDeviceHeight('2%', '2.5%', '2%'),
  fontWeight: Platform.OS === 'ios' ? '500' : '400',
  fontFamily: 'DINPro'
};

const shadowStyles = {
  shadowColor: 'rgba(0,0,0,0.7)',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height
  },
  menuItem: {
    ...container,
    ...shadowStyles,
    borderRadius: 19,
    marginBottom: checkDeviceWidth('3%', '6%', '2%', '5%', '5%'),
    marginRight: widthPercentageToDP('5%'),
    width: widthPercentageToDP('33%'),
    height: checkDeviceHeight('18%', '18%', '18%')
  },
  menuItemImage: {
    marginBottom: checkDeviceHeight('1.9%', '1.9%', '1%'),
    height: checkDeviceHeight('8%', '8%', '8%'),
    aspectRatio: 1 / 1,
    width: checkDeviceWidth('10%', 10, 10, 10, 10)
  },
  menuItemText: {
    textAlign: 'center',
    maxWidth: checkDeviceWidth('30%', '50%', '50%', '50%', '30%'),
    minWidth: checkDeviceWidth('2%', '20%', '30%', '30%', '30%'),
    ...textStyles
  },
  greetingsTitle: {
    backgroundColor: 'rgba(236,241,250,1)',
    padding: widthPercentageToDP('5%'),
    maxWidth: scale(227),
    ...container,
    marginBottom: widthPercentageToDP('4%'),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14
  },
  userMessage: {
    ...container,
    backgroundColor: 'rgba(4,89,228,1);',
    color: 'white',
    padding: widthPercentageToDP('5%'),
    maxWidth: scale(227),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    justifyContent: 'flex-end',
    marginBottom: scale(20)
  },
  userMessageTitle: {
    color: 'rgba(255,255,255,1)',
    ...textStyles
  },
  greetingsTitleText: {
    color: ' rgba(52,76,90,1)',
    ...textStyles,
    fontWeight: '300'
  },
  inputPrimary: {
    margin: checkDeviceWidth('1%', '1%', '2%', '1%', '1%'),
    borderColor: 'green'
  },
  inputToolBar: {
    borderRadius: scale(30),
    borderColor: '#F3F4F5',
    borderTopColor: '#F3F4F5',
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: StyleSheet.hairlineWidth * 2,
    width: '100%',
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowColor: '#000000',
    elevation: 4,
    shadowOpacity: 0.05
  },
  inputBoxText: {
    fontSize: checkDeviceWidth('5%', '4%', '5%', '5%', '3%'),
    lineHeight: 18
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Math.floor((width * 5) / 6)
  },
  navigationProfileAvatar: {
    width: width >= 768 ? scale(25) : scale(35),
    marginLeft: scale(20),
    marginRight: scale(20),
    marginBottom: scale(5),

    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: width >= 768 ? scale(25 / 2) : scale(35 / 2)
  },
  sendIcon: {
    height: scale(25),
    width: scale(25),
    marginLeft: scale(10),
    marginRight: scale(10)
  },
  conversationAvatar: {
    height: scale(46),
    width: scale(46),
    borderRadius: scale(46 / 2)
  },
  sendIconContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  messageContainer: {
    marginBottom: 40,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  systemMessageContainer: { alignSelf: 'flex-start', flexDirection: 'row' },
  userMessageContainer: { alignSelf: 'flex-end', flexDirection: 'row' },
  wrapper: {
    marginBottom: 27,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  durationMessageWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  message: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
    maxWidth: scale(227),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginBottom: scale(8)
  },
  messageText: { ...textStyles },
  eventDurationMessageContainer: {
    flexDirection: 'row',
    marginBottom: 27
  },
  eventDurationMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
    maxWidth: scale(227),
    marginBottom: scale(8),
    marginLeft: 12,
    backgroundColor: 'rgba(236,241,250,1)',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(4,89,228,1)'
  },
  eventDurationMessageText: {
    ...textStyles,
    color: 'rgba(4,89,228,1)'
  },
  durationSuggestionText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(153,165,172,1)'
  },
  timeStampContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeStampText: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 8,
    color: 'rgba(153,165,172,1)'
  },
  checkMark: {
    marginLeft: 3,
    alignSelf: 'center',
    marginTop: -5
  },
  messageAvatar: {
    marginLeft: '3%'
  },
  greetingsContainer: {
    flexDirection: 'row',
    marginRight: 30,
    paddingTop: 40
  },
  suggestionContainer: {
    marginBottom: scale(20)
  },
  suggestionContent: {
    padding: checkDeviceWidth('8%', '9%', '5%', '5%', '5%'),
    ...container,
    borderWidth: 1,
    backgroundColor: '#ecfaee',
    flexDirection: 'row',
    borderRadius: 19,
    maxWidth: scale(227),
    paddingVertical: scale(10),
    marginRight: scale(20)
  },
  suggestionText: {
    ...textStyles,
    fontWeight: '500'
  },
  suggestionHr: {
    justifyContent: 'center',
    flex: 1
  },
  durationSuggestionHrLine: {
    backgroundColor: '#ecf1fa',
    height: 1,
    marginLeft: 11,
    marginRight: 7,
    marginBottom: 12
  },
  suggestionHrLine: {
    backgroundColor: '#ecf1fa',
    height: 1,
    marginLeft: 11,
    marginRight: 7
  },
  suggestionIcon: {
    marginRight: 15
  },
  modal: {
    margin: 0
  },
  backDrop: {
    flex: 0.5
  },
  contentContainer: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width
  },
  content: {
    ...addCalendarStyles.content
  },
  messageDetails: {
    alignSelf: 'flex-start',
    marginLeft: 54,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default styles;
