import { Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { screen } from './constants';

/**
 *
 * @param {number} screensRemaining
 * @param {number} progressBarWidth
 */
export const getProgressBarWidth = (screensRemaining, progressBarWidth) => {
  const perScreenWidth = progressBarWidth / screensRemaining;
  return perScreenWidth;
};

/**
 *
 * @param {number} screensRemaining
 */
export const getProgressBarPercentage = (screensRemaining) => {
  const totalWidth = Dimensions.get('window').width;
  const perScreenWidth = totalWidth / screensRemaining;
  const perScreenWidthInPercentage = (perScreenWidth / totalWidth) * 100;
  return Math.floor(perScreenWidthInPercentage);
};

/**
 *
 * @param {string} screenType
 * @param {string} storeName
 */
export const generateUniqueId = (screenType, storeName) => {
  const now = new Date();
  const prefix = screenType === screen.receive ? 'REC' : screenType === screen.return ? 'RET' : 'REQ';
  const dateString = `${padZero(now.getDate())}${padZero(now.getMonth() + 1)}${now.getFullYear()}`;
  const timeString = `${padZero(now.getHours())}${padZero(now.getMinutes())}${padZero(now.getSeconds())}`;
  const nameParts = [storeName, prefix, dateString, timeString];
  return nameParts.join('_');
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 *
 * @param {Date} date
 */
export const formatDateForPost = date =>
  `a${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}/${date.getFullYear()}`;

/**
 *
 * @param {Date} date
 */
export const formatDate = date =>
`${padZero(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`;

/**
 *
 * @param {number} num
 */
const padZero = num => (num < 10 ? `0${num}` : num);

/**
 *
 * @param {string} dateString
 */
export const stringToDate = (dateString) => {
  const dateArray = dateString.split(' ');
  return new Date(dateArray[2], months.indexOf(dateArray[1]), dateArray[0]);
};

/**
 *
 * @param {string} string
 */
export const capitalize = string =>
  `${string.substring(0, 1).toUpperCase()}${string.substring(1).toLowerCase()}`;

export const getNavigationResetAction = routeName =>
  NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName })
    ]
  });
