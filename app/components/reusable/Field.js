import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const Field = ({ label, icon, editable, iconMCI }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.fieldContainer}>
      <TextInput style={styles.field} editable={editable} underlineColorAndroid="transparent" />
      {
        iconMCI ?
          <IconMCI style={styles.fieldIcon} name={iconMCI} size={24} color="#000" /> :
          <IconFA style={styles.fieldIcon} name={icon} size={24} color="#000" />
      }
    </View>
  </View>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  iconMCI: PropTypes.string
};

Field.defaultProps = {
  icon: '',
  editable: true,
  iconMCI: ''
};

const styles = StyleSheet.create({
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
    flexBasis: 160,
    backgroundColor: '#fff',
    color: '#424242',
    fontSize: 18
  },
  fieldIcon: {
    paddingLeft: 10,
    paddingRight: 10
  },
});

export default Field;
