import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

const Button = ({ text, name, color, onPress, style, styleText, disabled }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}
    style={[styles.buttonContainer, { ...style }, disabled ? { backgroundColor: 'lightgray' } : {}]}>
    { name ? <IconFA style={{
      padding: 10
    }} color={color} name="list" size={24} /> : null }
    { text ? <Text style={[styles.buttonText, { ...styleText }]}>{text}</Text> : null }
  </TouchableOpacity>
);

Button.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  styleText: PropTypes.object,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  text: '',
  name: '',
  color: 'white',
  onPress: () => {},
  style: {},
  styleText: {},
  disabled: false
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'blue',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
