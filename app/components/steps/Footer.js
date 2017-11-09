import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StyleSheet,
  Image, TextInput, Modal } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';

import Sign from '../Sign';
import Field from '../reusable/Field';
import Button from '../reusable/Button';
import InfoBar from '../reusable/InfoBar';
import DateField from '../reusable/DateField';
import { screen } from '../../constants';
import Realm from '../realm';
import { generateUniqueId, capitalize, getNavigationResetAction, formatDateForPost } from '../../utils';
import { updateInvoiceValue } from './ItemLine.actions';
import { addInvoiceReferenceImage, addName, addSignatureImage } from './Footer.actions';
import { clearPurchaseHeader } from './PurchaseHeader.actions';
import { clearItemLine } from './ItemLine.actions';
import { clearFooter } from './Footer.actions';
import { clearVendor } from '../reusable/VendorList.actions';
import { postToServer } from '../../request';

class Footer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header,
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });

  constructor(props) {
    super(props);

    this.state = {
        signatureModalVisible: false,
        cameraModalVisible: false,
        totalInvoiceValue: props.itemLine.totalInvoiceValue,
        invoiceReferenceImagePath: '',
        name: '',
        signatureImagePath: ''
    };

    this._renderSignature = this._renderSignature.bind(this);
    this._renderCamera = this._renderCamera.bind(this);
    this._captureImageHandler = this._captureImageHandler.bind(this);
    this._totalInvoiceChangeHandler = this._totalInvoiceChangeHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  componentWillMount() {
    // We rehydrate the internal state with the redux state so that the elements can show the
    // correct data when the user returns to this screen.
    this.setState({ ...this.props.footer });
  }

  componentWillReceiveProps(nextProps) {
    // this is needed as when user updates the new invoice value it triggers a redux store update
    // as you can see in _totalInvoiceChangeHandler() method. So every time comp receive the props
    // we explicitly set that in the internal state so that the TextInput correctly
    // shows the value. This is also required, as the totalInvoiceValue is calculated in the
    // ItemLine.reducer.js, that is separate from this component.
    this.setState({ totalInvoiceValue: nextProps.itemLine.totalInvoiceValue });
  }

  _submitHandler() {
    const { clearVendor, clearPurchaseHeader, clearItemLine,
      clearFooter, navigation, vendorList,
      purchaseHeader, itemLine, footer } = this.props;
    const setting = Realm.objects('Setting')[0];
    const submissionDate = new Date()
    const submissionId = generateUniqueId(navigation.state.params.screen,
      setting.currentUser.toUpperCase());

    Realm.write(() => {
      Realm.create('AllSubmission', {
        submissionId: submissionId,
        screenType: capitalize(navigation.state.params.screen),
        submissionDate,
      }, true);
    });

    postToServer({
      submissionId,
      transactionType: capitalize(navigation.state.params.screen),
      store: setting.currentUser.toUpperCase(),
      transactionDate: formatDateForPost(submissionDate),
      vendorId: vendorList.vendor.id,
      referenceNumber: purchaseHeader.referenceNumber,
      receiverName: footer.name,
      returnReasonCode: setting.returnReasonCode
    }, itemLine.itemLines, function (httpCode) {
      if (httpCode === 200) {
        console.log(this.responseText);
      }

      clearVendor();
      clearPurchaseHeader();
      clearItemLine();
      clearFooter();

      navigation.dispatch(getNavigationResetAction('Tabs'));
    });
  }

  _captureImageHandler() {
    this._camera.capture()
      .then((result) => {
        this.setState({
          invoiceReferenceImagePath: result.path,
          cameraModalVisible: false
        });
        this.props.addInvoiceReferenceImage(result.path);
      })
      .catch(err => console.error('Couldn\'t capture invoice reference image.'));
  }

  _totalInvoiceChangeHandler(totalInvoiceValue)  {
    this.setState({ totalInvoiceValue });
    this.props.updateInvoiceValue(totalInvoiceValue);
  }

  _renderSignature() {
    return(
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.signatureModalVisible}
          onRequestClose={() =>  this.setState({ signatureModalVisible: false })}>
          <View style={{ flex: 1 }}>
            <View style={styles.modalContainer}>
              <SignatureCapture
                style={{ flex: 1 }}
                ref={sC => this._signatureCapture = sC}
                onSaveEvent={(result) => {
                  this.setState({
                    signatureImagePath: result.pathName,
                    signatureModalVisible: false
                  });
                  this.props.addSignatureImage(result.pathName);
                }}
                saveImageFileInExtStorage={true}
                showNativeButtons={false}
                showTitleLabel={false}
                viewMode={"portrait"}/>
            </View>

            <View style={styles.modalButtonsContainer}>
              <Button text="Save" onPress={() => this._signatureCapture.saveImage()} />
              <Button text="Reset" onPress={() => this._signatureCapture.resetImage()} />
              <Button text="Close" onPress={() =>
                this.setState({ signatureModalVisible: false })} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  _renderCamera() {
    return(
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.cameraModalVisible}
          onRequestClose={() => this.setState({ cameraModalVisible: false })}>
          <View style={{ flex: 1 }}>
            <View style={styles.modalContainer}>
              <Camera
                ref={c => this._camera = c}
                style={{ flex: 1 }}
                aspect={Camera.constants.Aspect.fill} />
            </View>

            <View style={styles.modalButtonsContainer}>
              <Button text="Capture" onPress={this._captureImageHandler} />
              <Button text="Close" onPress={() =>  this.setState({ cameraModalVisible: false })} />
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
        <ScrollView style={styles.formContainer}>
          {
            params.screen !== screen.requisition &&
              <Field label="Total Invoice Value (KWD)" iconMCI="numeric" editable={true}
                value={String(this.state.totalInvoiceValue)}
                onChangeText={this._totalInvoiceChangeHandler} />
          }

          {
            params.screen === screen.receive &&
              <Field label="Invoice Reference Image" icon="picture-o" editable={false}
                value={this.state.invoiceReferenceImagePath}
                onPress={() => this.setState({ cameraModalVisible: true })} />
          }

          {
            params.screen === screen.requisition && <DateField />
          }

          <Field label="Name" iconMCI="alphabetical" value={this.state.name}
            onChangeText={(name) => {
              this.setState({ name });
              this.props.addName(name);
            }} />

          <Field label="Signature" iconMCI="pen" editable={false}
            value={this.state.signatureImagePath}
            onPress={() => this.setState({ signatureModalVisible: true })} />

        </ScrollView>

        <InfoBar text="Submit" screensRemaining={1} onPress={this._submitHandler} />

        { this._renderSignature() }
        { this._renderCamera() }
      </View>
    );
  }
}

Footer.propTypes = {
  purchaseHeader: PropTypes.object.isRequired,
  itemLine: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
  vendorList: PropTypes.object.isRequired,
  dateField: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    margin: 10,
    height: 100
  },
  modalContainer: {
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1, flex: 1
  },
  modalButtonsContainer: {
    margin: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: 'space-around'
  }
});

export default connect(state => ({
  purchaseHeader: state.purchaseHeader,
  itemLine: state.itemLine,
  footer: state.footer,
  vendorList: state.vendorList,
  dateField: state.dateField
}), { updateInvoiceValue, addInvoiceReferenceImage, addName, addSignatureImage,
  clearPurchaseHeader, clearItemLine, clearFooter, clearVendor })(Footer);
