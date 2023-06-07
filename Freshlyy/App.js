import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { UserContext, user } from './context/UserContext';
import * as Screens from './screens';
const Stack = createNativeStackNavigator();

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
            component={Screens.ContactUsScreen}
            initialParams={{
              // purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
              // purl: 'nuwara_eliya_strawberries_63b6b7b160d78bea22456aa8',
              purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
              userEmail: userEmail,
              initialTab: 'toPay',
            }}
          />
          <Stack.Screen name='Payment' component={Screens.PaymentScreen} />
          <Stack.Screen
            name='Farmer Dashboard'
            component={Screens.FarmerDashboardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Farmer Balance'
            component={Screens.FarmerBalancesScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Configure Bank'
            component={Screens.AddBankAccountScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='GetStartedScreen'
            component={Screens.GetStartedScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />

          <Stack.Screen
            name='Confirm Pickup'
            component={Screens.ConfirmPickupScreen}
            initialParams={{
              userEmail: userEmail,
            }}
            options={{
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name='Orders List'
            component={Screens.OrderListScreen}
            initialParams={{
              userEmail: userEmail,
              initialTab: 'All',
            }}
          />
          <Stack.Screen
            name='Farmer Payout Requests'
            component={Screens.PayoutRequestListScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Farmer Invoices'
            component={Screens.FarmerInvoicesScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Order Details'
            component={Screens.OrderStatusScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Card Management'
            component={Screens.CardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Add Card'
            component={Screens.AddCardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Add New Card'
            component={Screens.OtherPaymentScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Customer Dashboard'
            component={Screens.CustomerDashboardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='editScreen'
            component={Screens.EditProductScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='productupdated'
            component={Screens.ProductUpdatedScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='productAddedSuccessfully'
            component={Screens.ProductAddedScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name='Order Cancel Screen'
            component={Screens.OrderCancelScreen}
            initialParams={{
              userEmail: userEmail,
            }}
            options={{
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name='Payout Request Screen'
            component={Screens.ConfirmRequestWithdrawalScreen}
            initialParams={{
              userEmail: userEmail,
            }}
            options={{
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name='Help Center'
            component={Screens.HelpCenterScreen}
          />
          <Stack.Screen
            name='Cant sign in'
            component={Screens.CantSignInScreen}
          />
          <Stack.Screen
            name='Food Damaged'
            component={Screens.FoodDamagedScreen}
          />
          <Stack.Screen
            name='Select the Order'
            component={Screens.SelectOrderScreen}
          />
          <Stack.Screen
            name='Help with an order'
            component={Screens.HelpWithAnOrderScreen}
          />
          <Stack.Screen
            name='Order Naver Arrived'
            component={Screens.OrderNeverArrivedScreen}
          />
          <Stack.Screen
            name='Order is Wrong'
            component={Screens.OrderIsWrong}
          />
          <Stack.Screen
            name='Order Details Help Center'
            component={Screens.HelpWithAnOrderScreen}
          />
          <Stack.Screen
            name='Create Coupon'
            component={Screens.CreateCouponScreen}
          />
          <Stack.Screen name='Contact Us' component={Screens.ContactUsScreen} />
          <Stack.Screen
            name='Ticket Details'
            component={Screens.TicketDetailsScreen}
          />

          <Stack.Screen
            name='Cart'
            component={Screens.MyCartScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />

          <Stack.Screen
            name='Message'
            component={Screens.MessageScreen}
            options={{
              animation: 'slide_from_bottom',
            }}
          />

          <Stack.Screen
            name='Sign Up'
            component={Screens.SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='createPassword'
            component={Screens.PasswordCreationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='beFarmer'
            component={Screens.BeFarmerScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='FarmerCreateAccount'
            component={Screens.FarmerCreateAccountScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='homePage'
            component={Screens.ProductHomePageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='login'
            component={Screens.LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Product Detail'
            component={Screens.ProductDetailScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name='Email Verification'
            component={Screens.EmailVerificationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='EmailVerify'
            component={Screens.VerifyEmailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Phone Verification'
            component={Screens.PhoneVerificationScreen}
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
