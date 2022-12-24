import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { P, H1 } from './components/Texts';

import Theme from './constants/theme';

const Stack = createNativeStackNavigator();

import StartScreen from './screens/StartScreen';

export default function App() {
  const [fonts] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Medium.ttf'),
  });
  if (!fonts) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={StartScreen}
          options={{
            title: '',
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
