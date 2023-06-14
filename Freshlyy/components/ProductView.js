import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { H6, H3, H4, P, Pr } from '../components/Texts';
import { Button } from '../components/Buttons';
import Theme from '../constants/theme';
import CartCard from './CartCard';
import {
  FontAwesome,
  MaterialIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import ListItem from './ListItem';
import ModalComponent from './ModalComponent';
import ENV from '../constants/env';

export default function (props) {
  // const [editModal, setEditModal] = React.useState(false);
  const [product, setProduct] = React.useState(props.product);
  const [deleting, setDeleting] = React.useState(false);
  // const [selectedQuantity, setSelectedQuantity] = React.useState(product.qty);
  // const editCart = async () => {
  //   await fetch(ENV.backend + '/customer/cart/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: props.auth,
  //     },
  //     body: JSON.stringify({
  //       productId: product.item,
  //       quantity: product.selectedQuantity,
  //     }),
  //   });
  //   const result = res.json();
  //   if (result.message == 'Success') {
  //     return 1;
  //   }
  //   if (result.message == 'Quantity unavailable') {
  //     return 0;
  //   }
  //   return -1;
  // };
  const openEditModal = async () => setEditModal(true);
  // const result = await fetch(ENV.backend + '/customer/item/' + product.item, {
  //   headers: {
  //     Authorization: props.auth,
  //   },
  // });
  // const res = await result.json();
  // if (res.message == 'Success') {
  //   setProduct((prev) => {
  //     return {
  //       ...prev,
  //       price: res.product.price,
  //       minQtyIncrement: res.product.minQtyIncrement,
  //     };
  //   });
  //   setEditModal(true);
  // } else {
  //   console.log(res.message);
  // }
  async function deleteItem() {
    setDeleting(true);
    const res = await fetch(
      ENV.backend + '/customer/cart/delete/' + product.item,
      {
        method: 'POST',
        headers: {
          Authorization: props.auth,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message == 'Success') {
          props.getData();
        }
      })
      .catch((err) => console.log(err));
    setDeleting(false);
  }
  // function increaseQuantity() {
  //   fetch(ENV.backend + '/customer/item/' + product.item, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: props.auth,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       const availableQuantity = res.product?.qtyAvailable;
  //       if (newQuantity <= availableQuantity) {
  //         const newQuantity = selectedQuantity + res.product.minQtyIncrement || 1;

  //         setSelectedQuantity(newQuantity);
  //         setProduct((prev) => {
  //           return {
  //             ...prev,
  //             price: res.product.price,
  //           };
  //         });
  //       } else {
  //         setSoldout(true);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function decreaseQuantity() {
  //   setSelectedQuantity((curr) =>
  //     Math.max(
  //       curr - product?.minQtyIncrement || 1,
  //       product?.minQtyIncrement || 1
  //     )
  //   );
  // }
  return (
    <>
      {/* <ModalComponent
        visible={editModal}
        closeModal={() => setEditModal(false)}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <View style={{ marginRight: 10 }}>
              <Image
                source={{ uri: product?.imageUri?.imageUrl }}
                style={[
                  styles.image,
                  { backgroundColor: product?.imageUri?.placeholder },
                ]}
              />
            </View>
            <View style={{ alignSelf: 'center' }}>
              <H6 style={{ fontFamily: 'Poppins' }}>{product.title}</H6>
              {!props.ordered && <P>Sold by {product.farmerName}</P>}
            </View>
          </View>
          <View style={styles.qtyArea}>
            <Button
              size='big'
              color='shadedPrimary'
              title={<Feather name='minus' size={24} color={Theme.primary} />}
              onPress={decreaseQuantity}
            />
            <H3 style={{ width: 100, textAlign: 'center' }}>
              {selectedQuantity} KG
            </H3>
            <Button
              size='big'
              color='filledPrimary'
              title={
                <Ionicons
                  name='add-outline'
                  size={24}
                  color={Theme.contrastTextColor}
                />
              }
              onPress={increaseQuantity}
            />
          </View>
          <Button
            size='big'
            color='shadedPrimary'
            title='Update'
            onPress={editCart}
          />
        </View>
      </ModalComponent> */}
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
            {/* <Button
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
              onPress={openEditModal}
            /> */}
            <Button
              type='icon'
              icon={
                <FontAwesome name='trash-o' size={24} color={Theme.danger} />
              }
              size='small'
              color='shadedDanger'
              title='Remove'
              loading={deleting}
              onPress={deleteItem}
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
  qtyArea: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
