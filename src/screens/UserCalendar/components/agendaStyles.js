import { StyleSheet, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

const { width: DEVICE_WIDTH } = Dimensions.get('window');
export const agendaItem = StyleSheet.create({
  container: {
    right: 0,
    width: DEVICE_WIDTH * 0.8,
    borderRadius: scale(10),
    paddingHorizontal: scale(8),
    zIndex: 100,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth
  },
  itemTitleText: {
    fontSize: scale(14),
    fontWeight: '500',
    lineHeight: scale(18),
    color: '#000'
  },
  itemHours: {
    fontSize: scale(14),
    fontWeight: '300',
    color: 'rgba(0,0,0,0.7)'
  }
});

export const addCalendarStyles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  listItem: {
    borderColor: '#E9F1F4',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    padding: 4
  },
  title: {
    color: '#344C5A',
    fontSize: 12
  },
  resultContainer: {
    zIndex: 1,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F3F4F5'
  },
  modal: {
    margin: 0
  },
  innerModel: {
    flex: 1
  },
  backDrop: {
    flex: 0.5
  },
  contentContainer: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: DEVICE_WIDTH
  },
  content: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    height: '100%',
    shadowColor: 'rgba(0,0,0,0.03)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5
  },
  searchBoxContainer: {
    width: '85%',
    height: scale(52),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scale(20),
    padding: scale(10),
    borderRadius: scale(9),
    borderWidth: scale(2),
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.03)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: '#fff',
    borderColor: '#F3F4F5'
  },
  searchInput: {
    height: scale(48),
    width: '80%'
  },
  searchText: {
    width: '53.33%',
    color: 'rgba(52,76,90,0.5)',
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: '5%'
  }
});
