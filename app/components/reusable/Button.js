import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

Button.defaultProps = {
  onPress: () => {}
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
    fontSize: 18
  },
});

export default Button;
