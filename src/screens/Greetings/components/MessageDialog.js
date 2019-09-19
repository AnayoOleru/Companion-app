import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import MenuOptions from './MenuOptions';
import UserAvatar from './Avatar';
import styles from './styles';

const specs = (position) => {
  const direction = position === 'left' ? 'start' : 'end';
  const placement = position === 'left' ? 'Right' : 'Left';
  const backgroundColor = position === 'left'
    ? 'rgba(236,241,250,1)'
    : 'rgba(4,89,228,1)';
  const color = position === 'left' ? 'rgba(52,76,90,1)' : 'rgba(255,255,255,1)';
  return {
    wrapper: { justifyContent: `flex-${direction}` },
    dialogContainer: {
      alignItems: `flex-${direction}`,
      justifyContent: `flex-${direction}`
    },
    message: {
      [`borderBottom${placement}Radius`]: 14,
      backgroundColor
    },
    text: { color }
  };
};

const renderTimeStamp = createdAt => (
  <View style={[styles.timeStampContainer]}>
    <Text style={[styles.timeStampText]}>
      {`Sent ${moment(createdAt).fromNow()}`}
    </Text>
    <Ionicons name="ios-checkmark" size={23} color="rgba(153,165,172,1)" />
  </View>
);

const MessageDialog = (props) => {
  const {
    currentMessage: { text, createdAt },
    position,
    showMenu,
    onPress
  } = props;
  return (
    <View style={[styles.wrapper, specs(position).wrapper]}>
      {position === 'left' && <UserAvatar {...props} />}
      <View style={[specs(position).dialogContainer]}>
        <View style={[styles.message, specs(position).message]}>
          <View>
            <Text style={[styles.messageText, { ...specs(position).text }]}>
              {text}
            </Text>
          </View>
        </View>
        {showMenu && <MenuOptions onPress={onPress} />}
        {renderTimeStamp(createdAt)}
      </View>
      {position === 'right' && <UserAvatar {...props} />}

    </View>
  );
};

MessageDialog.propTypes = {
  currentMessage: PropTypes.shape({
    text: PropTypes.string,
    createdAt: PropTypes.any
  }).isRequired,
  position: PropTypes.string,
  showMenu: PropTypes.bool,
  onPress: PropTypes.func.isRequired
};

MessageDialog.defaultProps = {
  position: 'right',
  showMenu: false
};

export default MessageDialog;
