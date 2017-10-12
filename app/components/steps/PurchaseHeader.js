import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet, DatePickerAndroid } from 'react-native';

import { connect } from 'react-redux';
import { next } from './PurchaseHeader.actions';

import Field from '../reusable/Field';
import InfoBar from '../reusable/InfoBar';
import { screen } from '../../constants';
import { formatDate, stringToDate } from '../../utils';

class PurchaseHeader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: formatDate(new Date())
    };

    this._dateHandler = this._dateHandler.bind(this);
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
          <Field value={this.state.selectedDate} label="Date" icon="calendar" editable={false}
            onPress={this._dateHandler} />

          <Field onPress={() => this.props.navigation.navigate('VendorsList')}
            label="Vendor Name" icon="list" editable={false}
            value={this.props.vendorList.vendor.Name} />

          <Field label="Vendor Id" iconMCI="alphabetical" editable={false}
            value={this.props.vendorList.vendor.No} />
          <Field label="Reference No" iconMCI="alphabetical" />
          {
            this.props.navigation.state.params.screen === screen.return &&
            <Field label="Return Reason Code" icon="list" editable={false} />
          }
        </ScrollView>

        <InfoBar screensRemaining={3} onPress={() => {
          this.props.next({
            selectedDate: this.state.selectedDate,
          });

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
  vendorList: PropTypes.object.isRequired
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
  vendorList: state.vendorList
}), { next })(PurchaseHeader);
