import React from 'react';
import LottieView from 'lottie-react-native';
import botTyping from '../../../assets/botTyping.json';

const BotProcessing = () => (
  <LottieView
    autoPlay
    loop
    source={botTyping}
    style={{
      width: 50,
      height: 50,
      marginLeft: 8
    }}
  />
);

export default BotProcessing;
