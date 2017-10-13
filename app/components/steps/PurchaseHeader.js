import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet, DatePickerAndroid, Alert } from 'react-native';
import { connect } from 'react-redux';

import Field from '../reusable/Field';
import InfoBar from '../reusable/InfoBar';
import { screen } from '../../constants';
import { formatDate, stringToDate } from '../../utils';
import { next, clearPurchaseHeader } from './PurchaseHeader.actions';
import { clearVendor } from '../reusable/VendorList.actions';

class PurchaseHeader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '',
      referenceNumber: ''
    };

    this._dateHandler = this._dateHandler.bind(this);
  }

  componentWillMount() {
    this.setState({ ...this.props.purchaseHeader });
  }

  componentWillUnmount() {
    this.props.clearVendor();
    this.props.clearPurchaseHeader();
  }

  _dateHandler() {
    DatePickerAndroid.open({ date: stringToDate(this.state.selectedDate), minDate: new Date() })
      .then(({ action, year, month, day }) => {
        if (action === DatePickerAndroid.dateSetAction) {
          this.setState({ selectedDate: formatDate(new Date(year, month, day)) });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.formContainer}>
          <Field value={this.props.purchaseHeader.selectedDate} label="Date" icon="calendar" editable={false}
            onPress={this._dateHandler} />

          <Field onPress={() => this.props.navigation.navigate('VendorsList')}
            label="Vendor Name" icon="list" editable={false}
            value={this.props.vendorList.vendor.Name} />

          <Field label="Vendor Id" iconMCI="alphabetical" editable={false}
            value={this.props.vendorList.vendor.No} />

          <Field reference={rNo => this._referenceNumber = rNo}
            label="Reference No" iconMCI="numeric" value={this.state.referenceNumber}
            onChangeText={(value) => this.setState({ referenceNumber: value })}
            keyboardType='numeric' />

          {
            this.props.navigation.state.params.screen === screen.return &&
            <Field label="Return Reason Code" icon="list" editable={false} />
          }
        </ScrollView>

        <InfoBar screensRemaining={3} onPress={() => {
          if (!this.props.vendorList.vendor.No) {
            Alert.alert('Error', 'Please select the Vendor Name.');
            return;
          }
          if (this.state.referenceNumber === '') {
            Alert.alert('Error', 'Please provide the Reference No.');
            this._referenceNumber.focus();
            return;
          }

          this.props.next({ ...this.state });

          this.props.navigation.navigate('ItemLine', {
            ...this.props.navigation.state.params
          });
        }} />
      </View>
    );
  }
}

PurchaseHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  clearVendor: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  vendorList: PropTypes.object.isRequired,
  purchaseHeader: PropTypes.object.isRequired
};

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

export default connect(state => ({
  vendorList: state.vendorList,
  purchaseHeader: state.purchaseHeader
}), { next, clearVendor, clearPurchaseHeader })(PurchaseHeader);
