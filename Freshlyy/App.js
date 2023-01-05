import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { P, H1 } from './components/Texts';
import Header from './components/Header';
import { UserContext, user } from './context/UserContext';
import Theme from './constants/theme';

const Stack = createNativeStackNavigator();

import StartScreen from './screens/StartScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import DashBoardScreen from './screens/DashBoard';
import GetStartedScreen from './screens/GetStartedScreen';
import DashBoard from './screens/DashBoard';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProductHomePageScreen from './screens/ProductHomePageScreen';
import LoginScreen from './screens/LoginScreen';
import PasswordCreationScreen from './screens/PasswordCreationScreen';

export default function App() {
  const [fonts] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
  });
  if (!fonts) return null;
  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Checkout'
            component={PaymentScreen}
            options={{
              headerShown: false,
            }}
            initialParams={{
              purl: 'sri_lankan_carrots_63aaf131d5c6be39b45d74b9',
            }}
          />
          <Stack.Screen
            name='Payment'
            component={PaymentScreen}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen name='Profile' component={ProfileScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
  },
});
