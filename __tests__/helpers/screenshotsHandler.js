
const screenshotHandler = (component, title = 'should match snapshot') => {
  test(title, () => {
    expect(component).toMatchSnapshot();
  });
};

export default screenshotHandler;
