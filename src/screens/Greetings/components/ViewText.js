import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const ViewText = ({ viewStyles, textStyles, text }) => (
  <View style={viewStyles}>
    <Text style={textStyles}>{text}</Text>
  </View>
);

ViewText.propTypes = {
  viewStyles: PropTypes.shape({
    text: ''
  }),
  textStyles: PropTypes.shape({
    text: ''
  }),
  text: PropTypes.string
};

ViewText.defaultProps = {
  viewStyles: {
    style: ''
  },
  textStyles: {
    style: ''
  },
  text: ''
};

export default ViewText;
