import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

class History extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'History',
    tabBarIcon: () => <IconFA name="history" size={26} />
  });


  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 5}}>
          <Text style={{fontSize: 16}}>Date: <Text>03/10/2017</Text> to <Text>03/10/2017</Text></Text>
          <Text style={{fontSize: 16}}>Apps: <Text>All Apps</Text></Text>
        </View>
        <TouchableOpacity style={styles.item}>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/food/1'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>Store Item Receiving</Text>
            <Text style={styles.itemDetailsSubText}>8978qagag979jal231jljg</Text>
            <Text style={styles.itemDetailsSubText}>submitted: <Text>16</Text> hours ago (version 17)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/food/2'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>Store Requisition Form</Text>
            <Text style={styles.itemDetailsSubText}>version 11</Text>
            <Text style={styles.itemDetailsSubText}>submitted: <Text>16</Text> hours ago (version 17)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/food/3'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>Return items</Text>
            <Text style={styles.itemDetailsSubText}>version 12</Text>
            <Text style={styles.itemDetailsSubText}>submitted: <Text>16</Text> hours ago (version 17)</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5
  },
  item: {
    margin: 5,
    marginTop: 0,
    paddingBottom: 5,
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

export default History;
