import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { UserContext, user } from '../context/UserContext';
import * as Screens from '../screens';
import FarmerReportScreen from '../screens/farmerscreens/FarmerReportScreen';
const Stack = createNativeStackNavigator();

export default function App(props) {
  const [fonts] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });
  const userEmail = 'haritha@freshlyy.com';
  if (!fonts) return null;
  return (
    <UserContext.Provider value={null}>
      <NavigationContainer>
        <StatusBar barStyle='dark-content' />
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: 'none' }}
        >
          <Stack.Screen
            name='Start screen'
            component={Screens.LoginScreen}
            options={{
              headerShown: false,
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
            name='Checkout'
            component={Screens.LoginScreen}
            initialParams={{
              // purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
              // purl: 'nuwara_eliya_strawberries_63b6b7b160d78bea22456aa8',
              purl: 'sri_lankan_carrots_63b6b9929ad79279b814928f',
              userEmail: userEmail,
              initialTab: 'toPay',
            }}
          />

          <Stack.Screen
            name='GetStartedScreen'
            component={Screens.GetStartedScreen}
            initialParams={{
              userEmail: userEmail,
            }}
          />

          {/*       
          <Stack.Screen
            name='Sign Up'
            component={Screens.SignUpScreen}
            options={{
              headerShown: false,
            }}
          />  */}
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
            name='login'
            component={Screens.LoginScreen}
            options={{
              headerShown: false,
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

          {/* <Stack.Screen name='Profile' component={Screens.ProfileScreen} />  */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
