import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
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
import FarmerDashBoardScreen from './screens/FarmerDashboardScreen';
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
import HelpCenterScreen from './screens/HelpCenterScreen';
import CantSignInScreen from './screens/CantSignInScreen';
import HelpWithanOrderScreen from './screens/HelpWithanOrderScreen';
import FoodDamagedScreen from './screens/FoodDamagedScreen';
import SelectTheOrderHC from './screens/SelectTheOrderScreen';
import CardScreen from './screens/CardScreen';
import AddCardScreen from './screens/AddCardScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderStatusScreen from './screens/OrderStatusScreen';
import OtherPaymentScreen from './screens/OtherPaymentScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerifyYourEmail from './screens/VerifyYourEmail';
import CreateNewPassword from './screens/CreateNewPassword';
import { G } from 'react-native-svg';

import OrderCancelScreen from './screens/OrderCancelScreen';
import ConfirmPickupScreen from './screens/ConfirmPickupScreen';
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
        <StatusBar barStyle='dark-content' />
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: 'none' }}
        >
          <Stack.Screen
            name='Checkout'
            component={ProductHomePageScreen}
            initialParams={{
              // purl: 'nuwara_eliya_strawberries_63b6b7b160d78bea22456aa8',
              total: 5000,
              purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
              userEmail: userEmail,
              initialTab: 'toPay',
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
            name='Confirm Pickup'
            component={ConfirmPickupScreen}
            initialParams={{
              userEmail: userEmail,
            }}
            options={{
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name='Orders List'
            component={OrderListScreen}
            initialParams={{
              userEmail: userEmail,
              initialTab: 'All',
            }}
          />
          <Stack.Screen
            name='Order Details'
            component={OrderStatusScreen}
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
            name='Add New Card'
            component={OtherPaymentScreen}
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
          <Stack.Screen
            name='Order Cancel Screen'
            component={OrderCancelScreen}
            initialParams={{
              userEmail: userEmail,
            }}
            options={{
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen name='Help Center' component={HelpCenterScreen} />
          <Stack.Screen name='Cant sign in' component={CantSignInScreen} />
          <Stack.Screen name='Food Damaged' component={FoodDamagedScreen} />
          <Stack.Screen name='Select order' component={SelectTheOrderHC} />
          <Stack.Screen
            name='Help with an order'
            component={HelpWithanOrderScreen}
          />
          <Stack.Screen name='Cart' component={MyCartScreen} />

          <Stack.Screen
            name='Message'
            component={MessageScreen}
            options={{
              animation: 'slide_from_bottom',
            }}
          />

          <Stack.Screen
            name='signup'
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='createPassword'
            component={PasswordCreationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='beFarmer'
            component={BeFarmerScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='homePage'
            component={ProductHomePageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='login'
            component={LoginScreen}
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
