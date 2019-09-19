import React from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

const { width: DEVICE_WIDTH } = Dimensions.get('window');

const ModalComponent = ({ isVisible, style, children }) => (
  <Modal
    avoidKeyboard
    backdropOpacity={0.1}
    isVisible={isVisible}
    deviceWidth={DEVICE_WIDTH}
    style={style}
    hasBackdrop
  >
    {children}
  </Modal>
);


ModalComponent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  style: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ModalComponent;
