import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

import Button from '../reusable/Button';
import { progressBarPercentage, progressBarWidth } from '../../utils';

class PurchaseHeader extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.header
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>

          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.fieldContainer}>
              <TextInput style={styles.field} editable={false} underlineColorAndroid="transparent" />
              <IconFA style={styles.fieldIcon} name="calendar" size={24} color="#000"/>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Vendor Name</Text>
            <View style={styles.fieldContainer}>
              <TextInput style={styles.field} editable={false} underlineColorAndroid="transparent" />
              <IconFA style={styles.fieldIcon} name="list" size={24} color="#000"/>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Vendor Id</Text>
            <View style={styles.fieldContainer}>
              <TextInput style={styles.field} underlineColorAndroid="transparent" />
              <IconFA style={styles.fieldIcon} name="font" size={24} color="#000"/>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Vendor Memo No</Text>
            <View style={styles.fieldContainer}>
              <TextInput style={styles.field} underlineColorAndroid="transparent" />
              <IconFA style={styles.fieldIcon} name="font" size={24} color="#000"/>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Return Reason Code</Text>
            <View style={styles.fieldContainer}>
              <TextInput style={styles.field} editable={false} underlineColorAndroid="transparent" />
              <IconFA style={styles.fieldIcon} name="list" size={24} color="#000"/>
            </View>
          </View>

        </View>

        <View style={styles.infoContainer}>
          <View style={styles.progressBarContainer} >
            <View style={styles.progressBar}>
              <Text style={styles.progressBarText}>{progressBarPercentage()}%</Text>
            </View>
          </View>

          <Button text="Next" onPress={() => this.props.navigation.navigate('ItemLine')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    margin: 10,
    height: 100
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  label: {
    fontSize: 20,
    width: 150
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'lightgray',
    borderWidth: 1
  },
  field: {
    flexBasis: 200,
    backgroundColor: '#fff',
    color: '#424242',
    fontSize: 18
  },
  fieldIcon: {
    paddingLeft: 10,
    paddingRight: 10
  },
  infoContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  progressBarContainer: {
    flex: 1,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginRight: 10,
    height: 22
  },
  progressBar: {
    backgroundColor: 'green',
    width: progressBarWidth(3),
    borderRadius: 10,
    flex: 1
  },
  progressBarText: {
    color: 'white',
    alignSelf: 'flex-end',
    marginRight: 5
  }
});

export default PurchaseHeader;
