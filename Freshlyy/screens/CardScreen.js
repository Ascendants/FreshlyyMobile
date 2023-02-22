import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { H2, H3, Pr } from '../components/Texts';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { TextInputBox } from '../components/Inputs';
import CardView from '../components/CardView';
import * as Yup from 'yup';

import { Formik } from 'formik';
import { Button } from '../components/Buttons';
import ModalComponent from '../components/ModalComponent';
import ENV from '../constants/env';
import SimpleLoadingModal from '../components/SimpleLoadingModal';
import { useIsFocused } from '@react-navigation/native';
const NicknameSchema = Yup.object().shape({
  Nickname: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
});
export default function ({ navigation, route }) {
  const isFocused = useIsFocused();
  const [cards, setCards] = React.useState([]);
  async function getCards() {
    fetch(ENV.backend + '/customer/cards/', {
      method: 'GET',
      headers: {
        userEmail: route.params.userEmail,
        //this will be replaced with an http only token
        //after auth gets set
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.cards) throw new Error('Malformed Response');
        setCards(res.cards);
      })
      .catch((err) => console.log(err));
  }
  React.useState(() => {
    getCards();
  }, [isFocused]);
  async function deleteCard(cardId) {
    const result = await fetch(
      ENV.backend + '/customer/delete-card/' + cardId,
      {
        method: 'DELETE',
        headers: {
          userEmail: route.params.userEmail,
          //this will be replaced with an http only token
          //after auth gets set
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message == 'Success') return true;
      })
      .catch((err) => console.log(err));
    if (result) await getCards();
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H2>Cards</H2>
        <ScrollView
          howsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {cards.map((item) => (
            <CardView
              key={item.cardId}
              card={item}
              deleteCard={() => deleteCard(item.cardId)}
              editCard={() => openEditModal(item.cardId, item.cardName)}
            />
          ))}
          <View style={{ marginBottom: 100 }}></View>
          <Button
            backgroundStyle={{ alignSelf: 'center' }}
            title='Add another card'
            size='big'
            color='shadedPrimary'
            onPress={() => navigation.navigate('Add Card')}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  modalEdit: {
    width: 200,
    alignItems: 'center',
  },
});
