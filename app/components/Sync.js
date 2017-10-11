import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Realm from './realm';
import base64 from 'Base64';

class Sync extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: 'Sync',
    tabBarIcon: () => <IconFA name="cloud" size={22} />
  });

  constructor(props) {
    super(props);

    this.state = {
        setting: Realm.objects('Setting'),
    };
    this._syncData = this._syncData.bind(this);
  }

  _syncData() {
    let setting = Realm.objects('Setting');
    console.info(JSON.stringify(setting));
    let credential = "Test:123@Test";
    let navUrl = "http://navserver.baqala.me:9348/Nav9Mob/OData/Company('Bodega Grocery Company LIVE')/";
    if(setting.navUrl) {
      navUrl = setting.navUrl;
    }
    if(setting.navUser) {
      credential = setting.navUser +":"+setting.navPassword
    }
    console.log(`navUrlnavUrlnavUrlnavUrl ${navUrl}`);
    console.log(`credentialcredentialcredential ${credential}`);
  //Settings
    fetch(navUrl+'CompanySetting'+'?$format=json',
    {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Basic " + base64.btoa(credential)
  }}).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      responseJson.value.map((dataItem)=>{
          try {
            Realm.write(() => {
                Realm.create('Setting', {
                  navUrl: dataItem.navUrl,
                  navUser: dataItem.navUser,
                  navPassword: dataItem.navPassword,
                  currentUser:''
                },true);
              });
            }catch(e) {
              console.log(e);
            }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    //Vendors
    fetch(navUrl+'Vendors'+'?$format=json',
      {
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Basic " + base64.btoa(credential)
    }}).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        responseJson.value.map((dataItem)=>{
            try {
              Realm.write(() => {
                  Realm.create('Vendor', {
                    Id: dataItem.No,
                    Name: dataItem.Name,
                  },true);
                });
              }catch(e) {
                console.log(e);
              }
          });
        })
        .catch((error) => {
          console.log(error);
        });

  //Location
  fetch(navUrl+'Stores'+'?$format=json',
    {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Basic " + base64.btoa(credential)
  }}).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      responseJson.value.map((dataItem)=>{
          try {
            Realm.write(() => {
                Realm.create('Location', {
                  Id: dataItem.POS_Department_ID,
                  Name: dataItem.Location_Code,
                  Password: dataItem.Password
                },true);
              });
            }catch(e) {
              console.log(e);
            }
        });
      })
      .catch((error) => {
        console.log(error);
      });

  //Item
  fetch(navUrl+'Barcodes'+'?$format=json',
    {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Basic " + base64.btoa(credential)
  }}).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      responseJson.value.map((dataItem)=>{
          try {
            Realm.write(() => {
                Realm.create('Item', {
                  barcode: dataItem.Bar_Code,
                  No: dataItem.Item_No,
                  description: dataItem.Description,
                  unitCost: Number.parseFloat(dataItem.Unit_Cost),
                  vendorId: dataItem.Vendor_No,
                  vendorName:''
                },true);
              });
            }catch(e) {
              console.log(e);
            }
        });
      })
      .catch((error) => {
        console.log(error);
      });

}
  render() {
    return (
      <View style={styles.container}>
        <IconFA name="cloud" size={100} />
        <TouchableOpacity style={styles.buttonContainer} onPress={
          () => this._syncData()} >
          <Text style={styles.buttonText}>Tap to Sync</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    padding: 25,
    paddingLeft: 50,
    paddingRight: 50,
    color: 'white',
    fontSize: 18
  },
  syncText: {
    marginTop: 10,
    fontSize: 20
  }
});

export default Sync;
