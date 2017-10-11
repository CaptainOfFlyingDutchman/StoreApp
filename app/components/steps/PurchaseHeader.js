import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput,
  StyleSheet, DatePickerAndroid } from 'react-native';

import Button from '../reusable/Button';
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
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.formContainer}>
          <Field value={this.state.selectedDate} label="Date" icon="calendar" editable={false}
            onPress={this._dateHandler} />
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
