import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../reusable/Button';

class ItemLine extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ItemLine'
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>ItemLine</Text>
        <Button text="Go to Footer" onPress={() => this.props.navigation.navigate('Footer')} />
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

export default ItemLine;
