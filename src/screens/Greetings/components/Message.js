import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import GreetingsMessage from './GreetingsMessage';
import MessageDialog from './MessageDialog';
import InteractionMessage from './InteractionMessage';
import EventDurationQueryMessage from './EventDurationQueryMessage';
import { generateKey } from '../../../utils/helpers';
import { calendarProps, directionProps } from './Props';

const Message = (props) => {
  const { currentMessage, action } = props;
  const { openAttendeesModal, directionsArrival } = action;
  const { text = '', type, parameters: params = {} } = currentMessage;

  const key = generateKey(text, type);
  return (
    <View>
      {{
        'true-false-false-false-false': <InteractionMessage
          {...props}
          action={openAttendeesModal}
          {...calendarProps}
        />,
        'false-false-false-false-true': <InteractionMessage
          {...props}
          action={directionsArrival}
          {...directionProps(params.floor || params.block)}
        />,
        'false-false-true-false-false': <GreetingsMessage {...props} />,
        'false-false-false-true-false': <EventDurationQueryMessage {...props} />,
        'false-true-false-false-false': <MessageDialog {...props} />,
        'false-false-false-false-false': <MessageDialog position="left" {...props} />
      }[key]}
    </View>
  );
};

Message.propTypes = {
  currentMessage: PropTypes.shape({
    user: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.string,
    text: PropTypes.any,
    _id: PropTypes.any,
    parameters: PropTypes.any
  }),
  action: PropTypes.shape({
    openAttendeesModal: PropTypes.func.isRequired,
    directionsArrival: PropTypes.func.isRequired
  })
};

Message.defaultProps = {
  currentMessage: {
    type: null,
    text: '',
    parameters: PropTypes.any
  },
  action: () => {}
};

export default Message;
