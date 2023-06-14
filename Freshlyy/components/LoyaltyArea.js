import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { P, Pr, H2, H4, H7, H6, H8 } from './Texts';
import Theme from '../constants/theme';
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Button } from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import platinum from '../assets/platinum.png';
import gold from '../assets/gold.png';
import silver from '../assets/silver.png';
import bronze from '../assets/bronze.png';
import none from '../assets/noloyal.png';
import theme from '../constants/theme';
import ProgressBar from './ProgressBar';

export default function (props) {
  function getLoyaltyBadge() {
    switch (props.user?.loyaltyMembership) {
      case 'Platinum':
        return platinum;
      case 'Gold':
        return gold;
      case 'Silver':
        return silver;
      case 'Bronze':
        return bronze;
      default:
        return none;
    }
  }
  return (
    <View style={styles.loyaltyArea}>
      <Image source={getLoyaltyBadge()} style={styles.loyaltyBadge} />
      <View style={styles.loyaltyDescription}>
        <P
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          ⓘ
        </P>
        {props.user?.loyaltyMembership !== 'None' ? (
          <>
            <H4 style={{ color: theme.primary, marginBottom: -5 }}>
              {props.user?.loyaltyMembership} Member
            </H4>
            <H6 style={{ marginBottom: 5 }}>
              {props.user?.loyaltyPoints} points
            </H6>
          </>
        ) : (
          <H7 style={{ marginBottom: 5 }}>
            Just {props.user?.loyaltyMax - props.user?.loyaltyPoints} more
            points to earn your first badge!
          </H7>
        )}

        {props.user?.loyaltyMembership !== 'Platinum' ? (
          <ProgressBar
            min={props.user?.loyaltyMin}
            max={props.user?.loyaltyMax}
            progress={props.user?.loyaltyPoints}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loyaltyArea: {
    flexDirection: 'row',
  },
  loyaltyBadge: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  loyaltyDescription: {
    paddingHorizontal: 10,
    flex: 1,
  },
  progressBar: {},
  progressBarUnfilled: {
    width: '100%',
    height: 6,
    backgroundColor: theme.textColor,
    borderRadius: 10,
  },
  progressBarFilled: {
    position: 'absolute',
    height: 6,
    backgroundColor: theme.primary,
    borderRadius: 10,
  },
  progressBarBounds: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
