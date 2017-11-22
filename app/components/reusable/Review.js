import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

import Button from '../reusable/Button';
import Realm from '../realm';
import { generateUniqueId, capitalize, getNavigationResetAction,
  formatDateForPost, stringToDate } from '../../utils';
import { clearPurchaseHeader } from '../steps/PurchaseHeader.actions';
import { clearItemLine } from '../steps/ItemLine.actions';
import { clearFooter } from '../steps/Footer.actions';
import { clearVendor } from '../reusable/VendorList.actions';
import { postToServer } from '../../request';

class Review extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review',
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });

  constructor(props) {
    super(props);

    const { clearVendor, clearPurchaseHeader, clearItemLine,
      clearFooter, navigation, vendorList,
      purchaseHeader, itemLine, footer, dateField } = this.props;
    const setting = Realm.objects('Setting')[0];
    const submissionDate = stringToDate(dateField.selectedDate);
    const submissionId = generateUniqueId(navigation.state.params.screen,
      setting.currentUser.toUpperCase());
    const headerData = {
      submissionId,
      transactionType: capitalize(navigation.state.params.screen),
      store: setting.currentUser.toUpperCase(),
      transactionDate: formatDateForPost(submissionDate),
      vendorId: vendorList.vendor.id,
      referenceNumber: purchaseHeader.referenceNumber,
      receiverName: footer.name,
      returnReasonCode: setting.returnReasonCode,
      invoiceReferenceImage: footer.invoiceReferenceImage,
      signatureImage: footer.signatureImage,
    };

    this.state = {
      headerData
    };

    this._submitHandler = this._submitHandler.bind(this);
  }

  _submitHandler() {
    const { clearVendor, clearPurchaseHeader, clearItemLine, clearFooter, navigation } = this.props;

    postToServer(this.state.headerData, this.props.itemLine.itemLines, function (httpCode) {
      if (httpCode === 200) {
        clearVendor();
        clearPurchaseHeader();
        clearItemLine();
        clearFooter();

        navigation.dispatch(getNavigationResetAction('Tabs'));
        Alert.alert('Success', 'Submission completed. Please check History tab.');
      } else {
        Alert.alert('Error',
          'We are facing some issue when saving the information. Please try again later.\n\n' + this.responseText);
      }
    }, () => {
      Realm.write(() => {
        Realm.create('AllSubmission', {
          submissionId: this.state.headerData.submissionId,
          screenType: capitalize(this.props.navigation.state.params.screen),
          submissionDate: new Date(),
        }, true);
      });
    });
  }

  _renderCard(heading, value, i) {
    return (
      <View style={styles.textContainer} key={i}>
        <Text style={styles.textHeading}>{heading}</Text>
        <Text style={styles.textValue}>{value}</Text>
      </View>
    );
  }

  render() {
    const { submissionId, transactionType, store, transactionDate,
      vendorId, referenceNumber, receiverName, returnReasonCode,
      invoiceReferenceImage, signatureImage } = this.state.headerData;

    const dataToRender = {
      'Submission ID': submissionId,
      'Transaction Type': transactionType,
      'Store': store,
      'Transaction Date': transactionDate,
      'Vendor Name': this.props.vendorList.vendor.name,
      'Vendor Id': vendorId,
      'Reference Number': referenceNumber,
      'Receiver Name': receiverName,
      'Return Reason Code': returnReasonCode,
      'Invoice Reference Image': this.props.footer.invoiceReferenceImagePath,
      'Signature Image': this.props.footer.signatureImagePath
    }

    return (
      <View style={styles.container}>
        <ScrollView>
        {
          Object.keys(dataToRender).map((key, i) => this._renderCard(key, dataToRender[key], i))
        }
        </ScrollView>
        <View style={{ padding: 10 }}>
          <Button text="Submit" onPress={this._submitHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    marginBottom: 2,
    backgroundColor: 'white',
    padding: 10
  },
  textHeading: {
    fontSize: 18,
    marginBottom: 10
  },
  textValue: {
    fontSize: 12
  }
});

Review.propTypes = {
  purchaseHeader: PropTypes.object.isRequired,
  itemLine: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
  vendorList: PropTypes.object.isRequired,
  dateField: PropTypes.object.isRequired
};

export default connect(state => ({
  purchaseHeader: state.purchaseHeader,
  itemLine: state.itemLine,
  footer: state.footer,
  vendorList: state.vendorList,
  dateField: state.dateField
}), { clearPurchaseHeader, clearItemLine, clearFooter, clearVendor })(Review);
