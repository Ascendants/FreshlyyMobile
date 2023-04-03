import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { P, H1, H3, H4 } from "./components/Texts";
import Header from "./components/Header";
import { UserContext, user } from "./context/UserContext";
import Theme from "./constants/theme";

const Stack = createNativeStackNavigator();

import StartScreen from "./screens/StartScreen";
import GetStartedScreen from "./screens/GetStartedScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import VerifyEmail from "./screens/VerifyEmail";
import PhoneVerificationScreen from "./screens/PhoneVerificationScreen";
import FarmerDashBoardScreen from "./screens/FarmerDashboardScreen";
import MyCartScreen from "./screens/MyCartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeScreen from "./screens/HomeScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProductHomePageScreen from "./screens/ProductHomePageScreen";
import SocialCornerScreen from "./screens/SocialCornerScreen";
import LoginScreen from "./screens/LoginScreen";
import PasswordCreationScreen from "./screens/PasswordCreationScreen";
import BeFarmerScreen from "./screens/BeFarmerScreen";
import FarmerCreateAccountScreen from "./screens/FarmerCreateAccountScreen";
import MessageScreen from "./screens/MessageScreen";
import InsertProductScreen from "./screens/InsertProductScreen";
import ProductAddedScreen from "./screens/ProductAddedScreen";
import ProductUpdatedScreen from "./screens/ProductUpdated";
import ProductDeletedScreen from "./screens/ProductDelete";
import EorDproduct from "./screens/EorDproduct";
import CustomerDashboardScreen from "./screens/CustomerDashboardScreen";
import FarmerDashboardScreen from "./screens/FarmerDashboardScreen";
import HelpCenterScreen from "./screens/HelpCenterScreen";
import CantSignInScreen from "./screens/CantSignInScreen";
import HelpWithanOrderScreen from "./screens/HelpWithanOrderScreen";
import FoodDamagedScreen from "./screens/FoodDamagedScreen";
import CardScreen from "./screens/CardScreen";
import AddCardScreen from "./screens/AddCardScreen";
import SelectOrderScreen from "./screens/SelectOrderScreen";
import OrderIsWrong from "./screens/OrderIsWrong";
import OrderNeverArrivedg from "./screens/OrderNeverArrivedg";
import OrderListScreen from "./screens/OrderListScreen";

import OrderStatusScreen from "./screens/OrderStatusScreen";
import OtherPaymentScreen from "./screens/OtherPaymentScreen";
import AddCardScreenBackup from "./screens/AddCardScreenBackup";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import VerifyYourEmail from "./screens/VerifyYourEmail";
import CreateNewPassword from "./screens/CreateNewPassword";
import { G } from "react-native-svg";
import AddBankAccountScreen from "./screens/AddBankAccountScreen";
import EditProductScreen from "./screens/EditProductScreen";
import FarmerFollowerScreen from "./screens/FarmerFollowerScreen";
import LocationScreen from "./screens/LocationScreen";
import OrderReviewScreen from "./screens/OrderReviewScreen";
import ReviewedOrderScreen from "./screens/ReviewedOrderScreen";
import LocationAddScreen from "./screens/LocationAddScreen";
import FarmerDetailScreen from "./screens/FarmerDetailScreen";

import OrderCancelScreen from "./screens/OrderCancelScreen";
import ConfirmPickupScreen from "./screens/ConfirmPickupScreen";
import CreateCouponScreen from "./screens/CreateCouponScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import TicketStatusScreen from "./screens/TicketStatusScreen";
import TicketDetailsScreen from "./screens/TicketDetailsScreen";

import FarmerBalancesScreen from "./screens/FarmerBalancesScreen";
import ConfirmRequestWithdrawalScreen from "./screens/ConfirmRequestWithdrawalScreen";
import PayoutRequestListScreen from "./screens/PayoutRequestListScreen";
import FarmerInvoicesScreen from "./screens/FarmerInvoicesScreen";
export default function App() {
  const [fonts] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });
  const userEmail = "haritha@freshlyy.com";
  if (!fonts) return null;
  return (
    <UserContext.Provider value={null}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: "none" }}
        >
          <Stack.Screen
            name="Checkout"
            component={InsertProductScreen}
            initialParams={{
              // purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
              // purl: 'nuwara_eliya_strawberries_63b6b7b160d78bea22456aa8',
              purl: "sri_lankan_carrots_63b6b9929ad79279b814928f",
              userEmail: userEmail,
              initialTab: "toPay",
            }}
          />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen
            name="Farmer Dashboard"
            component={FarmerDashboardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Farmer Balance"
            component={FarmerBalancesScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Configure Bank"
            component={AddBankAccountScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="GetStartedScreen"
            component={GetStartedScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />

          <Stack.Screen
            name="Confirm Pickup"
            component={ConfirmPickupScreen}
            initialParams={{
              userEmail: userEmail,
            }}
            options={{
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="Orders List"
            component={OrderListScreen}
            initialParams={{
              userEmail: userEmail,
              initialTab: "All",
            }}
          />
          <Stack.Screen
            name="Farmer Payout Requests"
            component={PayoutRequestListScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Farmer Invoices"
            component={FarmerInvoicesScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Order Details"
            component={OrderStatusScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Card Management"
            component={CardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Add Card"
            component={AddCardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Add New Card"
            component={OtherPaymentScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Customer Dashboard"
            component={CustomerDashboardScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="editScreen"
            component={EditProductScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="productupdated"
            component={ProductUpdatedScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="productAddedSuccessfully"
            component={ProductAddedScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />
          <Stack.Screen
            name="Order Cancel Screen"
            component={OrderCancelScreen}
            initialParams={{
              userEmail: userEmail,
            }}
            options={{
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="Payout Request Screen"
            component={ConfirmRequestWithdrawalScreen}
            initialParams={{
              userEmail: userEmail,
            }}
            options={{
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="Help Center" component={HelpCenterScreen} />
          <Stack.Screen name="Cant sign in" component={CantSignInScreen} />
          <Stack.Screen name="Food Damaged" component={FoodDamagedScreen} />
          <Stack.Screen name="Select the Order" component={SelectOrderScreen} />
          <Stack.Screen
            name="Help with an order"
            component={HelpWithanOrderScreen}
          />
          <Stack.Screen
            name="Order Naver Arrived"
            component={OrderNeverArrivedg}
          />
          <Stack.Screen name="Order is Wrong" component={OrderIsWrong} />
          <Stack.Screen
            name="Order Details Help Center"
            component={HelpWithanOrderScreen}
          />
          <Stack.Screen name="Create Coupon" component={CreateCouponScreen} />
          <Stack.Screen name="Contact Us" component={ContactUsScreen} />
          <Stack.Screen name="Ticket Details" component={TicketDetailsScreen} />

          <Stack.Screen name="Cart" component={MyCartScreen} />

          <Stack.Screen
            name="Message"
            component={MessageScreen}
            options={{
              animation: "slide_from_bottom",
            }}
          />

          <Stack.Screen
            name="Sign Up"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="createPassword"
            component={PasswordCreationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="beFarmer"
            component={BeFarmerScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FarmerCreateAccount"
            component={FarmerCreateAccountScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="homePage"
            component={ProductHomePageScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Product Detail"
            component={ProductDetailScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Email Verification"
            component={EmailVerificationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EmailVerify"
            component={VerifyEmail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Phone Verification"
            component={PhoneVerificationScreen}
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
