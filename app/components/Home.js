import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    tabBarIcon: ({ tintColor }) => <IconFA name="home" size={26} />
  });

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/cats/1/lovely-cats/'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>Store Item Receiving</Text>
            <Text style={styles.itemDetailsSubText}>version 17</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/cats/2/lovely-cats/'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>Store Requisition Form</Text>
            <Text style={styles.itemDetailsSubText}>version 11</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image style={styles.itemImage} source={{uri: 'http://lorempixel.com/120/100/cats/3/lovely-cats/'}} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetailsText}>Return items</Text>
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
