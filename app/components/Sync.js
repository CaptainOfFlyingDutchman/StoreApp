import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import base64 from 'Base64';
import moment from 'moment';

import Realm from './realm';
import Button from './reusable/Button';
import HeaderRight from './reusable/HeaderRight';
import { syncData, syncItem } from './realm/sync';

class Sync extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <HeaderRight navigation={navigation} />,
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });

  constructor(props) {
    super(props);

    this.state = {
      syncButtonDisabled: false,
      lastSynced: 'Never'
    };

    this._syncData = this._syncData.bind(this);
    this._syncErrorHandler = this._syncErrorHandler.bind(this);
  }

  componentDidMount() {
    const syncTime = Realm.objects('SyncTime');
    if (syncTime.length) {
      this.setState({ lastSynced: moment(syncTime[0].lastSynced).fromNow()})
    }
  }

  _writeSyncTimeToRealm() {
    const lastSyncTime = new Date();

    Realm.write(() => {
      Realm.delete(Realm.objects('SyncTime'));

      Realm.create('SyncTime', {
        lastSynced: lastSyncTime.getTime()
      }, true);
    });
  }

  _syncErrorHandler(reason) {
    if (typeof reason === "object") {
      Alert.alert('Error in syncing', 'Sorry, we encountered some problem while connecting ' +
        'to the Syncing Server. Please try again later.');
    } else {
      Alert.alert('Error in syncing', reason);
    }
    this.setState({ syncButtonDisabled: false });
  }

  _syncData() {
    syncData({ vendor: true })
      .then(() => {
        this._writeSyncTimeToRealm();

        syncItem(null, (error) => {
          if (!error) {
            this._writeSyncTimeToRealm();

            const lastSyncTime = new Date();
            this.setState({
              syncButtonDisabled: false,
              lastSynced: moment(lastSyncTime).fromNow()
            });
          } else {
            this._syncErrorHandler(error);
          }
        });
      })
      .catch(this._syncErrorHandler);
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

        <Text style={styles.syncText}>Last Sync: <Text>{this.state.lastSynced}</Text></Text>
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
