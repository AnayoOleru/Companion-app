import { Dimensions, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    height: scale(226),
    width: scale(291),
    marginTop: '20%'
  },
  body: {
    flex: 1,
    alignItems: 'center'
  },
  alignBody: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: SCREEN_HEIGHT * 0.03,
    color: 'rgba(52,76,90,1)',
    opacity: 1.0,
    marginTop: '5%',
    marginBottom: scale(20),
    fontFamily: 'DINPro'
  },
  bodyText: {
    fontSize: SCREEN_HEIGHT * 0.02,
    textAlign: 'center',
    color: 'rgba(52,76,90,0.8)',
    opacity: 1,
    marginBottom: scale(5),
    fontFamily: 'DINPro'
  },
  boldText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(52,76,90,1)',
    marginBottom: scale(30),
    fontFamily: 'DINPro'
  },
  buttomText: {
    color: 'rgba(52,76,90,0.34)',
    fontSize: 12,
    opacity: 1.0,
    fontFamily: 'DINPro',
    bottom: '5%'
  },
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    width: SCREEN_WIDTH,
    position: 'absolute',
    height: '100%'
  },
  page1Container: {
    flex: 1,
    backgroundColor: 'rgba(236,248,250,1)'
  },
  page2Container: {
    flex: 1,
    backgroundColor: 'rgba(244,240,221,1)'
  },
  page3Container: {
    flex: 1,
    backgroundColor: 'rgba(227,247,226,1)'
  },
  containerFlex: {
    flex: 0.6
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },
  currentPage: {
    height: 10,
    width: 38,
    borderColor: 'rgba(4,90,228,1)',
    borderRadius: 5,
    margin: 2,
    backgroundColor: 'rgba(4, 90, 228, 1)'
  },
  pages: {
    height: 10,
    width: 10,
    borderColor: 'rgba(120, 163, 234, 1)',
    borderWidth: 1,
    borderRadius: 50,
    margin: 2
  },
  onBoardingInfo: {
    marginTop: '1.57%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
});
