import {
  Dimensions, PixelRatio, Platform
} from 'react-native';

import { Constants } from 'expo';

const screenDimentsion = Dimensions.get('window');
const userIOSDevice = Constants.deviceName;
const userAndroidDevice = Platform.OS;

const newPixelRatio = (
  screenMeasurement,
  elementMeasurement
) => {
  const floatNumber = parseFloat(elementMeasurement);
  return PixelRatio.roundToNearestPixel(screenMeasurement * (floatNumber / 100));
};

const widthPercentageToDP = (width) => {
  const screenWidth = screenDimentsion.width;
  return newPixelRatio(screenWidth, width);
};

const heightPercentageToDP = (height) => {
  const screenHeight = screenDimentsion.height;
  return newPixelRatio(screenHeight, height);
};

const checkForIPhone5 = responsiveness => (
  responsiveness === 'iPhone 5s'
);

const checkForOtherIphones = () => {
  const deviceNames = [
    'iPhone 6s',
    'iPhone 6 Plus',
    'iPhone 6s',
    'iPhone 6s Plus',
    'iPhone 7',
    'iPhone 7 Plus',
    'iPhone 8',
    'iPhone 8 Plus',
    'iPhone SE',
    'iPhone X',
    'iPhone Xs',
    'iPhone Xs Max',
    'iPhone XR'
  ];

  return deviceNames.some(device => device === userIOSDevice);
};

const checkForIpads = () => {
  const deviceNames = [
    'iPad Air',
    'iPad Air 2',
    'iPad Pro (9.7-inch)',
    'iPad Pro (12.9-inch) (3rd generation)',
    'iPad Pro (10.5-inch)',
    'iPad (5th generation)',
    'iPad Pro (12.9-inch) (2nd generation)',
    'iPad Pro (12.9-inch)',
    'iPad (6th generation)',
    'iPad Pro (11-inch)',
    'iPad Air (3rd generation)'
  ];

  return deviceNames.some(device => device === userIOSDevice);
};

const checkForLesserAndroids = responsiveness => (
  responsiveness === 'android'
  && (screenDimentsion.height <= 592 || screenDimentsion.width <= 384)
);

const checkDeviceHeight = (
  iPhone5Height,
  iPadHeight,
  otherDeviceHeight,
  userIOSDeviceType = userIOSDevice
) => {
  if (checkForIPhone5(userIOSDeviceType)) {
    return heightPercentageToDP(iPhone5Height);
  }
  if (checkForIpads()) {
    return heightPercentageToDP(iPadHeight);
  }
  return heightPercentageToDP(otherDeviceHeight);
};

const checkDeviceWidth = (
  iPhone5Width,
  otherDeviceWidth,
  lesserAndroidsWidth,
  otherIphonesWidth,
  iPadWidth,
  userIOSDeviceType = userIOSDevice,
  userAndroidDeviceType = userAndroidDevice
) => {
  if (checkForIPhone5(userIOSDeviceType)) {
    return widthPercentageToDP(iPhone5Width);
  }
  if (checkForOtherIphones()) {
    return widthPercentageToDP(otherIphonesWidth);
  }
  if (checkForLesserAndroids(userAndroidDeviceType)) {
    return widthPercentageToDP(lesserAndroidsWidth);
  }
  if (checkForIpads()) {
    return widthPercentageToDP(iPadWidth);
  }
  return widthPercentageToDP(otherDeviceWidth);
};

export {
  widthPercentageToDP,
  heightPercentageToDP,
  checkForIPhone5,
  checkForLesserAndroids,
  checkForOtherIphones,
  checkDeviceHeight,
  checkDeviceWidth
};
