import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, SafeAreaView, Text
} from 'react-native';
import styles from '../../../shared/styles/splashLogin';
import buttonStyles from './styles';
import GoogleButton from '../../../shared/components/Buttons/Button';
import AndelaLogo from '../../../assets/andela.png';
import AppLogo from '../../../assets/icon.png';
import GoogleIcon from '../../../assets/Google__G__Logo.png';

const Login = ({ handleLoginPress, disabled, children }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Image source={AppLogo} style={styles.appLogo} />
    </View>

    <View style={styles.content}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Companion</Text>
        <Text style={styles.subTitle}>Sign-In to Continue</Text>
      </View>
      <GoogleButton
        onPress={handleLoginPress}
        testID="google-btn"
        containerStyles={buttonStyles.btnContainer}
        titleStyles={buttonStyles.btnTitle}
        loading={disabled}
        loadingStyles={buttonStyles.loadingStyles}
        title="Login to Get Started"
        activeOpacity={0.6}
        disabled={disabled}
      >
        <Image
          source={GoogleIcon}
          style={buttonStyles.gIcon}
          resizeMode="contain"
        />
      </GoogleButton>
      <View style={styles.andelaLogoContainer}>
        <Image
          source={AndelaLogo}
          style={styles.andelaLogo}
          resizeMode="contain"
          ratio={0.5}
        />
      </View>
    </View>
    {children}
  </SafeAreaView>
);

Login.propTypes = {
  handleLoginPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.element
};
Login.defaultProps = {
  disabled: false,
  children: <View />
};
export default Login;
