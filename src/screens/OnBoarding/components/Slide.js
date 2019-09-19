import React from 'react';
import {
  Image, SafeAreaView, View, Animated, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import slideImage3 from './assets/swipper3.png';
import slideImage2 from './assets/swipper2.png';
import slideImage1 from './assets/swipper1.png';

const Slide = ({
  pageContainer, skipOnBoarding, slowAnim
}) => (
  <SafeAreaView style={[styles.container, styles[pageContainer]]}>
    <Animated.Text style={{ ...styles.buttomText, opacity: slowAnim }}>
      Swipe right to continue
    </Animated.Text>
    <TouchableOpacity
      onPress={skipOnBoarding}
      style={{ marginTop: 10, bottom: 10 }}
    >
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Animated.Text
          style={{
            ...styles.buttomText,
            textDecorationLine: 'underline',
            opacity: slowAnim
          }}
        >
          Skip
        </Animated.Text>
      </View>
    </TouchableOpacity>
  </SafeAreaView>
);

const images = [slideImage1, slideImage2, slideImage3];

export const Content = ({
  props: {
    body,
    subbody,
    title,
    slowAnim,
    fadeAnim,
    index,
    pages3,
    pages1,
    pagination,
    pages2,
    ImageAnim
  }
}) => (
  <View style={styles.onBoardingInfo} pointerEvents="none">
    <View style={styles.body}>
      <Animated.View style={{ opacity: ImageAnim }}>
        <Image style={styles.header} source={images[index]} resizeMode="contain" />
      </Animated.View>
      <Animated.View style={{ ...styles.pagination, opacity: pagination }}>
        <View style={styles[pages1]} />
        <View style={styles[pages2]} />
        <View style={styles[pages3]} />
      </Animated.View>
      <View style={styles.alignBody}>
        <Animated.Text style={{ ...styles.title, opacity: fadeAnim }}>
          {title}
        </Animated.Text>
        <Animated.Text style={{ ...styles.bodyText, opacity: slowAnim }}>
          {body}
        </Animated.Text>
        <Animated.Text style={{ ...styles.boldText, opacity: slowAnim }}>
          {subbody}
        </Animated.Text>
      </View>
    </View>
  </View>
);

Slide.propTypes = {
  pageContainer: PropTypes.string.isRequired,
  skipOnBoarding: PropTypes.func.isRequired,
  slowAnim: PropTypes.shape({}).isRequired
};

Content.propTypes = {
  props: PropTypes.shape({
    body: PropTypes.string.isRequired,
    subbody: PropTypes.string,
    title: PropTypes.string.isRequired,
    slowAnim: PropTypes.shape({}).isRequired,
    fadeAnim: PropTypes.shape({}).isRequired,
    index: PropTypes.number.isRequired,
    pages3: PropTypes.string.isRequired,
    pages1: PropTypes.string.isRequired,
    pagination: PropTypes.shape({}).isRequired,
    pages2: PropTypes.string.isRequired,
    ImageAnim: PropTypes.shape({}).isRequired
  }).isRequired
};

export default Slide;
