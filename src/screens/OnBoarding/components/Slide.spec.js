import React from 'react';
import { shallow } from 'enzyme';
import Slide, { Content } from './Slide';
import slideImage1 from './assets/swipper1.png';

const props = {
  slideImg: slideImage1,
  page1: 'pages',
  page2: 'pages',
  page3: 'pages',
  bodyText: 'test',
  slideTitle: 'test',
  skipOnBoarding: jest.fn(),
  pageContainer: '',
  slowAnim: {}
};

const ContentProps = {
  props: {
    body: 'test',
    title: 'test',
    subbody: 'test',
    fadeAnim: {},
    slowAnim: {},
    index: 0,
    pages1: 'pages',
    pages2: 'pages',
    pages3: 'pages',
    pagination: {},
    images: [],
    ImageAnim: {}
  }
};

const componentWrapper = shallow(<Slide {...props} />);
const ContentWrapper = shallow(<Content {...ContentProps} />);
const components = [componentWrapper, ContentWrapper];
describe('Component Rendering', () => {
  test('should match the snapshot', () => {
    components.map(index => expect(index).toMatchSnapshot());
  });
});
