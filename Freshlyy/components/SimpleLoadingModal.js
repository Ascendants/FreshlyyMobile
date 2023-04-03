import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ModalComponent from './ModalComponent';
import LottieView from 'lottie-react-native';
import { H4 } from './Texts';
import Theme from '../constants/theme';

export default function (props) {
  return (
    <ModalComponent visible={props.visible}>
      <View style={styles.modalContent}>
        <ActivityIndicator size='large' color={Theme.textColor} />
        <H4>Loading...</H4>
      </View>
    </ModalComponent>
  );
}
const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
