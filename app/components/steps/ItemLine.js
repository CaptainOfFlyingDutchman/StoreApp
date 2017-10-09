import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Field from '../reusable/Field';
import InfoBar from '../reusable/InfoBar';
import Button from '../reusable/Button';

class ItemLine extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Field label="Barcode" icon="barcode" editable={false} />
        </View>

        <InfoBar screensRemaining={2} onPress={() => 
          this.props.navigation.navigate('ItemLine', {
            ...this.props.navigation.state.params
          })} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    margin: 10,
    height: 100
  }
});

export default ItemLine;
