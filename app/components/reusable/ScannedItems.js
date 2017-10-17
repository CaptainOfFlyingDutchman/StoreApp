import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

class ScannedItems extends Component {
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
        <Text style={styles.cardText}>
          Item: <Text style={styles.cardValue}>{item.barCodeData}</Text>
        </Text>
        <Text style={styles.cardText}>
          Qty: <Text style={styles.cardValue}>{item.quantity}</Text>
        </Text>
      </View>
    );
  }

  render() {
    return (
      <FlatList data={this.props.itemLine.itemLines}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor} />
    );
  }
}

ScannedItems.propTypes = {
  itemLine: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  cardText: {
    fontSize: 28
  },
  cardValue: {
    fontSize: 18
  }
});

export default connect(state => ({
  itemLine: state.itemLine
}))(ScannedItems);
