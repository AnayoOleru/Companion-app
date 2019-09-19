import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  profileName: {
    fontSize: 24,
    marginTop: 14,
    letterSpacing: 1.5,
    color: 'rgb(57, 75, 89)',
    marginBottom: 5,
    fontFamily: 'DINPro'
  },
  profileEmail: {
    color: 'rgb(57, 75, 89)',
    fontFamily: 'DINPro'
  },
  drawerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    height: 89,
    width: 89,
    borderRadius: 44,
    marginTop: 39
  },
  logoutButton: {
    paddingTop: 15,
    paddingRight: 37,
    paddingLeft: 37,
    paddingBottom: 15,
    backgroundColor: 'rgb(248, 240, 240)',
    borderRadius: 7,
    marginBottom: 36.5
  },
  logoutButtonText: {
    fontSize: 20,
    color: 'rgb(200, 73, 104)',
    letterSpacing: 1.8,
    fontFamily: 'DINPro'
  }
});

export default styles;
