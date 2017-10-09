import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TouchableHighlight, Image, TextInput } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import SignatureCapture from 'react-native-signature-capture';

class Sign extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Sign',
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });
  constructor(props) {
      super(props);

      this.state = {
          sign: {}
      };
    this.saveSign = this.saveSign.bind(this);
    this.resetSign = this.resetSign.bind(this);
    this._onDragEvent = this._onDragEvent.bind(this);
    this._onSaveEvent = this._onSaveEvent.bind(this);
  }
  saveSign() {
    this.refs["sign"].saveImage();
  }
  resetSign() {
      this.refs["sign"].resetImage();
  }
  _onSaveEvent(result) {
    this.setState({sign:result.encoded});
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      console.log(result);
  }
  _onDragEvent() {
       // This callback will be called when the user enters signature
      console.log("dragged");
  }
    render() {
      return (
        <View style={{ flex: 1, flexDirection: "column" }}>
          <SignatureCapture
              style={[{flex:1},styles.signature]}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"}/>

            <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableHighlight style={styles.buttonStyle}
                    onPress={() => { this.saveSign() } } >
                    <Text>Save</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonStyle}
                    onPress={() => { this.resetSign() } } >
                    <Text>Reset</Text>
                </TouchableHighlight>

             </View>
        <View>
        <Image  source={this.state.sign} />

        </View>

    </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    buttonContainer: {
      backgroundColor: 'blue',
      borderRadius: 5,
    },
    signature: {
      flex: 1,
      borderColor: '#000033',
      borderWidth: 1,
  },
  buttonStyle: {
      flex: 1, justifyContent: "center", alignItems: "center", height: 50,
      backgroundColor: "#eeeeee",
      margin: 10
  }
  });

  export default Sign;