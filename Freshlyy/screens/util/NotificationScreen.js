import React from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { H2, H3, Pr } from '../../components/Texts';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import NotificationView from '../../components/NotificationView';
import ENV from '../../constants/env';
import Loading from '../../components/Loading';
import FadeComponent from '../../components/FadeComponent';
function emptyNotifs() {
  return (
    <View style={styles.noNotifsContent}>
      <Image
        source={require('../../assets/emptyOrders.png')}
        style={styles.messageImage}
      />
      <H3 style={styles.messageTitle}>No updates yet!</H3>
    </View>
  );
}

export default function ({ navigation, route }) {
  const [notifications, setNotifications] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const getNotifications = React.useCallback(async (refreshing) => {
    refreshing ? setRefreshing(true) : setLoaded(false);
    return fetch(ENV.backend + `/${route.params.mode}/notifications`, {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.notifications) throw new Error('Malformed Response');
        setNotifications(res.notifications);
        refreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    getNotifications(false);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header back={true} />
      <H3 style={{ textAlign: 'center' }}>Notifications</H3>
      {!loaded ? (
        <Loading />
      ) : (
        <View style={styles.notifsContainer}>
          <FadeComponent>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={emptyNotifs}
              data={notifications}
              refreshing={refreshing}
              onRefresh={() => getNotifications(true)}
              renderItem={(item) => (
                <NotificationView key={item.id} notification={item.item} />
              )}
            />
          </FadeComponent>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 40,
  },
  modalEdit: {
    width: 200,
    alignItems: 'center',
  },
  notifsContainer: {
    marginVertical: 10,
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  noNotifsContent: {
    paddingHorizontal: 10,
    height: '100%',
    minHeight: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageImage: {
    height: 200,
    resizeMode: 'contain',
  },
  messageTitle: {
    textAlign: 'center',
    paddingVertical: 50,
  },
});
