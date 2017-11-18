import React, { Component } from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform, Modal, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate, stringToDate } from '../../utils';
import { setDate } from './DateField.actions';
import Button from './Button';
import Field from './Field';

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '',
      dateModalVisible: false
    };

    this._dateHandler = this._dateHandler.bind(this);
    this._renderDatePickerIOS = this._renderDatePickerIOS.bind(this);
  }

  componentWillMount() {
    this.setState({ ...this.props.dateField });
  }

  _dateHandler() {
    if (Platform.OS === 'android') {
      DatePickerAndroid.open({ date: stringToDate(this.state.selectedDate), minDate: new Date() })
        .then(({ action, year, month, day }) => {
          if (action === DatePickerAndroid.dateSetAction) {
            this.setState({ selectedDate: formatDate(new Date(year, month, day)) });
            this.props.setDate(formatDate(new Date(year, month, day)));
          }
        });
    }
  }

  _renderDatePickerIOS() {
    return (
      <View>
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.dateModalVisible}
        onRequestClose={() => this.setState({ dateModalVisible: false })}>
        <View style={{ flex: 1 }}>
          <View>
            <DatePickerIOS date={stringToDate(this.state.selectedDate)} onDateChange={(date) => {
                this.setState({
                  selectedDate: formatDate(new Date(date)),
                  dateModalVisible: false
                });
                this.props.setDate(formatDate(new Date(date)));
              }} />
          </View>

          <View style={{ margin: 10 }}>
            <Button text="Close" onPress={() => this.setState({ dateModalVisible: false })} />
          </View>
        </View>
      </Modal>
      </View>
    );
  }

  render() {
    // if (Platform.OS === 'android') {
    return (
      <View>
        <Field value={this.props.dateField.selectedDate} label="Date"
          icon="calendar" editable={false} onPress={() => {
            if (Platform.OS === 'android') {
              this._dateHandler();
            } else {
              this.setState({ dateModalVisible: true });
            }
          }} />
        { this._renderDatePickerIOS() }
      </View>
    );
    // }

    // return (
    //   <Field value={this.props.dateField.selectedDate} label="Date"
    // );
  }
}

DateField.propTypes = {
  dateField: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired
};

export default connect(state => ({
  dateField: state.dateField
}), { setDate })(DateField);