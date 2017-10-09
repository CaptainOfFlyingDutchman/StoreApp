import React, { PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const CancelButton = ({ onPress, text }) => (
  <TouchableHighlight style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>
      {text}
    </Text>
  </TouchableHighlight>
);

CancelButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#0069d5',
    alignSelf: 'center',
    fontSize: 18
  },
  button: {
    height: 36,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    padding: 22,
    justifyContent: 'center'
  }
});

export default CancelButton;
