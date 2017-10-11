import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

import Button from './reusable/Button';

const resetNavigationAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Tabs' })
  ]
});

class SignIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      email: '',
      password: ''
    };

    this._showPassword = this._showPassword.bind(this);
    this._textBoxHandler = this._textBoxHandler.bind(this);
    this._signInHandler = this._signInHandler.bind(this);
  }

  componentWillMount() {
    // TODO:Vishram if user is logged in already then uncomment following code
    // this.props.navigation.dispatch(resetNavigationAction);
  }

  _showPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  _textBoxHandler(inputType, value) {
    this.setState({ [inputType]: value });
  }

  _signInHandler() {
    const { email, password } =  this.state;
    if (!email || !password) {
      Alert.alert('Error in Login', 'Please provide email or password or both.');
      return;
    }
    this.props.navigation.dispatch(resetNavigationAction);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.emailContainer}>
          <TextInput
            style={[styles.email, styles.textBox]}
            placeholder="Email"
            underlineColorAndroid="transparent"
            value={this.state.email}
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={email => this._textBoxHandler('email', email)} />
        </View>

        <View style={styles.passwordContainer}>
          {
            !this.state.showPassword ?
              <TextInput
                style={[styles.password, styles.textBox]}
                placeholder="Password"
                underlineColorAndroid="transparent"
                secureTextEntry
                value={this.state.password}
                autoCorrect={false}
                onChangeText={password => this._textBoxHandler('password', password)} /> :
              <TextInput
                style={[styles.password, styles.textBox]}
                placeholder="Password"
                underlineColorAndroid="transparent"
                value={this.state.password}
                autoCorrect={false}
                onChangeText={password => this._textBoxHandler('password', password)} />
          }
          <TouchableOpacity style={styles.showButton} onPress={this._showPassword}>
            {
              !this.state.showPassword ?
                <IconFA name="eye-slash" size={28} /> :
                <IconFA name="eye" size={28} />
            }
          </TouchableOpacity>
        </View>

        <View>
          <Button onPress={this._signInHandler} text="Sign In" />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  emailContainer: {
    marginBottom: 10,
    borderColor: 'lightgray',
    borderWidth: 1
  },
  email: {
    width: 300
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    borderColor: 'lightgray',
    borderWidth: 1
  },
  password: {
    width: 265
  },
  textBox: {
    padding: 10,
    fontSize: 18
  },
  showButton: {
    marginRight: 10
  }
});

export default SignIn;

