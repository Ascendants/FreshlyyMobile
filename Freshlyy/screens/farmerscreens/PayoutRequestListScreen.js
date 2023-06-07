import React from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { H3, Pr } from '../../components/Texts';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeComponent from '../../components/FadeComponent';
import ENV from '../../constants/env';
import TabMenu from '../../components/TabMenu';
import Loading from '../../components/Loading';
import PayoutRequestView from '../../components/PayoutRequestView';
function emptyOrders() {
  return (
    <View style={styles.noOrdersContent}>
      <Image
        source={require('../../assets/emptyOrders.png')}
        style={styles.messageImage}
      />
      <H3 style={styles.messageTitle}>No Payout Requests</H3>
    </View>
  );
}

export default function ({ navigation, route }) {
  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [payoutRequests, setPayoutRequests] = React.useState([]);

  async function getRequestsList(refreshing) {
    refreshing ? setRefreshing(true) : setLoaded(false);
    fetch(ENV.backend + '/farmer/payout-requests/', {
      method: 'GET',
      headers: {
        useremail: route.params.userEmail,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Malformed Response');
        }
        setPayoutRequests(res.payoutRequests);
        refreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    getRequestsList(false);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header back={true} home={true} />
      <H3 style={{ textAlign: 'center' }}>Your Payout Requests</H3>
      {!loaded ? (
        <Loading />
      ) : (
        <View style={styles.ordersContainer}>
          <FadeComponent>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={emptyOrders}
              data={payoutRequests}
              refreshing={refreshing}
              onRefresh={() => getRequestsList(true)}
              renderItem={(request) => (
                <PayoutRequestView request={request.item} key={request.index} />
              )}
            />
          </FadeComponent>
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
    paddingHorizontal: 10,
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
});
