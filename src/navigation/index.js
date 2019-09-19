import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';
import React from 'react';
import { Dimensions } from 'react-native';
import { Constants } from 'expo';
import { ConnectedGreetingsScreen } from '../screens/Greetings';
import { ConnectedLoginScreen } from '../screens/Login';
import DrawerScreen from '../screens/Drawer';
import OnBoarding from '../screens/OnBoarding';
import Loading from '../screens/Home';
import UserCalendar from '../screens/UserCalendar';
import HeaderLeft from '../screens/Greetings/components/HeaderLeft';
import HeaderRight from '../screens/Greetings/components/HeaderRight';


const { width } = Dimensions.get('window');

export const greetingsNavigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
    headerStyle:
      width >= 768
        ? { marginTop: Constants.statusBarHeight, paddingBottom: 10 }
        : {},
    headerRight: (
      <HeaderRight onPress={() => navigation.navigate('UserCalendar')} />
    ),
    headerLeft: (
      <HeaderLeft
        onPress={navigation.toggleDrawer}
        profileAvatar={params.picture}
      />
    )
  };
};

const Main = createStackNavigator(
  {
    Greetings: {
      screen: ConnectedGreetingsScreen,
      navigationOptions: greetingsNavigationOptions
    },
    UserCalendar: {
      screen: UserCalendar,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    headerMode: 'screen'
  }
);

const Drawer = createDrawerNavigator(
  {
    Main
  },
  { contentComponent: DrawerScreen }
);

const Auth = createStackNavigator(
  {
    Login: ConnectedLoginScreen,
    OnBoarding
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Loading,
    Auth,
    Drawer
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(AppNavigator);
