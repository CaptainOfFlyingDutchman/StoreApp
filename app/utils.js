import { Dimensions } from 'react-native';
import { screen } from './constants';

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

/* eslint-disable no-nested-ternary */
export const generateUniqueId = (screenType, storeName) => {
  const now = new Date();
  const prefix = screenType === screen.receive ? 'REC' : screenType === screen.return ? 'RET' : 'REQ';
  const dateString = `${padZero(now.getDate())}${padZero(now.getMonth() + 1)}${now.getFullYear()}`;
  const timeString = `${padZero(now.getHours())}${padZero(now.getMinutes())}${padZero(now.getSeconds())}`;
  const nameParts = [storeName, prefix, dateString, timeString];
  return nameParts.join('_');
};

const padZero = comp => (comp < 10 ? `0${comp}` : comp);
