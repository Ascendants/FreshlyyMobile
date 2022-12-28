import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { H1, P } from '../components/Texts';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import InfoCardDB from '../components/InfoCardDB';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function () {
	return (
		<SafeAreaView>
			<View style={styles.screen}>
                <Header />
				<ScrollView showsVerticalScrollIndicator={false}>
					<InfoCardDB />
				</ScrollView> 
				<Navbar />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
        height:'100%',
		// justifyContent: 'center',
		// alignContent: 'center',
		fontFamily: 'Poppins',
	},
});
