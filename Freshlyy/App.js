import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { P, H1 } from './components/Texts';
import Header from './components/Header';

import Theme from './constants/theme';

const Stack = createNativeStackNavigator();

import StartScreen from './screens/StartScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

export default function App() {
  const [fonts] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Medium.ttf'),
  });
  if (!fonts) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Product Details'
          component={ProductDetailScreen}
          options={{
            title: 'Carrots',
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name='Profile' component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
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
