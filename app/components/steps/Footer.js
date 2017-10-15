import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StyleSheet,
  Image, TextInput, Modal, DatePickerAndroid } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';

import Sign from '../Sign';
import Field from '../reusable/Field';
import Button from '../reusable/Button';
import InfoBar from '../reusable/InfoBar';
import { screen } from '../../constants';
import { formatDate, stringToDate } from '../../utils';
import base64 from 'Base64';
import { updateInvoiceValue } from './ItemLine.actions';

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
        selectedDate: formatDate(new Date()),
        totalInvoiceValue: props.itemLine.totalInvoiceValue,
        invoiceReferenceImagePath: ''
    };

    this._renderSignature = this._renderSignature.bind(this);
    this._saveSignatureHandler = this._saveSignatureHandler.bind(this);
    this._signatureSaveEventHandler = this._signatureSaveEventHandler.bind(this);
    this._renderCamera = this._renderCamera.bind(this);
    this._dateHandler = this._dateHandler.bind(this);
    this._captureImageHandler = this._captureImageHandler.bind(this);
    this._totalInvoiceChangeHandler = this._totalInvoiceChangeHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ totalInvoiceValue: nextProps.itemLine.totalInvoiceValue });
  }

  _saveSignatureHandler() {
    this._signatureCapture.saveImage();
    this.setState({ signatureModalVisible: false });
  }

  _signatureSaveEventHandler(result) {
    this.setState({sign:result.encoded});
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      console.log(result);

  }

  _submitHandler() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }

      if (xmlhttp.status === 200) {
        console.log('success', xmlhttp.responseText);
      } else {
        console.warn('error',xmlhttp.responseText);
      }
    };
    let submissionId = '123';
    let SoapEnvelopeNS = 'http://schemas.xmlsoap.org/soap/envelope/';
    let body = '<soap:Envelope xmlns:soap="' + SoapEnvelopeNS + '">' +
      '<soap:Body xmlns:n="urn:microsoft-dynamics-schemas/codeunit/WebInvoice">' +
      '<n:MobPdfMail xmlns="WebInvoiceNS">' +
      '<n:submissionId>'+submissionId+'</n:submissionId>'+
      '</n:MobPdfMail>' +
      '</soap:Body>' +
      '</soap:Envelope>';
    xmlhttp.open('POST', 'http://navserver.baqala.me:9347/Nav9Mob/WS/Bodega%20Grocery%20Company%20LIVE/Codeunit/WebInvoice');
    xmlhttp.setRequestHeader('Content-type', 'text/xml; charset=utf-8');
    xmlhttp.setRequestHeader('Content-length', body.length);
    xmlhttp.setRequestHeader('SOAPAction', 'MobPdfMail');
    xmlhttp.setRequestHeader('Authorization', "Basic " + base64.btoa("Test:123@Test"));
    xmlhttp.send(body);


    this.props.navigation.navigate('Home', {
      ...this.props.navigation.state.params
    });
  }

  _captureImageHandler() {
    this._camera.capture()
      .then((result) => {
        this.setState({
          invoiceReferenceImagePath: result.path,
          cameraModalVisible: false
        });
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
                onSaveEvent={this._signatureSaveEventHandler}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                viewMode={"portrait"}/>
            </View>

            <View style={styles.modalButtonsContainer}>
              <Button text="Save" onPress={this._saveSignatureHandler} />
              <Button text="Reset" onPress={() => this._signatureCapture.resetImage()} />
              <Button text="Close" onPress={() =>  this.setState({ signatureModalVisible: false })} />
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

  _dateHandler() {
    DatePickerAndroid.open({ date: stringToDate(this.state.selectedDate), minDate: new Date() })
      .then(({ action, year, month, day }) => {
        if (action === DatePickerAndroid.dateSetAction) {
          this.setState({ selectedDate: formatDate(new Date(year, month, day)) });
        }
      })
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
            params.screen === screen.requisition &&
            <Field value={this.state.selectedDate} label="Date" icon="calendar" editable={false}
              onPress={this._dateHandler} />
          }

          <Field label="Name" iconMCI="alphabetical" />
          <Field label="Signature" iconMCI="pen" editable={false}
            onPress={() => this.setState({ signatureModalVisible: true })} />

        </ScrollView>

        <InfoBar text="Submit" screensRemaining={1} onPress={() => this._submitHandler()} />

        { this._renderSignature() }
        { this._renderCamera() }
      </View>
    );
  }
}

Footer.propTypes = {
  purchaseHeader: PropTypes.object.isRequired,
  itemLine: PropTypes.object.isRequired
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
  itemLine: state.itemLine
}), { updateInvoiceValue })(Footer);
