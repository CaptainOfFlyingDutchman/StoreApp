import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { setVendorToSearch } from './VendorList.actions';

class VendorSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendorToSearch: ''
    };

    this._onChangeSearchHandler = this._onChangeSearchHandler.bind(this);
  }

  componentWillMount() {
    this.setState({ vendorToSearch: this.props.vendorList.vendorToSearch });
  }

  _onChangeSearchHandler(vendorToSearch) {
    this.setState({ vendorToSearch });
    this.props.setVendorToSearch(vendorToSearch);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.searchBox}
          onChangeText={this._onChangeSearchHandler}
          value={this.state.vendorToSearch}
          placeholder="Search..." />
      </View>
    );
  }
}

VendorSearch.propTypes = {
  vendorList: PropTypes.object.isRequired,
  setVendorToSearch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  searchBox: {
    fontSize: 18,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white'
  }
});

export default connect(state => ({
  vendorList: state.vendorList
}), { setVendorToSearch })(VendorSearch);
