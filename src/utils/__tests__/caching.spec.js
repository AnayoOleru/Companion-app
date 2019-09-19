import { cacheImages } from '../caching';

describe('caching tests', () => {
  const expectedResults = {
    _40: 0,
    _55: null,
    _65: 0,
    _72: null
  };

  test('test cacheImage', () => {
    const image = ['test'];
    expect(cacheImages(image)).toEqual(expectedResults);
  });

  test('test cacheImage', () => {
    expect(cacheImages()).toEqual(expectedResults);
  });
});
