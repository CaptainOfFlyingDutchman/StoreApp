import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

class Sync extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: 'Sync',
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });

  render() {
    return (
      <View style={styles.container}>
        <IconFA name="cloud" size={100} />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Tap to Sync</Text>
        </TouchableOpacity>
        <Text style={styles.syncText}>Last Sync: <Text>7</Text> hours ago</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    padding: 25,
    paddingLeft: 50,
    paddingRight: 50,
    color: 'white',
    fontSize: 18
  },
  syncText: {
    marginTop: 10,
    fontSize: 20
  }
});

export default Sync;
