import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import {H5, H1, P} from "./Texts";
import Theme from "../constants/theme";
import { FilledNormalButton } from "../components/Buttons";

export default function() {
    return(
        <View style={styles.card}>
            <Image source={require('../assets/kom.jpg')} style={styles.image}/>
            <View style={styles.cardElements}>
                <P style={styles.name}>Komuthu Fernando</P>
                <Text style={styles.subTopic}>Total Earnings</Text>
                <Text style={styles.mainTopic}>Rs 10 000</Text>    
            </View>
            {/* <FilledNormalButton title="Withdraw" style={[styles.button, styles.buttonText]}/> */}
            <TouchableOpacity>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Withdraw</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        backgroundColor: Theme.primaryShadeLighter,
        width: '90%',
        height: 150,
        borderRadius: 30
    },

    cardElements: {
        flexDirection: 'column',
    },

    name: {

        color: Theme.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
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
        right: 20,
        // bottom: 0,
        backgroundColor: Theme.primary,
        padding: 5,
        width: '25%',
        borderRadius: 10,       
    },

    buttonText: {
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center'
    }

})