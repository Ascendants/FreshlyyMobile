import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

export default function (props) {
  const product = props.product;
  return (
    <ListItem>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUri.imageUrl }}
          style={[styles.image, { backgroundColor: product.imageUri.placeholder }]}
        />
      </View>
      <View style={styles.descContainer}>
        <H6 style={{ fontFamily: 'Poppins' }}>{product.title}</H6>
        {!props.ordered && <P>Sold by {product.farmerName}</P>}
        <P>{product.qty} KG</P>
        <Pr>{product.uPrice * product.qty}</Pr>
      </View>
      {!props.ordered && (
        <View style={styles.actionContainer}>
          <Button
            type='icon'
            icon={
              <MaterialIcons
                name='mode-edit'
                size={24}
                color={Theme.secondary}
              />
            }
            size='small'
            color='shadedSecondary'
            title='Edit'
          />
          <Button
            type='icon'
            icon={<FontAwesome name='trash-o' size={24} color={Theme.danger} />}
            size='small'
            color='shadedDanger'
            title='Remove'
          />
        </View>
      )}
    </ListItem>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 18,
  },
  image: {
    resizeMode: 'cover',
    width: 70,
    height: 70,
    borderRadius: 18,
  },
  descContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    height: '100%',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
});
