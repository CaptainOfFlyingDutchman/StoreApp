import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

import { screen } from '../constants';
import HeaderRight from './reusable/HeaderRight';

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <HeaderRight navigation={navigation} />,
    tabBarIcon: ({ tintColor }) => <IconFA name="home" size={26} />
  });

  render() {
    const itemReceiving = 'Item Receiving';
    const itemRequisition = 'Item Requisition';
    const itemReturn = 'Item Return';

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={
          () => this.props.navigation.navigate('PurchaseHeader', {
            header: itemReceiving, heading: 'Store Goods Receiving Form', screen: screen.receive
          })
        }>
          <Image style={styles.itemImage} source={require('./img/receive.png')} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>{itemReceiving}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={
          () => this.props.navigation.navigate('ItemLine', {
            header: itemRequisition, heading: itemRequisition, screen: screen.requisition
          })
        }>
          <Image style={styles.itemImage} source={require('./img/requisition.png')} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>{itemRequisition}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={
          () => this.props.navigation.navigate('PurchaseHeader', {
            header: itemReturn, heading: itemReturn, screen: screen.return
          })
        }>
          <Image style={styles.itemImage} source={require('./img/return.png')} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>{itemReturn}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  item: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  itemImage: {
    width: 120,
    height: 100
  },
  itemDetailsContainer: {
    marginLeft: 10
  },
  itemDetailsText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  itemDetailsSubText: {
    fontSize: 16
  }
});

export default Home;
