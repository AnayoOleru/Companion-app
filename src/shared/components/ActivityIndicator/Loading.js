import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';

const Loading = ({ size, color }) => (
  <View>
    <ActivityIndicator size={size} color={color} />
  </View>
);

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'large']).isRequired,
  color: PropTypes.string.isRequired
};

export default Loading;
