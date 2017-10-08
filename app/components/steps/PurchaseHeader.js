import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

import Button from '../reusable/Button';
import Field from '../reusable/Field';
import InfoBar from '../reusable/InfoBar';

class PurchaseHeader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Field label="Date" icon="calendar" editable={false} />
          <Field label="Vendor Name" icon="list" editable={false} />
          <Field label="Vendor Id" icon="font" editable={true} />
          <Field label="Vendor Memo No" icon="font" editable={true} />
          <Field label="Return Reason Code" icon="list" editable={false} />
        </View>

        <InfoBar onPress={() => this.props.navigation.navigate('ItemLine')} />
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
