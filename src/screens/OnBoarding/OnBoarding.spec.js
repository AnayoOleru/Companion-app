import React from 'react';
import { shallow } from 'enzyme';
import OnBoarding from '.';
import slideImage1 from './components/assets/swipper1.png';
import navigationProps from '../../../__tests__/helpers/navigationProps';

jest.useFakeTimers();

const props = {
  slideImg: slideImage1,
  page1: 'pages',
  page2: 'pages',
  page3: 'pages',
  bodyText: 'test',
  slideTitle: 'test',
  navigation: {
    ...navigationProps.navigation
  }
};

const swiperDefaultProps = ['onTouchStart', 'onTouchEnd', 'onMomentumScrollEnd'];

const state = {
  index: 0
};
const event = {};
const wrapper = shallow(<OnBoarding {...props} />);

describe('Component Rendering', () => {
  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should call go to greetings function', async () => {
    const instance = wrapper.instance();
    wrapper.update();
    await instance.goToGreetings();
    instance.goToGreetings = jest.fn();
    expect(navigationProps.navigation.navigate).toBeCalled();
  });

  test('should test the fade method', async () => {
    const instance = wrapper.instance();
    instance.fade(0, 100, 100);
  });

  test('should call the onTouchStart prop of the last swiper', async () => {
    wrapper
      .find('_default')
      .at(1)
      .props()
      .onTouchStart();
  });

  test('should call the default prop of the first swiper', async () => {
    swiperDefaultProps.map(data => wrapper
      .find('_default')
      .first()
      .props()[data](event, state));
  });
});
