import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import MessageDialog from './MessageDialog';
import SuggestionMessage from './SuggestionMessage';
import {
  interactionMessageProps,
  interactionMessageDefaultProps
} from './propsDefinition';

const InteractionMessage = (props) => {
  const {
    action,
    text,
    icon,
    AcceptedPrcolor,
    NotAcceptedPrcolor,
    AcceptedBgcolor,
    NotAcceptedBgcolor,
    borderColor
  } = props;
  return (
    <View>
      <MessageDialog {...props} />
      <SuggestionMessage
        action={action}
        text={text}
        icon={icon}
        AcceptedPrcolor={AcceptedPrcolor}
        NotAcceptedPrcolor={NotAcceptedPrcolor}
        AcceptedBgcolor={AcceptedBgcolor}
        NotAcceptedBgcolor={NotAcceptedBgcolor}
        borderColor={borderColor}
      />
    </View>
  );
};

InteractionMessage.propTypes = {
  ...interactionMessageProps,
  text: PropTypes.string,
  icon: PropTypes.string,
  action: PropTypes.func,
  AcceptedPrcolor: PropTypes.string,
  NotAcceptedPrcolor: PropTypes.string,
  AcceptedBgcolor: PropTypes.string,
  NotAcceptedBgcolor: PropTypes.string,
  borderColor: PropTypes.string
};

InteractionMessage.defaultProps = {
  ...interactionMessageDefaultProps
};

export default InteractionMessage;
