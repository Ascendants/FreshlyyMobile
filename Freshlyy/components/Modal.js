import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Theme from '../constants/theme';

export default function (props) {
  return (
    <Modal animationType='fade' transparent={true} visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.content}>{props.children}</View>
      </View>
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
  content: {
    padding: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.contrastTextColor,
  },
});
