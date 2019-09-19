import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const Button = ({
  onPress,
  children,
  containerStyles,
  titleStyles,
  title,
  activeOpacity,
  loadingStyles,
  loading,
  ...props
}) => {
  const disabledContainerStyle = [containerStyles];
  if (loading) {
    disabledContainerStyle.push({ opacity: 0.4 });
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={disabledContainerStyle}
      activeOpacity={activeOpacity}
      {...props}
    >
      {children || null}
      <Text style={titleStyles}>{title}</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#045AE4"
          style={loadingStyles}
          testId="activity-indicator"
        />
      ) : null}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element,
  containerStyles: PropTypes.shape({}),
  titleStyles: PropTypes.shape({}),
  title: PropTypes.string,
  activeOpacity: PropTypes.number,
  loading: PropTypes.bool,
  loadingStyles: PropTypes.shape({})
};
Button.defaultProps = {
  children: null,
  containerStyles: {},
  titleStyles: {},
  title: 'Button',
  activeOpacity: 1,
  loading: false,
  loadingStyles: {}
};
export default Button;
