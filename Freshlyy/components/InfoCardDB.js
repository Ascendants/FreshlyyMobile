import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import {H4, H1} from "./Texts";
import theme from "../constants/theme";

export default function() {
    return(
        <View style={styles.card}>
            <Image source={require('../assets/kom.jpg')} style={styles.image}/>
            <View style={styles.cardElements}>
                <Text style={styles.name}>Komuthu Fernando</Text>
                <Text style={styles.subTopic}>Total Earnings</Text>
                <Text style={styles.mainTopic}>Rs 10 000</Text>    
            </View>
            <TouchableOpacity>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>WITHDRAW</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        backgroundColor: theme.primaryShadeLighter,
        width: '90%',
        height: 150,
        borderRadius: 30
    },

    cardElements: {
        flexDirection: 'column',
    },

    name: {
        fontFamily: 'Poppins',
        fontWeight: 'Light',
        color: theme.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignContent: 'flex-start'
    },

    subTopic: {
        fontSize: 22,
        fontWeight: '500',
        color: 'black',
        paddingHorizontal: 20,
        alignContent: 'flex-start',
    },

    mainTopic: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 20,
        alignContent: 'flex-start'
    },

    image: {
        position: 'absolute',
        right: 20,
        top: 20,
        alignSelf: 'flex-end',
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    button: {
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: theme.primary,
        padding: 2,
        width: '25%',
        right: 20,
        bottom: 0,
        borderRadius: 10
    },

    buttonText: {
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center'
    }

})