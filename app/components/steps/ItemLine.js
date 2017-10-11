import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Modal } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';

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
      displayBarCodeForm: 'none',
      modalVisible: false,
      barCodeData: ''
    };
    // barCodeData: { type: 'EAN_13', data: '0123456789012' }
    this._addDetailsButtonHandler = this._addDetailsButtonHandler.bind(this);
    this._renderBarCodeReader = this._renderBarCodeReader.bind(this);
  }

  _addDetailsButtonHandler() {
    if (this.state.displayBarCodeForm === 'flex') {
      this.setState({ displayBarCodeForm: 'none' });
    } else {
      this.setState({ displayBarCodeForm: 'flex' });
    }
  }

  _renderBarCodeReader() {
    return(
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}>
          <View style={{ flex: 1 }}>
            <View style={styles.barCodeContainer}>
              <Camera
                onBarCodeRead={(e) => this.setState({ barCodeData: e.data, modalVisible: false })}
                style={{ flex: 1 }}
                aspect={Camera.constants.Aspect.fill} />
            </View>

            <View style={styles.barCodeButtonsContainer}>
              <Button text="Close" onPress={() =>  this.setState({ modalVisible: false })} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Field value={this.state.barCodeData}
            onChangeText={(value) => {
              this.setState(() => ({ barCodeData: value}), () => {
                if (this.state.barCodeData === '') {
                  this.setState({ displayBarCodeForm: 'none' })
                } else {
                  // this.setState({ displayBarCodeForm: 'flex'})
                }
              })
            }}
            label="Barcode" icon="barcode"
            onPress={() => this.setState({ modalVisible: true })} />
          <Button disabled={this.state.barCodeData === '' ? true : false} style={{ marginBottom: 20 }} text="Add details"
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

        { this._renderBarCodeReader() }
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
  },
  barCodeContainer: {
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1, flex: 1
  },
  barCodeButtonsContainer: {
    margin: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: 'space-around'
  }
});

export default ItemLine;
