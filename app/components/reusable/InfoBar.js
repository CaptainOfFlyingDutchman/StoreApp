import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Button';
import { progressBarPercentage, progressBarWidth } from '../../utils';

const InfoBar = ({ onPress, screensRemaining }) => (
  <View style={styles.infoContainer}>
    <View style={styles.progressBarContainer} >
      <View style={[styles.progressBar, { width: progressBarWidth(screensRemaining) }]}>
        <Text style={styles.progressBarText}>{progressBarPercentage()}%</Text>
      </View>
    </View>

    <Button text="Next" onPress={onPress} />
  </View>
);

InfoBar.propTypes = {
  onPress: PropTypes.func.isRequired,
  screensRemaining: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  progressBarContainer: {
    flex: 1,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginRight: 10,
    height: 22
  },
  progressBar: {
    backgroundColor: 'green',
    borderRadius: 10,
    flex: 1
  },
  progressBarText: {
    color: 'white',
    alignSelf: 'flex-end',
    marginRight: 5
  }
});

export default InfoBar;
