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
      displayBarCodeForm: 'none'
    };
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <Field label="Barcode" icon="barcode" editable={false} />
            <IconFA name="plus" size={24} style={{
              marginLeft: 10,
              marginBottom: 25,
            }} onPress={() => {
              if (this.state.displayBarCodeForm === 'flex') {
                this.setState({ displayBarCodeForm: 'none' });
              } else {
                this.setState({ displayBarCodeForm: 'flex' });
              }
            }} />
          </View>

          <ScrollView style={{display: this.state.displayBarCodeForm}}>
            <Field label="Item Id" iconMCI="alphabetical" editable={false} />
            <Field label="Description" iconMCI="alphabetical" editable={false} />
            <Field label="Vendor Name" iconMCI="alphabetical" editable={false} />
            {
              params.screen === screen.return ?
                <Field label="Quantity Returned" iconMCI="numeric" /> :
                  params.screen === screen.receive ?
                    <Field label="Quantity Received" iconMCI="numeric" /> :
                      <Field label="Quantity Required" iconMCI="numeric" />
            }

            <Field label="UoM" icon="list" editable={false} />

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
