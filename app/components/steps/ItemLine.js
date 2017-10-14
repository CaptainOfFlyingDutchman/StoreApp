import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StyleSheet, Modal, Alert } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';

import Field from '../reusable/Field';
import InfoBar from '../reusable/InfoBar';
import Button from '../reusable/Button';
import { screen } from '../../constants';
import Realm from '../realm';
import barCodes from '../../mock-data/barcodes.json';
import { addItemLine } from './ItemLine.actions';

class ItemLine extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  constructor(props) {
    super(props);

    this.state = {
      displayBarCodeForm: 'none',
      modalVisible: false,
      barCodeData: '',
      barCodeItem: {},
      quantityReceived: '0',
      itemCost: '0',
      totalCost: '0'
    };
    // barCodeData: { type: 'EAN_13', data: '0123456789012' }

    barCodes.value.slice(0,3).forEach(barCode => Realm.write(() => {
      Realm.create('Item', {
        barCode: barCode.Bar_Code,
        no: barCode.Item_No,
        description: barCode.Description,
        unitCost: Number.parseFloat(barCode.Unit_Cost),
        vendorId: barCode.Vendor_No,
        vendorName:'',
        uom: barCode.AuxiliaryIndex1
      }, true);
    }));
    this.barCodeItems = Realm.objects('Item');

    this._renderBarCodeReader = this._renderBarCodeReader.bind(this);
    this._addDetailsHandler = this._addDetailsHandler.bind(this);
    this._barCodeDataChangeHandler = this._barCodeDataChangeHandler.bind(this);
    this._quantityReceivedBlurHandler = this._quantityReceivedBlurHandler.bind(this);
    this._itemCostBlurHandler = this._itemCostBlurHandler.bind(this);
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

  _addDetailsHandler() {
    if (parseFloat(this.state.totalCost) === 0) {
      Alert.alert('Error', 'You cannot save an item whose cost is 0.');
      return;
    }

    this.props.addItemLine({
      barCodeData: this.state.barCodeData,
      quantityReceived: this.state.quantityReceived,
      itemCost: this.state.itemCost,
      totalCost: this.state.totalCost
    });

    this.setState({
      displayBarCodeForm: 'none',
      barCodeData: '',
      barCodeItem: {},
      quantityReceived: '0',
      itemCost: '0',
      totalCost: '0'
    });
  }

  _barCodeDataChangeHandler(barCodeData) {
    this.setState(() => ({ barCodeData}), () => {
      const foundBarCode = this.barCodeItems.filter(item => item.barCode === barCodeData)
      if (foundBarCode.length) {
        this.setState({
          displayBarCodeForm: 'flex',
          barCodeItem: foundBarCode[0]
        });
      } else {
        this.setState({ displayBarCodeForm: 'none'})
      }
    })
  }

  _quantityReceivedBlurHandler() {
    const parsedValue = parseInt(this.state.quantityReceived, 10);
    if (parsedValue) {
      this.setState({
        totalCost: parsedValue * parseFloat(this.state.itemCost)
      });
    } else {
      Alert.alert('Error', 'Please provide valid number for the quantity.');
      this._quantityReceived.focus();
    }
  }

  _itemCostBlurHandler() {
    const parsedValue = parseFloat(this.state.itemCost);;
    if (parsedValue) {
      this.setState({
        totalCost: parseInt(this.state.quantityReceived, 10) * parsedValue
      });
    } else {
      Alert.alert('Error', 'Please provide valid number for the item cost.');
      this._itemCost.focus();
    }
  }

  render() {

    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Field value={this.state.barCodeData}
            onChangeText={this._barCodeDataChangeHandler}
            label="Barcode" icon="barcode"
            onPress={() => this.setState({ modalVisible: true })} />

          <Button disabled={Object.keys(this.state.barCodeItem).length ? false : true}
            style={{ marginBottom: 20 }} text="Add details"
            onPress={this._addDetailsHandler} />

          <ScrollView style={{display: this.state.displayBarCodeForm}}>
            <Field label="Item Id" iconMCI="alphabetical" editable={false}
              value={String(this.state.barCodeItem.no)} />

            <Field label="Description" iconMCI="alphabetical" editable={false}
              value={String(this.state.barCodeItem.description)} />

            <Field label="Vendor Id" iconMCI="alphabetical" editable={false}
              value={String(this.state.barCodeItem.vendorId)} />

            {
              params.screen === screen.return ?
                <Field label="Quantity Returned" iconMCI="numeric" keyboardType="numeric" /> :

                  params.screen === screen.receive ?
                    <Field label="Quantity Received" iconMCI="numeric"
                      keyboardType="numeric" reference={qr => this._quantityReceived = qr}
                      value={this.state.quantityReceived}
                      onChangeText={quantityReceived => this.setState({ quantityReceived })}
                      onBlur={this._quantityReceivedBlurHandler} /> :

                      <Field label="Quantity Required" iconMCI="numeric" keyboardType="numeric" />
            }

            <Field label="UoM" iconMCI="alphabetical"
              value={String(this.state.barCodeItem.uom)} editable={false} />

            {
              params.screen !== screen.requisition &&
                <View>
                  <Field label="Item Cost" iconMCI="numeric"
                    reference={iC => this._itemCost = iC} keyboardType="numeric"
                    value={this.state.itemCost}
                    onChangeText={itemCost => this.setState({ itemCost }) }
                    onBlur={this._itemCostBlurHandler} />

                  <Field label="Total Cost" icon="calculator" editable={false}
                    value={String(this.state.totalCost)} />
                </View>
            }
          </ScrollView>

        </View>

        <InfoBar screensRemaining={2} onPress={() => {
            if (this.props.itemLine.itemLines.length) {
              this.props.navigation.navigate('Footer', {
                ...params
              })
            } else if (!this.props.itemLine.itemLines.length) {
              Alert.alert('Error', 'At least specify one item.');
            }
          }}
        />

        { this._renderBarCodeReader() }
      </View>
    );
  }
}

PropTypes.propTypes

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

ItemLine.propTypes = {
  itemLine: PropTypes.object.isRequired,
  addItemLine: PropTypes.func.isRequired
};

export default connect(state => ({
  itemLine: state.itemLine
}), { addItemLine })(ItemLine);
