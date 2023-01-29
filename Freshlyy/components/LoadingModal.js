import React from 'react';
import { StyleSheet, View } from 'react-native';
import ModalComponent from './ModalComponent';
import LottieView from 'lottie-react-native';
import { H3 } from './Texts';

export default function (props) {
  return (
    <ModalComponent visible={props.visible}>
      <View style={styles.modalContent}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../assets/Freshlyy.json')}
        />
        <H3>{props.message}</H3>
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
