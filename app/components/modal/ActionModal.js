import React, { PropTypes } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import FadeInView from './FadeInView';
// import CancelButton from './CancelButton';

const ActionModal = ({ modalVisible, backgroundColor, onCancel, children }) => (
  <FadeInView visible={modalVisible} backgroundColor={backgroundColor}>
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.container} onPress={onCancel} />
        { children }
        { /* <CancelButton onPress={onCancel} text="Close" /> */ }
      </View>
    </Modal>
  </FadeInView>
);

ActionModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  children: PropTypes.element.isRequired
};

ActionModal.defaultProps = {
  onCancel: () => {},
  backgroundColor: 'black'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    // padding: 8,
    paddingBottom: 0,
    justifyContent: 'flex-end'
  }
});

export default ActionModal;
