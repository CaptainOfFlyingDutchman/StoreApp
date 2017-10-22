import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import HeaderRight from './reusable/HeaderRight';
import { screen } from '../constants';
import Realm from './realm';

class History extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <HeaderRight navigation={navigation} />,
    tabBarIcon: () => <IconFA name="history" size={26} />
  });

  constructor(props) {
    super(props);

    this.state = {
      allSubmissions: Realm.objects('AllSubmission')
    };
  }

  render() {
    if (this.state.allSubmissions.length) {
      return (
        <ScrollView style={styles.container}>
          {
            this.state.allSubmissions.map(submission => {
              const imageSource = screen.receive === submission.screenType.toUpperCase() ?
                require('./img/receive.png') :
                  screen.requisition === submission.screenType.toUpperCase() ?
                    require('./img/requisition.png') : require('./img/return.png');

              return (
                <View style={styles.item}>
                  <Image style={styles.itemImage} source={imageSource} />
                  <View style={styles.itemDetailsContainer}>
                    <Text style={styles.itemDetailsText}>Item {submission.screenType}</Text>
                    <Text style={styles.itemDetailsSubText}>{submission.submissionId}</Text>
                    <Text style={styles.itemDetailsSubText}>
                      Submitted: <Text>{moment(submission.submissionDate).fromNow()}</Text>
                    </Text>
                  </View>
                </View>
              );
            })
          }
        </ScrollView>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 26 }}>NOTHING!</Text>
        <Text style={{ fontSize: 18 }}>No data found in the history yet.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5
  },
  item: {
    // margin: 5,
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
