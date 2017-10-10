import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TextInput, Modal } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';

import Sign from '../Sign';
import Field from '../reusable/Field';
import Button from '../reusable/Button';
import { screen } from '../../constants';

class Footer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header,
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });

  constructor(props) {
    super(props);

    this.state = {
        modalVisible: false
    };

    this._renderSign = this._renderSign.bind(this);
    this._showSign = this._showSign.bind(this);
    this._saveSignHandler = this._saveSignHandler.bind(this);
    this._resetSignHandler = this._resetSignHandler.bind(this);
    this._onDragEventHandler = this._onDragEventHandler.bind(this);
    this._onSaveEventHandler = this._onSaveEventHandler.bind(this);
  }

  _saveSignHandler() {
    this.refs["sign"].saveImage();
    this._showSign(false);
  }

  _resetSignHandler() {
    this.refs["sign"].resetImage();
  }

  _onSaveEventHandler(result) {
    this.setState({sign:result.encoded});
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      console.log(result);

  }

  _onDragEventHandler() {
       // This callback will be called when the user enters signature
      console.log("dragged");
  }

  _showSign(modalVisible){
    this.setState({ modalVisible });
  }

  _renderSign() {
    return(
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Signature pad closed")}}>
          <View style={{ flex: 1 }}>
            <View style={{margin: 10, borderColor: 'gray',  borderWidth: 1, flex: 1}}>
              <SignatureCapture
                style={{ flex: 1 }}
                ref="sign"
                onSaveEvent={this._onSaveEventHandler}
                onDragEvent={this._onDragEventHandler}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                viewMode={"portrait"}/>
            </View>

            <View style={{ margin: 10, marginBottom: 20, flexDirection: "row", justifyContent: 'space-around' }}>
              <Button text="Save" onPress={this._saveSignHandler} />
              <Button text="Reset" onPress={this._resetSignHandler} />
              <Button text="Close" onPress={() =>  this._showSign(false)} />
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
            params.screen === screen.receive &&
              <View>
                <Field label="Total Invoice Value (KWD)" iconMCI="numeric" />
                <Field label="Invoice Reference Image" icon="picture-o" editable={false} />
              </View>
          }

          {
            params.screen === screen.return &&
              <Field label="Total Return Value (KWD)" iconMCI="numeric" />
          }

          {
            params.screen === screen.requisition &&
              <Field label="Date" icon="calendar" editable={false} />
          }

          <Field label="Name" iconMCI="alphabetical" />
          <Field label="Signature" iconMCI="pen" editable={false} onPress={() => this._showSign(true)} />

        </ScrollView>

        { this._renderSign() }
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

export default Footer;
