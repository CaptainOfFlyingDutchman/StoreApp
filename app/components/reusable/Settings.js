import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

import Realm from '../realm';

const setting = Realm.objects('Setting');

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };

    this._showPassword = this._showPassword.bind(this);
  }

  _showPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    if (setting.length) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeading}>Username</Text>
            <Text style={styles.textValue}>{setting[0].navUser}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textHeading}>Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {
                !this.state.showPassword ?
                  <Text style={[styles.textValue, { flex: 1 }]}>
                    {setting[0].navPassword.split('').map(() => '*').join('')}
                  </Text> :
                  <Text style={[styles.textValue, { flex: 1 }]}>{setting[0].navPassword}</Text>
              }
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={this._showPassword}>
                {
                  !this.state.showPassword ?
                    <IconFA name="eye-slash" size={28} /> :
                    <IconFA name="eye" size={28} />
                }
              </TouchableOpacity>
            </View>
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
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 26 }}>SORRY!</Text>
        <Text style={{ fontSize: 18 }}>Could not load settings. Please try again later.</Text>
      </View>
    );
  }
}

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
