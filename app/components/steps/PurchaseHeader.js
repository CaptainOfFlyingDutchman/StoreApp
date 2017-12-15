import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

import Realm from '../realm';
import Field from '../reusable/Field';
import InfoBar from '../reusable/InfoBar';
import DateField from '../reusable/DateField';
import { screen } from '../../constants';
import { next, clearPurchaseHeader, setReferenceNumber } from './PurchaseHeader.actions';
import { clearItemLine } from './ItemLine.actions';
import { clearFooter } from './Footer.actions';
import { clearVendor } from '../reusable/VendorList.actions';
import { clearDate } from '../reusable/DateField.actions';

class PurchaseHeader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  constructor(props) {
    super(props);
    this._setting = Realm.objects('Setting')[0]

    this.state = {
      referenceNumber: '',
      returnReasonCode: this._setting ? this._setting.returnReasonCode : '',
    };
  }

  componentWillMount() {
    // We rehydrate the internal state with the redux state so that the elements can show the
    // correct data when the user returns to this screen.
    this.setState({ ...this.props.purchaseHeader });
  }

  componentWillUnmount() {
    // this.props.clearVendor();
    // this.props.clearPurchaseHeader();
    // this.props.clearItemLine();
    // this.props.clearFooter();
    // this.props.clearDate();
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.formContainer}>
          <DateField />

          <Field onPress={() => this.props.navigation.navigate('VendorsList')}
            label="Vendor Name *" icon="list" editable={false}
            value={this.props.vendorList.vendor.name} />

          <Field label="Vendor Id *" iconMCI="alphabetical" editable={false}
            value={this.props.vendorList.vendor.id} />

          <Field reference={rNo => this._referenceNumber = rNo}
            label={`${params.screen === screen.return ? 'Cr. Memo No *' :
            params.screen === screen.receive ? 'Invoice No *' : 'Reference No *' }`}
            iconMCI="alphabetical" value={this.state.referenceNumber}
            onChangeText={(referenceNumber) => {
              this.setState({ referenceNumber });
              this.props.setReferenceNumber(referenceNumber)
            }} />

          {
            this.props.navigation.state.params.screen === screen.return &&
            <Field label="Return Reason Code *" icon="list" editable={false}
              value={this.state.returnReasonCode} />
          }
        </ScrollView>

        <InfoBar screensRemaining={3} onPress={() => {
          if (!this.props.vendorList.vendor.id) {
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
  next: PropTypes.func.isRequired,
  purchaseHeader: PropTypes.object.isRequired,
  vendorList: PropTypes.object.isRequired,
  setReferenceNumber: PropTypes.func.isRequired,
  clearVendor: PropTypes.func.isRequired,
  clearPurchaseHeader: PropTypes.func.isRequired,
  clearItemLine: PropTypes.func.isRequired,
  clearFooter: PropTypes.func.isRequired,
  clearDate: PropTypes.func.isRequired
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
}), { next,
  clearPurchaseHeader, clearItemLine, clearFooter,
  clearVendor, clearDate, setReferenceNumber })(PurchaseHeader);
