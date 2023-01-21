import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { H2, H3, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import CartCard from '../components/CartCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import CardView from '../components/CardView';
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
        <Header />
        <H2>Cards</H2>
        <ScrollView
          howsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {cards.map((item) => (
            <CardView key={item.cardId} card={item} />
          ))}
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
  bottomContainer: {
    backgroundColor: Theme.overlayShade,
    height: 130,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  left: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  right: {
    justifyContent: 'center',
  },
});
