import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

import Button from '../reusable/Button';
import Field from '../reusable/Field';
import InfoBar from '../reusable/InfoBar';
import { screen } from '../../constants';

class PurchaseHeader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.formContainer}>
          <Field label="Date" icon="calendar" editable={false} />
          <Field label="Vendor Name" icon="list" editable={false} />
          <Field label="Vendor Id" iconMCI="alphabetical" />
          <Field label="Reference No" iconMCI="alphabetical" />
          {
            this.props.navigation.state.params.screen === screen.return &&
            <Field label="Return Reason Code" icon="list" editable={false} />
          }
        </ScrollView>

        <InfoBar screensRemaining={3} onPress={() =>
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

export default PurchaseHeader;
