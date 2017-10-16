import React, { Component } from 'react';
import { DatePickerAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate, stringToDate } from '../../utils';
import { setDate } from './DateField.actions';

import Field from './Field';

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: ''
    };

    this._dateHandler = this._dateHandler.bind(this);
  }

  componentWillMount() {
    this.setState({ ...this.props.dateField });
  }

  _dateHandler() {
    DatePickerAndroid.open({ date: stringToDate(this.state.selectedDate), minDate: new Date() })
      .then(({ action, year, month, day }) => {
        if (action === DatePickerAndroid.dateSetAction) {
          this.setState({ selectedDate: formatDate(new Date(year, month, day)) });
          this.props.setDate(formatDate(new Date(year, month, day)));
        }
      });
  }

  render() {
    return (
      <Field value={this.props.dateField.selectedDate} label="Date"
        icon="calendar" editable={false} onPress={this._dateHandler} />
    );
  }
}

DateField.propTypes = {
  dateField: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired
};

export default connect(state => ({
  dateField: state.dateField
}), { setDate })(DateField);
