import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';

import Login from './components/Login';
import loginAction from '../../store/login/actions';
import styles from './components/styles';

export class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticating: false };
    this.toast = null;
  }

  componentWillReceiveProps(nextProps) {
    const {
      auth: { error, isLoading }
    } = nextProps;
    this.setState({
      authenticating: isLoading
    });
    if (!isLoading && error.message) {
      this.handleError(error.message);
    }
  }

  signInWithGoogle = async () => {
    const { loginAction: handleLogin } = this.props;
    await handleLogin(this.handleNavigate);
  };

  handleError = (message) => {
    this.toast.show(message, 5000);
  };

  handleNavigate = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    const onBoarded = await AsyncStorage.getItem('onBoard');
    navigate(onBoarded ? 'Main' : 'OnBoarding');
  };

  render() {
    const { authenticating, error } = this.state;
    return (
      <Login
        handleLoginPress={this.signInWithGoogle}
        disabled={authenticating}
        error={error}
      >
        <Toast
          ref={(ref) => {
            this.toast = ref;
          }}
          style={styles.toastStyles}
          positionValue={60}
          position="bottom"
          opacity={1}
          testId="toast-notification"
        />
      </Login>
    );
  }
}

LoginContainer.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  auth: PropTypes.shape({
    isLoading: PropTypes.bool,
    error: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
  loginAction: PropTypes.func.isRequired
};

LoginContainer.defaultProps = {};

const mapStateToProps = ({ auth }) => ({
  auth
});
export const ConnectedLoginScreen = connect(
  mapStateToProps,
  { loginAction }
)(LoginContainer);
