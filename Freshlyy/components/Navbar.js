import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Theme from '../constants/theme';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

export default function ({screenName}) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.iconBehave}>
                    <Image source={require('../assets/home.png')} style={styles.navLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBehave}>
                    <Image source={require('../assets/social-media.png')} style={styles.navLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBehave} title={`Go to ${screenName}`} onPress={() => navigation.navigate(screenName)}>
                    <Image source={require('../assets/shopping-cart.png')} style={styles.navLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBehave}>
                    <Image source={require('../assets/user.png')} style={styles.navLogo} tintColor='#10AB68'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width:'100%',
        bottom: 0,
            
    },
    navbar: {
        flexDirection: 'row',
        backgroundColor: Theme.overlay,
        borderRadius: 40,
        width: '95%',
        justifyContent: 'space-evenly'

    },
    iconBehave: {
        padding: 14
    },
    navLogo: {
        width: 26,
        height: 26 
    }
})