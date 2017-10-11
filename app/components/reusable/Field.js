import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const Field = ({ label, icon, editable, iconMCI, keyboardType, onPress, onChangeText }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    {
      editable ?
        <View style={styles.fieldContainer}>
          <TextInput onChangeText={onChangeText} style={styles.field} editable={editable} keyboardType={keyboardType} underlineColorAndroid="transparent" />
          {
            iconMCI ?
              <IconMCI style={styles.fieldIcon} name={iconMCI} size={24}
                color="#000" onPress={onPress} /> :
              <IconFA style={styles.fieldIcon} name={icon} size={24}
                color="#000" onPress={onPress} />
          }
        </View> :
        <TouchableOpacity onPress={onPress} style={styles.fieldContainer}>
          <TextInput style={styles.field} editable={editable} keyboardType={keyboardType} underlineColorAndroid="transparent" />
          {
            iconMCI ?
              <IconMCI style={styles.fieldIcon} name={iconMCI} size={24} color="#000" /> :
              <IconFA style={styles.fieldIcon} name={icon} size={24} color="#000" />
          }
        </TouchableOpacity>
    }

  </View>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  iconMCI: PropTypes.string,
  keyboardType: PropTypes.string,
  onPress: PropTypes.func,
  onChangeText: PropTypes.func
};

Field.defaultProps = {
  icon: '',
  editable: true,
  iconMCI: '',
  keyboardType: 'default',
  onPress: () => {},
  onChangeText: () => {},
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  label: {
    flex: 1,
    fontSize: 20
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'lightgray',
    borderWidth: 1
  },
  field: {
    flex: 1,
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
