import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
  },
  header: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  content: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(20)
  },
  appLogo: {
    height: undefined,
    width: scale(120),
    aspectRatio: 138 / 138
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontSize: scale(24),
    lineHeight: scale(31),
    color: '#344C5A',
    letterSpacing: 1,
    fontFamily: 'DINPro'
  },
  subTitle: {
    color: '#344C5A',
    fontSize: scale(12),
    lineHeight: scale(15),
    letterSpacing: 0,
    fontFamily: 'DINPro'
  },
  andelaLogo: {
    width: scale(75),
    height: undefined,
    aspectRatio: 75 / 22
  }
});
