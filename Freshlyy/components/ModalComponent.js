import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Theme from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function (props) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.visible}
      onRequestClose={props.closeModal}
    >
      <TouchableOpacity style={styles.container} onPress={props.closeModal}>
        <TouchableWithoutFeedback>
          <View style={styles.closeContent}>
            {props.closeModal ? (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={props.closeModal}
              >
                <Ionicons
                  name='ios-close-circle'
                  size={32}
                  color={Theme.tertiary}
                />
              </TouchableOpacity>
            ) : null}
            <View style={styles.content}>{props.children}</View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: Theme.overlayShade,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeContent: {
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.contrastTextColor,
  },
  content: {
    padding: 20,
  },
});
