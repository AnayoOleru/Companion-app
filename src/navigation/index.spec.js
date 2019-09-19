import navigation, { greetingsNavigationOptions } from './index';

describe('navigation of the application', () => {
  test('should render the navigation', () => {
    expect(navigation).toMatchSnapshot();
  });

  test('should return the navigation options', () => {
    const naviProps = {
      navigation: { state: { params: { picture: 'http://picurl' } } }
    };
    const navigationOptions = greetingsNavigationOptions(naviProps);
    expect(navigationOptions).toHaveProperty('headerLeft');
    expect(navigationOptions).toHaveProperty('headerRight');
  });

  test('should test the navigation headerRight onPress', () => {
    const naviProps = {
      navigation: {
        state: { params: { picture: 'http://picurl' } },
        navigate: jest.fn()
      }
    };
    const navigationOptions = greetingsNavigationOptions(naviProps);
    navigationOptions.headerRight.props.onPress();
  });
});
