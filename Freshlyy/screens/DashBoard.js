import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { H1, P } from '../components/Texts';
import {FilledBigButton} from '../components/Buttons';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import InfoCardDB from '../components/InfoCardDB';
import DashBoardCard from '../components/DashBoardCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function () {
	return (
		<SafeAreaView>
			<View style={styles.screen}>
                <Header />
				<ScrollView showsVerticalScrollIndicator={false}>
					<InfoCardDB />
					<View style={styles.cardContainer}>
						<DashBoardCard
							imageUri={require('../assets/trade.png')} 
							number={10}
							text='Selling Products'
						/>
						<DashBoardCard 
							imageUri={require('../assets/gift.png')} 
							number={5}
							text='To-Ship Products'
						/>
					</View>
					<View style={styles.cardContainer}>
						<DashBoardCard 
							imageUri={require('../assets/box.png')} 
							number={100}
							text='Sold Products'
						/>
						<DashBoardCard 
							imageUri={require('../assets/pending.png')} 
							number={3}
							text='Pending Approvals'
						/>
					</View>
					<FilledBigButton title='Add Product' style={styles.button}/>
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
	cardContainer: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	button: {
		width: '85%',
		margin: 30,
		padding: 6,
	},
});
