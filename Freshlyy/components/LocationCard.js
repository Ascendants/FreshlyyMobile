import { contains } from '@firebase/util';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { H1, H2 ,P, Pr, H5, H6} from '../components/Texts';
import Theme from '../constants/theme';
import { FilledBigButton } from '../components/Buttons';
import theme from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Button } from '../components/Buttons';
import Rating from '../components/Rating';
import { AntDesign,Ionicons } from '@expo/vector-icons';

export default function () {
    return (
        <View style={styles.screen}>
        <View style={styles.card}>
            <Button
                icon={
                    <Ionicons
                        name='location'
                        size={40}
                        color={Theme.danger}
                    />
                }
                type='icon'
                size='small'
            />
            <View style={styles.address}>
                <H5>My Home</H5>
                <H6>No 12, 2nd Lane,</H6>
                <H6>Moratuwa</H6>
            </View>
            <Button
                icon={
                    <Ionicons
                        name='pencil-outline'
                        size={25}
                        color={Theme.textColor}
                    />
                }
                type='icon'
                size='small'
                color='shadedPrimary'
                style={styles.icon}
            />
            <Button
                icon={
                    <Ionicons
                        name='trash-outline'
                        size={25}
                        color={Theme.textColor}
                        
                    />
                }
                type='icon'
                size='small'
                color='shadedDanger'
                style={styles.icon}
            />
            
        </View>
        <View style={styles.lineStyle}>

        </View>
            
        </View>
  );
}
const styles = StyleSheet.create({
    screen: {
        //flex: 1,
        fontFamily: 'Poppins',
    },
    card: {
        display:'flex',
        padding:8,
        flexDirection:'row',
        alignItems:'center',
        //paddingLeft:20,
        //backgroundColor:Theme.overlay,
        width:'90%',
        height:80,
        marginVertical:10,
        //justifyContent:'space-between',
        },
    address:{
        display:'flex',
        flexDirection:'column',
        marginHorizontal:20,
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        marginBottom:20,
    },
    icon:{
        justifyContent:'center',
        marginRight:0,
        marginLeft:0,
    }
});
