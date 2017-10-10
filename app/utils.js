import { Dimensions } from 'react-native';

export const getProgressBarWidth = (screensRemaining, progressBarWidth) => {
  const perScreenWidth = progressBarWidth / screensRemaining;
  return perScreenWidth;
};

export const getProgressBarPercentage = (screensRemaining) => {
  const totalWidth = Dimensions.get('window').width;
  const perScreenWidth = totalWidth / screensRemaining;
  const perScreenWidthInPercentage = (perScreenWidth / totalWidth) * 100;
  return Math.floor(perScreenWidthInPercentage);
};
