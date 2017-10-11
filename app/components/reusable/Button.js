import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = ({ text, onPress, style, disabled }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}
    style={[styles.buttonContainer, { ...style }, disabled ? { backgroundColor: 'lightgray' } : {}]}>
    <Text style={[styles.buttonText, { textAlign: 'center' }]}>{text}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  onPress: () => {},
  style: {},
  disabled: false
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
    fontSize: 18,
    textAlign: 'center'
  },
});

export default Button;
