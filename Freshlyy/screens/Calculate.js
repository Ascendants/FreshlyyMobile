import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H1, H2, H3, H4, H5, H6, H7, H8, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function () {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <View style={styles.outputContainer}>
          <H1 style={{ textalign: 'right' }}>0</H1>
          <H3 style={{ textalign: 'right' }}>0</H3>
        </View>
        <View style={styles.operationsContainer}>
          <Button title='+' size='big' color='shadedPrimary' />
          <Button title='-' size='big' color='shadedSecondary' />
          <Button title='x' size='big' color='shadedWarning' />
          <Button title='/' size='big' color='shadedDanger' />
        </View>
        <View style={styles.keypadContainer}>
          <Button
            title='1'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
          <Button
            title='2'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
          <Button
            title='3'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
          <Button
            title='4'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
          <Button
            title='5'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
          <Button
            title='6'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
          <Button
            title='7'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
          <Button
            title='8'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
          <Button
            title='9'
            size='big'
            color='shadedPrimary'
            backgroundStyle={{ minWidth: 70 }}
          />
        </View>
        <View style={styles.resultButtonContainer}>
          <Button title='9' size='big' color='shadedPrimary' />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    paddingHorizontal: 10,
  },
  outputContainer: {
    width: '100%',
  },
  operationsContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  keypadContainer: {
    width: '100%',
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  resultButtonContainer: {
    width: '100%',
  },
});
