import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { selectVendor } from './VendorList.actions';
import mockVendors from '../../mock-data/vendors.json';

class VendorList extends Component {
  constructor(props) {
    super(props);

    this._renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(item) {
    return item.No;
  }

  _renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.nameContainer}
        onPress={() => {
          this.props.selectVendor(item);
          this.props.navigation.goBack();
        }}>
        <Text style={styles.name}>{item.Name}</Text>
      </TouchableOpacity>
    );
  }

  _renderSeparator() {
    return (
      <View style={styles.separator} />
    );
  }

  render() {
    return (
      <FlatList data={mockVendors.value}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSeparator} />
    );
  }
}

VendorList.propTypes = {
  navigation: PropTypes.object.isRequired,
  selectVendor: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  nameContainer: {
    padding: 10
  },
  name: {
    fontSize: 18
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
  }
});

export default connect(null, { selectVendor })(VendorList);
