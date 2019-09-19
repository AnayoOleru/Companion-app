import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import Notification from './components/Notification';

export default class ConnectionNotice extends Component {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  handleConnectionChange = (isConnected) => {
    this.setState({ isConnected });
  };

  render() {
    const { isConnected } = this.state;
    return !isConnected && <Notification message="No Internet Connection" />;
  }
}
