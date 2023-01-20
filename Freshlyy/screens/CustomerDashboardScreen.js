import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import DashBoardCard from '../components/DashBoardCard';
import ServicesCardDB from '../components/ServicesCardDB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import ENV from '../constants/env';
import { H4 } from '../components/Texts';
import InfoCardDBCust from '../components/InfoCardDBCust';

export default function () {
  const [userData, setUserData] = useState({
    fname: 'Haritha',
    lname: 'Hasathcharu',
    profilePicUrl:
      'https://firebasestorage.googleapis.com/v0/b/freshlyyimagestore.appspot.com/o/UserImages%2FCB09D1A1-E3A6-4885-8A1B-1CE381108D68.jpg?alt=media&token=cfeb9bd0-e854-40d0-b926-26be82d8d4c5',
    email: 'haritha@hasathcharu.com',
  });
  const [product, setProduct] = useState([]);
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = ['60%', '100%'];

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  React.useEffect(() => {
    // fetch(ENV.backend + '/farmer/dashboard', {
    //   method: 'GET',
    //   headers: {
    //     useremail: 'komuthu@freshlyy.com',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.message != 'Success') {
    //       throw new Error('Something went wrong');
    //     }
    //     setUserData(res.user);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header customer={true} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.pageContent}
        >
          <InfoCardDBCust user={userData} />
          <View style={styles.cardContainer}>
            <DashBoardCard
              imageUri={require('../assets/topay.png')}
              number={0}
              text='To Pay'
            />
            <DashBoardCard
              imageUri={require('../assets/processing.png')}
              number={0}
              text='Processing'
            />
            <DashBoardCard
              imageUri={require('../assets/topickup.png')}
              number={0}
              text='To Pick Up'
            />
            <DashBoardCard
              imageUri={require('../assets/shipped.png')}
              number={0}
              text='Shipped'
            />
            <DashBoardCard
              imageUri={require('../assets/received.png')}
              number={0}
              text='Received'
            />
            <DashBoardCard
              imageUri={require('../assets/toreview.png')}
              number={0}
              text='To Review'
            />
            <DashBoardCard
              imageUri={require('../assets/all.png')}
              number={0}
              text='All Orders'
            />
          </View>
          <ServicesCardDB />
          <View style={styles.lastChild}></View>
        </ScrollView>
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },

  headings: {
    margin: 15,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    margin: 20,
    alignItems: 'center',
  },
  lastChild: {
    height: 80,
  },
});
