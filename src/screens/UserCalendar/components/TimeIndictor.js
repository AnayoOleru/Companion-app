import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { getCurrentTime } from '../../../utils/helpers';
import { timeIndicatorStyles as styles } from './styles';
import { DEVICE_HEIGHT } from '../../../utils/responsiveDimensions';

const DEVICE_RATIO = (100 / DEVICE_HEIGHT) * 9;

const TimeIndictor = () => {
  const [time, setTime] = useState(getCurrentTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 30000);
    return () => clearInterval(interval);
  }, [time, setTime]);

  const relativePosition = (100 / 24) * time;
  const positionTop = DEVICE_RATIO + relativePosition;

  const containerStyles = [styles.container];
  containerStyles.push({ top: `${positionTop}%` });

  return (
    <View style={[containerStyles]}>
      <View style={styles.oval} />
      <View style={styles.currentTime} />
    </View>
  );
};

export default TimeIndictor;
