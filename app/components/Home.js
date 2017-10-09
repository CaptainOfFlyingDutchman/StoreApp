import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

import { screen } from '../constants';

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: 'Home',
    tabBarIcon: ({ tintColor }) => <IconFA name="home" size={26} />
  });

  render() {
    const itemReceiving = 'Store Item Receiving';
    const itemRequisition = 'Store Stock Requisition Form';
    const itemReturn = 'Return Items';

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={
          () => this.props.navigation.navigate('PurchaseHeader', {
            header: itemReceiving, heading: 'Store Goods Receiving Form', screen: screen.receive
          })
        }>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/cats/1/lovely-cats/'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>{itemReceiving}</Text>
            <Text style={styles.itemDetailsSubText}>version 17</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={
          () => this.props.navigation.navigate('ItemLine', {
            header: itemRequisition, heading: itemRequisition, screen: screen.requisition
          })
        }>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/cats/2/lovely-cats/'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>{itemRequisition}</Text>
            <Text style={styles.itemDetailsSubText}>version 11</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={
          () => this.props.navigation.navigate('PurchaseHeader', {
            header: itemReturn, heading: itemReturn, screen: screen.return
          })
        }>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/cats/3/lovely-cats/'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>{itemReturn}</Text>
            <Text style={styles.itemDetailsSubText}>version 12</Text>
          </View>
        </TouchableOpacity>
      </View>
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
