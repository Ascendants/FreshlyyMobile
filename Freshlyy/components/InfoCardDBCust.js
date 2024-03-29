import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { P, Pr, H2, H4, H3 } from './Texts';
import Theme from '../constants/theme';
import LoyaltyArea from './LoyaltyArea';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Button } from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';

export default function (props) {
  const nav = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.cardLayout}>
        <View>
          <H3 style={styles.name}>{props.user?.fname}</H3>
          <H4 style={styles.name}>{props.user?.lname}</H4>
          <P>{props.user?.email}</P>
        </View>
        <View style={styles.cardRight}>
          <Image
            source={{ uri: props.user?.profilePicUrl?.imageUrl }}
            style={[
              styles.image,
              { backgroundColor: props.user?.profilePicUrl?.placeholder },
            ]}
          />
        </View>
      </View>
      <View style={styles.loyaltyLayout}>
        <LoyaltyArea user={props.user} />
      </View>
      <View style={styles.buttonsLayout}>
        <Button
          title='Locations'
          backgroundStyle={styles.buttonBackground}
          type='icon'
          size='normal'
          color='filledWarning'
          onPress={() => nav.navigate('Location Screen')}
          icon={
            <FontAwesome5
              name='location-arrow'
              size={28}
              color={Theme.textColor}
            />
          }
        />
        <Button
          title='Cards'
          type='icon'
          onPress={() => nav.navigate('Card Management')}
          backgroundStyle={styles.buttonBackground}
          size='normal'
          color='filledSecondary'
          icon={
            <FontAwesome
              name='credit-card-alt'
              size={28}
              color={Theme.contrastTextColor}
            />
          }
        />
        {/* <Button
          title='Coupons'
          type='icon'
          onPress={() => nav.navigate('Customer Coupons')}
          backgroundStyle={styles.buttonBackground}
          size='normal'
          color='filledSecondary'
          icon={
            <MaterialCommunityIcons
              name='ticket'
              size={28}
              color={Theme.contrastTextColor}
            />
          }
        /> */}
        <Button
          title='Edit Profile'
          type='icon'
          backgroundStyle={styles.buttonBackground}
          size='normal'
          color='filledPrimary'
          icon={
            <FontAwesome5
              name='user-circle'
              size={28}
              color={Theme.contrastTextColor}
            />
          }
        />
      </View>
      <Button
        size='normal'
        title='Wishlist'
        color='shadedDanger'
        icon={<AntDesign name='hearto' size={24} color={Theme.danger} />}
        type='icon'
        onPress={() => nav.navigate('Wishlist')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: Theme.primaryShadeLighter,
    width: '90%',
    borderRadius: 30,
    padding: 5,
    marginBottom: 30,
  },
  cardLayout: {
    flexDirection: 'row',
    padding: 15,
    flex: 1,
  },
  loyaltyLayout: {
    padding: 15,
    paddingTop: 0,
    flex: 1,
  },
  cardRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  name: {
    color: Theme.primary,
  },
  subTopic: {
    alignContent: 'flex-start',
    fontWeight: '500',
  },
  mainTopic: {
    fontWeight: 'bold',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  buttonsLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBackground: {
    flex: 1,
    width: '100%',
  },
});
