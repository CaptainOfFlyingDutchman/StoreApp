import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Realm from '../realm';
import { getNavigationResetAction } from '../../utils';
import { clearPurchaseHeader } from '../steps/PurchaseHeader.actions';
import { clearItemLine } from '../steps/ItemLine.actions';
import { clearFooter } from '../steps/Footer.actions';
import { clearVendor } from '../reusable/VendorList.actions';
import { clearDate } from '../reusable/DateField.actions';

const logoutHandler = (navigation, clearVendorAction, clearPurchaseHeaderAction,
  clearItemLineAction, clearFooterAction, clearDateAction) => {
  clearVendorAction();
  clearPurchaseHeaderAction();
  clearItemLineAction();
  clearFooterAction();
  clearDateAction();

  const setting = Realm.objects('Setting');
  Realm.write(() => {
    setting[0].currentUser = '';
    navigation.dispatch(getNavigationResetAction('SignIn'));
  });
};

/* eslint-disable react/prefer-stateless-function */
class HeaderRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Settings')}>
          <IconMCI name="settings" size={26} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() =>
          logoutHandler(this.props.navigation, this.props.clearVendor,
            this.props.clearPurchaseHeader, this.props.clearItemLine,
            this.props.clearFooter, this.props.clearDate)}>
          <IconMCI name="logout" size={26} />
        </TouchableOpacity>
      </View>
    );
  }
}

HeaderRight.propTypes = {
  navigation: PropTypes.object.isRequired,
  clearVendor: PropTypes.func.isRequired,
  clearPurchaseHeader: PropTypes.func.isRequired,
  clearItemLine: PropTypes.func.isRequired,
  clearFooter: PropTypes.func.isRequired,
  clearDate: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 20
  }
});

export default connect(null, {
  clearPurchaseHeader,
  clearItemLine,
  clearFooter,
  clearVendor,
  clearDate
})(HeaderRight);
