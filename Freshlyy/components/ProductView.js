import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import {
  FontAwesome,
  MaterialIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import ListItem from './ListItem';
import ModalComponent from './ModalComponent';

export default function (props) {
  const [editModal, setEditModal] = React.useState(false);
  const product = props.product;
  async function editQuantity() {
    //create a modal component for editing the product quantity.
  }
  async function deleteItem() {
    const res = await fetch(ENV.backend + '/customer/cart/', {
      method: 'DELETE',
      headers: {
        userEmail: route.params.userEmail,
        purl: product.purl,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.cart) throw new Error('Malformed Response');
        setCart(res.cart);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <ModalComponent visible={editModal}></ModalComponent>
      {/* modal for the edit component */}
      <ListItem>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product?.imageUri?.imageUrl }}
            style={[
              styles.image,
              { backgroundColor: product?.imageUri?.placeholder },
            ]}
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
              icon={
                <FontAwesome name='trash-o' size={24} color={Theme.danger} />
              }
              size='small'
              color='shadedDanger'
              title='Remove'
            />
          </View>
        )}
      </ListItem>
    </>
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
