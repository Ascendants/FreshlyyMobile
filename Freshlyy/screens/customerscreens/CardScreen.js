import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { H2, H3, Pr } from '../../components/Texts';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import CardView from '../../components/CardView';
import { Button } from '../../components/Buttons';
import ENV from '../../constants/env';
import RefreshView from '../../components/RefreshView';

export default function ({ navigation, route }) {
  console.log(route.params.auth);
  const [cards, setCards] = React.useState([]);
  const getCards = React.useCallback(async () => {
    return fetch(ENV.backend + '/customer/cards/', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.cards) throw new Error('Malformed Response');
        setCards(res.cards);
      })
      .catch((err) => console.log(err));
  });
  async function deleteCard(cardId) {
    const result = await fetch(
      ENV.backend + '/customer/delete-card/' + cardId,
      {
        method: 'DELETE',
        headers: {
          Authorization: route.params.auth,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message == 'Success') {
          return true;
        }
      })
      .catch((err) => console.log(err));
    if (result) await getCards();
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header back={true} home={true} />
      <H3 style={{ textAlign: 'center' }}>Cards</H3>
      <RefreshView getData={getCards} route={route}>
        <View>
          {cards?.map((item) => (
            <CardView
              key={item.cardId}
              card={item}
              deleteCard={() => deleteCard(item.cardId)}
              editCard={() => openEditModal(item.cardId, item.cardName)}
            />
          ))}
          {cards.length == 0 ? (
            <View style={styles.noCardsContent}>
              <Image
                source={require('../../assets/emptyOrders.png')}
                style={styles.messageImage}
              />
              <H3 style={styles.messageTitle}>No cards yet!</H3>
              <Button
                backgroundStyle={{ alignSelf: 'center' }}
                title={'Add a card'}
                size='big'
                color='shadedPrimary'
                onPress={() => navigation.navigate('Add Card')}
              />
            </View>
          ) : (
            <View>
              <View style={{ marginBottom: 50 }}></View>
              <Button
                backgroundStyle={{ alignSelf: 'center' }}
                title={'Add another card'}
                size='big'
                color='shadedPrimary'
                onPress={() => navigation.navigate('Add Card')}
              />
            </View>
          )}
        </View>
      </RefreshView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageImage: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  messageTitle: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  noCardsContent: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
