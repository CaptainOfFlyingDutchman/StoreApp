import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Button from './Button';
import { getProgressBarWidth, getProgressBarPercentage } from '../../utils';

class InfoBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progressBarWidth: 0
    };
  }

  render() {
    const { text, onPress, screensRemaining } = this.props;
    return (
      <View style={styles.infoContainer}>
        <View
          onLayout={(e) => {
            this.setState({ progressBarWidth: Math.floor(e.nativeEvent.layout.width) });
            return true;
          }}
          style={styles.progressBarContainer} >
          <View
            style={[styles.progressBar, {
              width: getProgressBarWidth(screensRemaining, this.state.progressBarWidth)
            }]}>
            <Text style={styles.progressBarText}>
              {getProgressBarPercentage(screensRemaining)}%
            </Text>
          </View>
        </View>

        <Button text={text} onPress={onPress} />
      </View>
    );
  }
}

InfoBar.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  screensRemaining: PropTypes.number.isRequired
};

InfoBar.defaultProps = {
  text: 'Next'
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
