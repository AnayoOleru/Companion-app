import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ConnectionNotification: {
    height: 30,
    width: '100%',
    backgroundColor: 'rgba(181, 36, 36, 0.7)',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  NotificationText: {
    color: '#fff'
  }
});

export default styles;
