import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

class Field extends Component {
  render() {
    const { label, icon, editable, iconMCI, keyboardType,
      value, reference, onPress, onChangeText, onBlur, customStyle } = this.props;

    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        {
          editable ?
            <View style={[styles.fieldContainer, customStyle]}>
              <TextInput value={value} onChangeText={onChangeText} style={styles.field}
                editable={editable} keyboardType={keyboardType} underlineColorAndroid="transparent"
                ref={reference} onBlur={onBlur} />
              {
                iconMCI ?
                  <IconMCI style={styles.fieldIcon} name={iconMCI} size={24}
                    color="#000" onPress={onPress} /> :
                  <IconFA style={styles.fieldIcon} name={icon} size={24}
                    color="#000" onPress={onPress} />
              }
            </View> :
            <View style={[styles.fieldContainer, customStyle]}>
              <Text style={[styles.field,
                { padding: 5, backgroundColor: 'lightgray' },
                !value ? { padding: 14 } : {}]}>{value}</Text>
              {
                iconMCI ?
                  <IconMCI style={styles.fieldIcon} name={iconMCI} size={24}
                    color="#000" onPress={onPress} /> :
                  <IconFA style={styles.fieldIcon} name={icon} size={24}
                    color="#000" onPress={onPress} />
              }
            </View>
        }
      </View>
    );
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  iconMCI: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  reference: PropTypes.func,
  onPress: PropTypes.func,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
  customStyle: PropTypes.object
};

Field.defaultProps = {
  icon: '',
  editable: true,
  iconMCI: '',
  keyboardType: 'default',
  value: 0,
  reference: () => {},
  onPress: () => {},
  onChangeText: () => {},
  onBlur: () => {},
  customStyle: {}
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
