import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H2, H3, Pr } from '../../components/Texts';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../../constants/theme';
import NotificationView from '../../components/NotificationView';
import { Button } from '../../components/Buttons';
import ENV from '../../constants/env';
import RefreshView from '../../components/RefreshView';

export default function ({ navigation, route }) {
  const [notifications, setNotifications] = React.useState([]);
  const getNotifications = React.useCallback(async () => {
    return fetch(ENV.backend + `/${route.params.mode}/notifications`, {
      method: 'GET',
      headers: {
        userEmail: route.params.userEmail,
        //this will be replaced with an http only token
        //after auth gets set
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.notifications) throw new Error('Malformed Response');
        setNotifications(res.notifications);
      })
      .catch((err) => console.log(err));
  });
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <H3>Notifications</H3>
        <RefreshView getData={getNotifications}>
          {notifications?.map((item) => (
            <NotificationView key={item._id} notification={item} />
          ))}
          <View style={{ marginBottom: 100 }}></View>
        </RefreshView>
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
