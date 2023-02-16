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
import GetStartedScreen from './screens/GetStartedScreen';
import DashBoard from './screens/FarmerDashboardScreen';
import MyCartScreen from './screens/MyCartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProductHomePageScreen from './screens/ProductHomePageScreen';
import LoginScreen from './screens/LoginScreen';
import PasswordCreationScreen from './screens/PasswordCreationScreen';
import BeFarmerScreen from './screens/BeFarmerScreen';
import FarmerCreateAccountScreen from './screens/FarmerCreateAccountScreen';
import MessageScreen from './screens/MessageScreen';
import InsertProductScreen from './screens/InsertProductScreen';
import ProductAddedScreen from './screens/ProductAddedScreen';
import ProductUpdatedScreen from './screens/ProductUpdated';
import ProductDeletedScreen from './screens/ProductDelete';
import EorDproduct from './screens/EorDproduct';
import CustomerDashboardScreen from './screens/CustomerDashboardScreen';
import FarmerDashboardScreen from './screens/FarmerDashboardScreen';
import CardScreen from './screens/CardScreen';
import AddCardScreen from './screens/AddCardScreen';
import EditProductScreen from './screens/EditProductScreen';
import OrderStatusScreen from './screens/OrderStatusScreen';

export default function App() {
  const [fonts] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
  });
  const userEmail = 'harini@freshlyy.com';
  if (!fonts) return null;
  return (
    <UserContext.Provider value={null}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: 'none' }}
        >
          <Stack.Screen
            name='Checkout'
            component={OrderStatusScreen}
            initialParams={{
              purl: 'nuwara_eliya_strawberries_63b6b7b160d78bea22456aa8',
              // purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
              userEmail: userEmail,
            }}
          />
          <Stack.Screen name='Payment' component={PaymentScreen} />
          <Stack.Screen
            name='Farmer Dashboard'
            component={FarmerDashboardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Card Management'
            component={CardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Add Card'
            component={AddCardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Customer Dashboard'
            component={CustomerDashboardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen name='Message' component={MessageScreen} />
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
