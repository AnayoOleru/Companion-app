import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { store } from '../../store';
import ProfileComponent from './components/ProfileComponent';
import LogoutButton from './components/LogoutButton';
import { signOut } from '../../services/AuthService';
import styles from './styles';

export default class Drawer extends Component {
  logoutUser = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    try {
      const {
        auth: { accessToken }
      } = store.getState();
      await signOut(accessToken);
      navigate('Login');
    } catch (error) {
      navigate('Login');
    }
  };

  render() {
    const {
      auth: { currentUser }
    } = store.getState();
    const {
      email, family_name: lastName, given_name: firstName, picture
    } = currentUser;
    return (
      <View style={styles.drawerContainer}>
        <ProfileComponent
          userData={{
            email,
            firstName,
            lastName,
            picture
          }}
        />
        <LogoutButton onPress={this.logoutUser} />
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

Drawer.defaultProps = {
  navigation: {
    navigate: () => {}
  }
};

export const connectedDrawer = connect()(Drawer);
