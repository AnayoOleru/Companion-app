import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import ViewText from '../../Greetings/components/ViewText';

const Notification = ({ message }) => (
  <ViewText
    viewStyles={styles.ConnectionNotification}
    textStyles={styles.NotificationText}
    text={message}
  />
);

Notification.propTypes = {
  message: PropTypes.string
};

Notification.defaultProps = {
  message: ''
};

export default Notification;
