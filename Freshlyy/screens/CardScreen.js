import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { H2, H3, Pr } from '../components/Texts';
import Header from '../components/Header';
import CartCard from '../components/CartCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import CardView from '../components/CardView';
import { Button } from '../components/Buttons';
import ENV from '../constants/env';

export default function ({ navigation, route }) {
  const [cards, setCards] = React.useState([]);
  React.useState(() => {
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
  }, []);
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
            <CardView key={item.cardId} card={item} />
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
});
