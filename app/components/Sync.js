import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import base64 from 'Base64';

import Realm from './realm';
import Button from './reusable/Button';
import HeaderRight from './reusable/HeaderRight';
import { syncData } from './realm/sync';

class Sync extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <HeaderRight navigation={navigation} />,
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });

  constructor(props) {
    super(props);

    this.state = {
        setting: Realm.objects('Setting'),
        syncButtonDisabled: false,
    };

    this._syncData = this._syncData.bind(this);
  }

  _syncData() {
    syncData().then(result => this.setState({ syncButtonDisabled: false }));
  }

  render() {
    return (
      <View style={styles.container}>
        <IconFA name="cloud" size={100} />

        <Button
          styleText={{
            padding: 25,
            paddingLeft: 50,
            paddingRight: 50,
          }}
          disabled={this.state.syncButtonDisabled}
          text={ this.state.syncButtonDisabled ? "Syncing..." : "Tap to Sync"}
          onPress={() => {
            this.setState({ syncButtonDisabled: true });
            this._syncData();
          }} />

        <Text style={styles.syncText}>Last Sync: <Text>7</Text> hours ago</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  syncText: {
    marginTop: 10,
    fontSize: 20
  }
});

export default Sync;
