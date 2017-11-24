import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Button from '../reusable/Button';
import { setVendorToSearch } from './VendorList.actions';

class VendorSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendorToSearch: ''
    };
  }

  componentWillMount() {
    this.setState({ vendorToSearch: this.props.vendorList.vendorToSearch });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.searchBox}
          onChangeText={((vendorToSearch) => {
            this.setState({ vendorToSearch });
            this.props.setVendorToSearch(vendorToSearch);
          })}
          value={this.state.vendorToSearch}
          placeholder="Search..." />
        <Button onPress={() => this.props.setVendorToSearch(this.state.vendorToSearch)}
          name="search" style={{ marginLeft: 5 }} />
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
    padding: 5,
    flexDirection: 'row'
  },
  searchBox: {
    flex: 1,
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
