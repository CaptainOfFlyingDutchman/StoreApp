import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TouchableHighlight, Image, TextInput } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Sign from '../Sign';

class Footer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header,
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });
  constructor(props) {
    super(props);

    this.state = {
        sign: {}
    };
    this._openSign = this._openSign.bind(this);
  }

  _openSign() {
    this.props.navigation.navigate('Sign');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableHighlight style={styles.buttonStyle}
              onPress={() => { this._openSign() } } >
              <Text>Sign</Text>
          </TouchableHighlight>
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

  export default Footer;