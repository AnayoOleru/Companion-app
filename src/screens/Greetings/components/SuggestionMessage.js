import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import {
  interactionMessageProps,
  interactionMessageDefaultProps
} from './propsDefinition';

export default class SuggestionMessage extends React.Component {
  state = {
    isAccepted: false
  };

  onPress = () => {
    const { action } = this.props;
    action();
    this.setState({ isAccepted: true });
  };

  renderIcon = (icon, primaryColor) => (
    <Ionicons
      name={icon}
      size={28}
      color={primaryColor}
      style={styles.suggestionIcon}
    />
  );

  renderSuggestionHr = () => (
    <View style={styles.suggestionHr}>
      <View style={styles.suggestionHrLine} />
    </View>
  )

  render() {
    const { isAccepted } = this.state;
    const {
      text,
      icon,
      AcceptedPrcolor,
      NotAcceptedPrcolor,
      AcceptedBgcolor,
      NotAcceptedBgcolor,
      borderColor
    } = this.props;
    const primaryColor = isAccepted ? AcceptedPrcolor : NotAcceptedPrcolor;
    const backgroundColor = isAccepted ? AcceptedBgcolor : NotAcceptedBgcolor;
    return (
      <View style={[styles.systemMessageContainer, styles.suggestionContainer]}>
        {this.renderSuggestionHr()}
        <TouchableOpacity
          onPress={this.onPress}
          style={[styles.suggestionContent, { backgroundColor, borderColor }]}
        >
          {this.renderIcon(icon, primaryColor)}
          <Text style={[styles.suggestionText, { color: primaryColor }]}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SuggestionMessage.propTypes = {
  ...interactionMessageProps
};

SuggestionMessage.defaultProps = {
  ...interactionMessageDefaultProps
};
