import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { username, password, navUrl } from '../../config';

const Settings = () => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.textHeading}>Username</Text>
      <Text style={styles.textValue}>{username}</Text>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.textHeading}>Password</Text>
      <Text style={styles.textValue}>{password}</Text>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.textHeading}>Nav URL</Text>
      <Text style={styles.textValue}>{navUrl}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  textContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10
  },
  textHeading: {
    fontSize: 26,
    marginBottom: 10
  },
  textValue: {
    fontSize: 18,
    borderWidth: 1,
    padding: 5,
    borderColor: 'lightgray'
  }
});

export default Settings;
