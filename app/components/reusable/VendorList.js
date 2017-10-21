import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import VendorSearch from './VendorSearch';
import { selectVendor, loadVendors } from './VendorList.actions';
import Realm from '../realm';

class VendorList extends Component {
  constructor(props) {
    super(props);

    props.loadVendors(Realm.objects('Vendor'));

    this._renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(item) {
    return item.id;
  }

  _renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.nameContainer}
        onPress={() => {
          this.props.selectVendor(item);
          this.props.navigation.goBack();
        }}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  _renderSeparator() {
    return (
      <View style={styles.separator} />
    );
  }

  render() {
    // const vendors = vendor.map(v => ({ id: v.id, name: v.name }));
    const { vendorToSearch, vendors } = this.props.vendorList;

    const vendorsForFlatList = vendorToSearch ?
      vendors.filter(vendor => vendor.name.toLowerCase().includes(vendorToSearch)) : vendors;

    return (
      <View>
        <VendorSearch />
        <FlatList data={vendorsForFlatList}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator} />
      </View>
    );
  }
}

VendorList.propTypes = {
  navigation: PropTypes.object.isRequired,
  vendorList: PropTypes.object.isRequired,
  selectVendor: PropTypes.func.isRequired,
  loadVendors: PropTypes.func.isRequired
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

export default connect(state => ({
  vendorList: state.vendorList
}), { selectVendor, loadVendors })(VendorList);
