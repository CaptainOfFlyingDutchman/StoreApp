import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Footer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Footer'
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Footer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default Footer;
