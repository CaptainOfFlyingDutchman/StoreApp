import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Button from '../reusable/Button';
import { removeItemLineItem } from '../steps/ItemLine.actions';

class ScannedItems extends Component {
  static navigationOptions = {
    title: 'Scanned items'
  };

  constructor(props) {
    super(props);

    this._renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(item) {
    return item.barCodeData;
  }

  _renderItem({ item }) {
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.cardText}>
            Item: <Text style={styles.cardValue}>{item.barCodeData}</Text>
          </Text>
          <Text style={styles.cardText}>
            Qty: <Text style={styles.cardValue}>{item.quantity}</Text>
          </Text>
        </View>
        <View>
          <Button style={{ backgroundColor: 'red' }} name="trash"
            onPress={() => {
              this.props.removeItemLineItem(item);
            }} />
        </View>
      </View>
    );
  }

  render() {
    if (this.props.itemLine.itemLines.length) {
      return (
        <FlatList data={this.props.itemLine.itemLines}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor} />
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 26 }}>NOTHING!</Text>
        <Text style={{ fontSize: 18 }}>Please add some items from the items screen.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 1,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 28
  },
  cardValue: {
    fontSize: 18
  }
});

ScannedItems.propTypes = {
  itemLine: PropTypes.object.isRequired,
  removeItemLineItem: PropTypes.func.isRequired
};

export default connect(state => ({
  itemLine: state.itemLine
}), { removeItemLineItem })(ScannedItems);
