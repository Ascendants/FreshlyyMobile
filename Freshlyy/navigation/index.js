import React from 'react';
import {useAuth} from '../hooks/useAuth'
import  UserStack from '../navigation/userStack';
import  AuthStack from '../navigation/authStack';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from 'react-native';
export default function RootNavigation() {
    
    const { user } = useAuth();
    console.log(user);
    return user && user.emailVerifed ? <UserStack /> : <AuthStack />;
}

