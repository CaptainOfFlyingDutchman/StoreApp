import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Realm from '../realm';

const setting = Realm.objects('Setting');

const Settings = () => (
  <ScrollView style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.textHeading}>Username</Text>
      <Text style={styles.textValue}>{setting[0].navUser}</Text>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.textHeading}>Password</Text>
      <Text style={styles.textValue}>{setting[0].navPassword}</Text>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.textHeading}>Nav URL</Text>
      <Text style={styles.textValue}>{setting[0].navUrl}</Text>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.textHeading}>Current User</Text>
      <Text style={styles.textValue}>{setting[0].currentUser}</Text>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.textHeading}>Return User Code</Text>
      <Text style={styles.textValue}>{setting[0].returnUserCode}</Text>
    </View>
  </ScrollView>
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
