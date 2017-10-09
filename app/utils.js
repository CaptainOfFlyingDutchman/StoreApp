import { Dimensions } from 'react-native';

export const progressBarWidth = by => (Dimensions.get('window').width - 108) / by;

export const progressBarPercentage = () => Math.floor(100 - ((Dimensions.get('window').width - 108) / (Dimensions.get('window').width) * 100))
