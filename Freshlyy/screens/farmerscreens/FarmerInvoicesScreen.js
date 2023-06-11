import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { H4, H3, Pr, P } from '../../components/Texts';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeComponent from '../../components/FadeComponent';
import ENV from '../../constants/env';
import Loading from '../../components/Loading';
import ListItem from '../../components/ListItem';
function emptyOrders() {
  return (
    <View style={styles.noOrdersContent}>
      <Image
        source={require('../../assets/emptyOrders.png')}
        style={styles.messageImage}
      />
      <H3 style={styles.messageTitle}>No Invoices</H3>
    </View>
  );
}

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);

  async function getInvoiceList(refreshing) {
    refreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/farmer/invoices/', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Malformed Response');
        }

        setInvoices(res.invoices);
        refreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    getInvoiceList(false);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header back={true} home={true} />
      <H3 style={{ textAlign: 'center' }}>Your Invoices</H3>
      {!loaded ? (
        <Loading />
      ) : (
        <View style={styles.ordersContainer}>
          <FadeComponent>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={emptyOrders}
              data={invoices}
              refreshing={refreshing}
              onRefresh={() => getInvoiceList(true)}
              renderItem={(invoice) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Farmer Invoice', {
                      invoiceId: invoice.item.id,
                    });
                  }}
                >
                  <ListItem key={invoice.index}>
                    <H4 style={styles.listItemTitle}>
                      Invoice for{' '}
                      {(invoice.item.month + 1).toString().padStart(2, 0)}/
                      {invoice.item.year}
                    </H4>
                  </ListItem>
                </TouchableOpacity>
              )}
            />
          </FadeComponent>
          <P style={styles.infoTextLast}>
            ⓘ Invoices are generated on the 5th of every month
          </P>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ordersContainer: {
    marginVertical: 10,
    width: '100%',
    flex: 1,
    paddingHorizontal: 5,
  },
  flatList: {
    height: '95%',
  },
  noOrdersContent: {
    paddingHorizontal: 10,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageImage: {
    height: 200,
    resizeMode: 'contain',
  },
  messageTitle: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    paddingVertical: 50,
  },
  listItemTitle: {
    margin: 10,
  },
  infoTextLast: {
    marginTop: 10,
    textAlign: 'center',
  },
});
