import React, { useCallback, useRef, useState } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '../components/Buttons';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import SwipeOverlay from '../components/SwipeOverlay';
import InfoCardDB from '../components/InfoCardDB';
import DashBoardCard from '../components/DashBoardCard';
import ServicesCardDB from '../components/ServicesCardDB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import ENV from '../constants/env';
import { H4 } from '../components/Texts';

export default function () {
	const [userData, setUserData] = useState([]);
	const [product, setProduct] = useState([]);
	const sheetRef = useRef(null);
	const [isOpen, setIsOpen] = useState(true);

	const snapPoints = ['60%', '80%'];

	const handleSnapPress = useCallback((index) => {
		sheetRef.current?.snapToIndex(index);
		setIsOpen(true);
	}, []);

	React.useEffect(() => {
		fetch(ENV.backend + '/farmer/dashboard', {
			method: 'GET',
			headers: {
				useremail: 'komuthu@freshlyy.com',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.message != 'Success') {
					throw new Error('Something went wrong');
				}
				setUserData(res.user);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<SafeAreaView>
			<View style={styles.screen}>
				<Header />
				<ScrollView showsVerticalScrollIndicator={false}>
					<InfoCardDB user={userData} />
					<H4 style={styles.headings}>My Orders</H4>
					<View style={styles.cardContainer}>
						<TouchableOpacity
							style={styles.container}
							onPress={() => handleSnapPress(0)}
						>
							<DashBoardCard
								imageUri={require('../assets/gift.png')}
								number={10}
								text="New Orders"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.container}>
							<DashBoardCard
								imageUri={require('../assets/box.png')}
								number={5}
								text="Past Orders"
							/>
						</TouchableOpacity>
					</View>
          <H4 style={styles.headings}>My Listings</H4>
					<View style={styles.cardContainer}>
						<TouchableOpacity style={styles.container}>
							<DashBoardCard
								imageUri={require('../assets/trade.png')}
								number={100}
								text="Selling Products"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.container}>
							<DashBoardCard
								imageUri={require('../assets/pending.png')}
								number={3}
								text="Pending Approvals"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							size="big"
							color="shadedPrimary"
							title="Add new produce listing"
							// backgroundstyle={styles.button}
						/>
					</View>
					<ServicesCardDB />
				</ScrollView>
				{/* <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={() => setIsOpen(false)}
          >
            <BottomSheetView>
              <SwipeOverlay />
            </BottomSheetView>
        </BottomSheet> */}
				<Navbar />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		height: '100%',
		fontFamily: 'Poppins',
	},
	container: {
		alignItems: 'center',
		backgroundColor: Theme.overlay,
		width: '30%',
		height: 100,
		borderRadius: 10,
		justifyContent: 'center',
	},
  headings: {
    margin: 15,
    paddingHorizontal: 10,
  },
	cardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	buttonContainer: {
    margin: 20,
		alignItems: 'center',
	},
});
