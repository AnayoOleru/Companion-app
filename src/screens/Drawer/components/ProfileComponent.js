import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';

const ProfileComponent = ({
  userData: {
    picture, lastName, firstName, email
  }
}) => (
  <View style={styles.imageContainer}>
    <Image source={picture ? { uri: picture } : null} style={styles.image} />
    <Text style={styles.profileName}>
      {lastName}
      {' '}
      {firstName}
    </Text>
    <Text style={styles.profileEmail}>{email}</Text>
  </View>
);

ProfileComponent.propTypes = {
  userData: PropTypes.shape({
    picture: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    email: PropTypes.string
  })
};

ProfileComponent.defaultProps = {
  userData: {
    picture: '',
    lastName: '',
    firstName: '',
    email: ''
  }
};

export default ProfileComponent;
