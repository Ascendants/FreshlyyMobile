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
const NicknameSchema = Yup.object().shape({
  Nickname: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
});
export default function ({ navigation, route }) {
  const [cards, setCards] = React.useState([]);
  const [editing, setEditing] = React.useState(false);
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
  function openEditModal(cardId, cardName) {
    setEditing({ cardName: cardName, cardId: cardId });
  }
  async function editCard(values, cardId) {
    const result = await fetch(ENV.backend + '/customer/edit-card/' + cardId, {
      method: 'POST',
      headers: {
        userEmail: route.params.userEmail,
        'Content-Type': 'application/json',
        //this will be replaced with an http only token
        //after auth gets set
      },
      body: JSON.stringify({ Nickname: values.Nickname }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == 'Success') getCards();
        else throw new Error(res.message);
        setEditing(false);
      })
      .catch((err) => console.log(err));
  }
  function closeEditModal() {
    setEditing(false);
  }
  React.useState(() => {
    getCards();
  }, []);
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
        if (res.message == 'Success') getCards();
      })
      .catch((err) => console.log(err));
  }
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <ModalComponent
          visible={editing ? true : false}
          closeModal={closeEditModal}
        >
          <Formik
            initialValues={{ Nickname: editing.cardName }}
            validationSchema={NicknameSchema}
            onSubmit={(values) => editCard(values, editing.cardId)}
          >
            {(formik) => (
              <View style={styles.modalEdit}>
                <TextInputBox
                  inputlabel='Card Nickname'
                  placeholder='Enter a nickname'
                  name='Nickname'
                  onChangeText={formik.handleChange('Nickname')}
                  onBlur={() => formik.setFieldTouched('Nickname', true, true)}
                  value={formik.values.Nickname}
                  error={formik.errors.Nickname}
                  touched={formik.touched.Nickname}
                />
                <Button
                  color='shadedPrimary'
                  size='normal'
                  onPress={formik.handleSubmit}
                  title='Save'
                />
              </View>
            )}
          </Formik>
        </ModalComponent>
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
