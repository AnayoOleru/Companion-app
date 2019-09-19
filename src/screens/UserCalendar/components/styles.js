import { StyleSheet, StatusBar, Platform } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import {
  responsiveHeight,
  DEVICE_HEIGHT,
  DEVICE_WIDTH
} from '../../../utils/responsiveDimensions';
import {
  checkDeviceWidth,
  checkDeviceHeight
} from '../../../shared/styles/responsiveStyles';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

export const calendarStyles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    color: '#ccc',
    height: 0,
    width: 0,
    margin: 0,
    padding: 0
  }
});
export const agendaList = StyleSheet.create({
  horizontalLine: {
    borderColor: '#E8E9ED',
    backgroundColor: '#E8E9ED',
    borderWidth: StyleSheet.hairlineWidth,
    width: DEVICE_WIDTH * 0.8,
    height: StyleSheet.hairlineWidth
  },
  main: {
    position: 'absolute',
    width: DEVICE_WIDTH * 0.8,
    right: 0
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: responsiveHeight(8)
  },
  title: {
    paddingLeft: scale(15)
  }
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: STATUSBAR_HEIGHT,
    height: DEVICE_HEIGHT || 0
  }
});

export const currentTimeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    top: verticalScale(20)
  },
  oval: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: 5,
    backgroundColor: '#4D6EFF'
  },
  bar: {
    width: DEVICE_WIDTH * 0.8,
    borderColor: '#4D6EFF',
    borderBottomWidth: StyleSheet.hairlineWidth * 10,
    top: moderateScale(3),
    height: 0
  }
});

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: checkDeviceHeight('6%', '6%', '6%'),
    borderBottomColor: '#ccc',
    borderBottomWidth: scale(0.5)
  },
  rightContent: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10)
  },
  avatarItem: {
    marginLeft: -10
  },
  iconContainer: {
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: scale(26) / 2,
    marginRight: scale(5)
  },
  pinnedUsersContainer: {
    flexDirection: 'row'
  }
});

export const addEventStyles = StyleSheet.create({
  addEventsButton: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addEventsIcon: {
    width: checkDeviceWidth('7%', '7%', '7%', '7%', '4.10%'),
    height: undefined,
    aspectRatio: 1 / 1
  }
});

export const pinnedCalendarStyles = StyleSheet.create({
  mainContainer: {
    width: DEVICE_WIDTH
  },
  pinnedContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    zIndex: 0,
    paddingVertical: 20,
    paddingHorizontal: 70,
    flex: 1,
    shadowColor: '#F3F4F5',
    marginTop: scale(60)
  },
  renderList: {
    flex: 1,
    width: '100%'
  },
  searchInput: {
    height: 40,
    width: '80%'
  },
  userInformation: {
    textAlign: 'center',
    fontSize: 10,
    maxWidth: 50
  },
  cancelIcon: {
    marginLeft: -23,
    borderRadius: 10
  },
  cancelTwoIcon: {
    height: 15,
    width: 15
  },
  avatarContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row'
  },
  iconStyle: {
    color: '#1E8FE1',
    borderRadius: 50
  }
});

export const timeIndicatorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '0%',
    zIndex: 100
  },
  currentTime: {
    borderColor: '#4D6EFF',
    backgroundColor: '#4D6EFF',
    borderWidth: scale(1),
    width: DEVICE_WIDTH * 0.8,
    height: StyleSheet.hairlineWidth
  },
  oval: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#4D6EFF'
  }
});
