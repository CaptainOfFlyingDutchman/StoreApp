import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

import Field from '../reusable/Field';
import InfoBar from '../reusable/InfoBar';
import Button from '../reusable/Button';
import { screen } from '../../constants';

class ItemLine extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  constructor(props) {
    super(props);

    this.state = {
      displayBarCodeForm: 'flex',
      barCodeRead: false
    };

    this._addDetailsButtonHandler = this._addDetailsButtonHandler.bind(this);
  }

  _addDetailsButtonHandler() {
    if (this.state.displayBarCodeForm === 'flex') {
      this.setState({ displayBarCodeForm: 'none' });
    } else {
      this.setState({ displayBarCodeForm: 'flex' });
    }
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Field label="Barcode" icon="barcode" onPress={() => alert('bar code logic')} />
          <Button disabled={this.state.barCodeRead} style={{ marginBottom: 20 }} text="Add details"
            onPress={this._addDetailsButtonHandler} />

          <ScrollView style={{display: this.state.displayBarCodeForm}}>
            <Field label="Item Id" iconMCI="alphabetical" editable={false} />
            <Field label="Description" iconMCI="alphabetical" editable={false} />
            <Field label="Vendor Id" iconMCI="alphabetical" editable={false} />
            {
              params.screen === screen.return ?
                <Field label="Quantity Returned" iconMCI="numeric" keyboardType="numeric" /> :
                  params.screen === screen.receive ?
                    <Field label="Quantity Received" iconMCI="numeric" keyboardType="numeric" /> :
                      <Field label="Quantity Required" iconMCI="numeric" keyboardType="numeric" />
            }

            <Field label="UoM" iconMCI="alphabetical" editable={true} />

            {
              params.screen !== screen.requisition &&
                <Field label="Item Cost" iconMCI="numeric" />
            }
            {
              params.screen !== screen.requisition &&
                <Field label="Total Cost" icon="calculator" editable={false} />
            }
          </ScrollView>

        </View>


        <InfoBar screensRemaining={2} onPress={() =>
          this.props.navigation.navigate('Footer', {
            ...params
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
