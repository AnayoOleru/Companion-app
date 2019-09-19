import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import DurationMessage from './DurationMessage';

export default class EventDurationQueryMessage extends React.Component {
  state = {
    isAccepted: false,
    isSelected: ''
  };

  onDurationPress = (duration) => {
    const { onPress } = this.props;
    onPress(duration);
    this.setState({ isAccepted: true, isSelected: duration });
  };

  render() {
    const durationProps = {
      ...this.state,
      onDurationPress: this.onDurationPress
    };

    return (
      <View style={styles.eventDurationMessageContainer}>
        <View style={styles.suggestionHr}>
          <View style={styles.durationSuggestionHrLine} />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            {['30 mins', '1 hour', '2 hours'].map(duration => (
              <DurationMessage
                key={duration}
                {...durationProps}
                duration={duration}
              />
            ))}
          </View>
          <Text style={styles.durationSuggestionText}>
            Please select a duration or enter one below
          </Text>
        </View>
      </View>
    );
  }
}

EventDurationQueryMessage.propTypes = {
  onPress: PropTypes.func.isRequired
};

EventDurationQueryMessage.defaultProps = {};
