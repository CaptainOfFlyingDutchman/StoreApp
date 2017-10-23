import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import Realm from '../realm';
import { getNavigationResetAction } from '../../utils';

const logoutHandler = (navigation) => {
  const setting = Realm.objects('Setting');
  Realm.write(() => {
    setting[0].currentUser = '';
    navigation.dispatch(getNavigationResetAction('SignIn'));
  });
};

const HeaderRight = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Settings')}>
      <IconMCI name="settings" size={26} />
    </TouchableOpacity>

    <TouchableOpacity style={styles.icon} onPress={() => logoutHandler(navigation)}>
      <IconMCI name="logout" size={26} />
    </TouchableOpacity>
  </View>
);

HeaderRight.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 20
  }
});

export default HeaderRight;
