import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { getNavigationResetAction } from '../utils';

import Button from './reusable/Button';
import Realm from './realm';
import { syncData } from './realm/sync';

class SignIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      signInButtonDisabled: true,
      showPassword: false,
      email: '',
      password: ''
    };

    this._showPassword = this._showPassword.bind(this);
    this._textBoxHandler = this._textBoxHandler.bind(this);
    this._signInHandler = this._signInHandler.bind(this);
  }

  componentWillMount() {
    let setting = Realm.objects('Setting');
    if(setting.length && setting[0].currentUser != '') {
      this.props.navigation.dispatch(getNavigationResetAction('Tabs'));
    }
  }

  componentDidMount() {
    const stores = Realm.objects('Location');
    if (!stores.length) {
      syncData()
        .then(() => this.setState({ signInButtonDisabled: false }))
        .catch(reason => {
          if (typeof reason === "object") {
            Alert.alert('Error in syncing', 'Sorry, we encountered some problem while connecting ' +
              'to the Syncing Server. Please try again later.');
          } else {
            Alert.alert('Error in syncing', reason);
          }
          this.setState({ signInButtonDisabled: false });
        });
    } else {
      this.setState({ signInButtonDisabled: false });
    }
  }

  _showPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  _textBoxHandler(inputType, value) {
    this.setState({ [inputType]: value });
  }

  _signInHandler() {
    const { email, password } = this.state;
    const filter = `name=="${email.toUpperCase()}" AND password=="${password}"`;
    const user = Realm.objects('Location').filtered(filter);

    if (!user.length) {
      Alert.alert('Error in Login', 'Please provide email or password or both.');
      return;
    }
    else {
      try {
        const setting = Realm.objects('Setting');
        if (!setting.length) {
          Realm.write(() => {
            Realm.create('Setting', {
              navUrl: '',
              navUser: '',
              navPassword: '',
              currentUser: email
            }, true);
          });
        } else {
          Realm.write(() => {
            setting[0].currentUser = email;
          });
        }
      } catch (e) {
        console.log(e);
      }
      this.props.navigation.dispatch(getNavigationResetAction('Tabs'));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.itemImage} source={require('./img/logo.png')} />
        </View>
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
          <Button onPress={this._signInHandler}
            text={ this.state.signInButtonDisabled ? "Syncing..." : "Sign In"}
            disabled={this.state.signInButtonDisabled} />
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
  logoContainer: {
    marginBottom: 50,
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
  },
  itemImage: {
    width: 300,
    height: 100
  }
});

export default SignIn;

