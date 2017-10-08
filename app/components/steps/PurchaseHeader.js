import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../reusable/Button';

class PurchaseHeader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'PurchaseHeader'
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>PurchaseHeader</Text>
        <Button text="Go to LineItem" onPress={() => this.props.navigation.navigate('ItemLine')} />
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

export default PurchaseHeader;
