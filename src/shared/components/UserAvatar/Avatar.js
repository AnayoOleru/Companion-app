import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/avatar';
import settings from '../../../constants/calendarSettings';

const Avatar = ({ profileAvatar, colorIndex }) => (
  <Image
    source={{ uri: profileAvatar }}
    style={[
      styles.container,
      { borderColor: settings.eventColors[colorIndex + 1] }
    ]}
  />
);

Avatar.propTypes = {
  profileAvatar: PropTypes.string,
  colorIndex: PropTypes.number
};

Avatar.defaultProps = {
  profileAvatar: '',
  colorIndex: 0
};

export default Avatar;
