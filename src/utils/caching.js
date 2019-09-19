import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Image } from 'react-native';

export const cacheImages = async (images = []) => images.map(async (image) => {
  if (typeof image === 'string') {
    return Image.prefetch(image);
  }
  const downloaded = await Asset.fromModule(image).downloadAsync();
  return downloaded;
});

export const cacheFonts = async (fonts) => {
  const loaded = await Font.loadAsync({
    ...fonts
  });
  return loaded;
};
