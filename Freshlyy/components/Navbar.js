import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Theme from '../constants/theme';

export default function () {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.iconBehave}>
                    <Image source={require('../assets/home.png')} style={styles.navLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBehave}>
                    <Image source={require('../assets/social-media.png')} style={styles.navLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBehave}>
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
        bottom: 20,    
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