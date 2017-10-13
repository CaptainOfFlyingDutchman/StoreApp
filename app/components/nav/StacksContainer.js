import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import { Stacks } from './Stacks';

class StacksContainer extends Component {
  constructor(props) {
    super(props);

    this._onBackPress = this._onBackPress.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }

  componentWillUnMount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  _onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <Stacks navigation={addNavigationHelpers({
        dispatch, state: nav
      })} />
    );
  }
}

StacksContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

export default connect(state => ({
  nav: state.nav
}))(StacksContainer);
