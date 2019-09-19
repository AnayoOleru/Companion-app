import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import {
  Animated, AsyncStorage, View
} from 'react-native';
import PropTypes from 'prop-types';

import Slide, { Content } from './components/Slide';
import { ConnectedGreetingsScreen } from '../Greetings';
import slideImage3 from './components/assets/swipper3.png';
import slideImage2 from './components/assets/swipper2.png';
import slideImage1 from './components/assets/swipper1.png';
import * as content from './components/constants';

class OnBoarding extends Component {
  state = {
    title: content.slideTitle1,
    body: content.slideBody1,
    subbody: '',
    fadeAnim: new Animated.Value(0.01),
    slowAnim: new Animated.Value(0.01),
    ImageAnim: new Animated.Value(0.01),
    index: 0,
    pages1: 'currentPage',
    pages2: 'pages',
    pages3: 'pages',
    pagination: new Animated.Value(0.01)
  };

  componentDidMount() {
    this.onBoardingStatus();
    this.fade(1, 1000, 2500, 1000);
  }

  onBoardingStatus = async () => {
    await AsyncStorage.setItem('onBoard', 'true');
    this.animatepaginate(1, 2000);
  };

  animatepaginate = (toValue, paginationAnim) => {
    const { pagination } = this.state;
    Animated.timing(pagination, {
      toValue,
      duration: paginationAnim
    }).start();
  }

  fade = (toValue, fastDuration, slowDuration, ImageDuration) => {
    const { fadeAnim, slowAnim, ImageAnim } = this.state;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue,
        duration: fastDuration
      }),
      Animated.timing(slowAnim, {
        toValue,
        duration: slowDuration
      }),
      Animated.timing(ImageAnim, {
        toValue,
        duration: ImageDuration
      })
    ]).start();
  };

  goToGreetings = () => {
    this.fade(0.01, 10, 10);
    this.animatepaginate(0.01, 10);
    const {
      navigation: { navigate }
    } = this.props;
    navigate('Greetings');
  };

  handleSetState = (state) => {
    this.setState({
      title: content[`slideTitle${state.index + 1}`],
      body: content[`slideBody${state.index + 1}`],
      subbody: content[`subBody${state.index + 1}`],
      index: state.index,
      [`pages${state.index + 1}`]: 'currentPage',
      [`pages${state.index}`]: 'pages',
      [`pages${state.index + 2}`]: 'pages'
    });
    this.fade(1, 1000, 2500, 1000);
    this.animatepaginate(1, 10);
  };

  swiperProps = () => ({
    loop: false,
    showsPagination: false,
    onTouchStart: () => this.fade(0.01, 100, 200, 300),
    onTouchEnd:
      (e, state) => {
        if (state) return this.handleSetState(state);
        return this.fade(1, 1000, 2500, 1000);
      },
    onMomentumScrollEnd: (e, state) => {
      this.handleSetState(state);
    }
  })

  renderSlide = (pageContainer) => {
    const { slowAnim } = this.state;
    return (
      <Slide
        pageContainer={pageContainer}
        skipOnBoarding={this.goToGreetings}
        slowAnim={slowAnim}
      />
    );
  }

  render() {
    const images = [slideImage1, slideImage2, slideImage3];
    return (
      <View style={{ flex: 1, height: '100%', width: '100%' }}>
        <Swiper {...this.swiperProps()}>
          {this.renderSlide('page1Container')}
          {this.renderSlide('page2Container')}
          <Swiper
            onMomentumScrollEnd={this.goToGreetings}
            loop={false}
            showsPagination={false}
            onTouchStart={
              () => {
                this.fade(0.01, 100, 100, 100); this.animatepaginate(0, 10);
              }}
          >
            {this.renderSlide('page3Container')}
            <ConnectedGreetingsScreen />
          </Swiper>
        </Swiper>
        <Content props={{ ...this.state, images }} />
      </View>
    );
  }
}

OnBoarding.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired
};

export default OnBoarding;
