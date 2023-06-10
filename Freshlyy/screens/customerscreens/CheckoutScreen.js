import React from "react";
import { StyleSheet, View, Image, ScrollView, StatusBar } from "react-native";
import { H3, H4, Pr } from "../../components/Texts";
import Theme from "../../constants/theme";
import { Button } from "../../components/Buttons";
import theme from "../../constants/theme";
import { UserContext } from "../../context/UserContext";
import FadeComponent from "../../components/FadeComponent";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductView from "../../components/ProductView";
import DeliveryView from "../../components/DeliveryView";
import LoadingModal from "../../components/LoadingModal";
import ENV from "../../constants/env";
import Loading from "../../components/Loading";
import RefreshView from "../../components/RefreshView";
import useAuth from "../../hooks/useAuth";
import { getAuth } from "firebase/auth";

export default function ({ navigation, route }) {
  const auth = useAuth();
  const [loaded, setLoaded] = React.useState(false);
  const [orderData, setOrderData] = React.useState({
    selectedPaymentMethod: "cod",
  });
  const [deliveries, setDeliveries] = React.useState({});
  const [confirmOrder, setConfirmOrder] = React.useState(false);
  const [subTotal, setSubTotal] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [cart, setCart] = React.useState([]);

  async function placeOrder() {
    const data = {};
    setConfirmOrder(true);
    data.deliveryCharges = [];
    Object.keys(deliveries).forEach((farmer) => {
      data.deliveryCharges.push({
        farmer: farmer,
        delivery: deliveries[farmer],
      });
    });
    fetch(ENV.backend + "/customer/place-order/", {
      method: "POST",
      headers: {
        userEmail: route.params.userEmail,
        "Content-Type": "application/json",
        //this will be replaced with an http only token
        //after auth gets set
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != "Success") throw new Error("Something went wrong");
        navigation.navigate("Payment", {
          orders: res.orderDetails,
          userEmail: route.params.userEmail,
        });
        setConfirmOrder(false);
      })
      .catch((err) => {
        setConfirmOrder(false);
        if ((err.message = "Not Available")) {
          navigation.navigate("Message", {
            type: "fail",
            messageTitle: "Order could not be placed :(",
            messageText: "One or more items in cart was not available.",
            goto: "Cart",
          });
          return;
        }
        navigation.navigate("Message", {
          type: "fail",
          messageTitle: "Order could not be placed :(",
          messageText: "Something went wrong. Please try again.",
          goto: "Checkout",
        });
      });
  }
  function setDelivery(farmer, value) {
    setDeliveries((curr) => {
      const newOb = { ...curr };
      newOb[farmer] = value;
      return newOb;
    });
  }
  React.useEffect(() => {
    setTotal(() => {
      let total = subTotal;
      Object.keys(deliveries).forEach((key) => {
        if (deliveries[key]) {
          const deliveryItem = cart.find((item) => item.farmer == key);
          if (deliveryItem) {
            total += deliveryItem.costPerKM * deliveryItem.distance;
          }
        }
      });
      return total;
    });
    setSubTotal(
      cart.reduce(
        (partial, curr) =>
          partial + curr.items.reduce((p, c) => p + c.uPrice * c.qty, 0),
        0
      )
    );
  }, [cart, subTotal, deliveries, total]);
  console.log(auth.user);
  const getData = React.useCallback(async () => {
    if (auth.initializing) {
      return;
    }
    return fetch(ENV.backend + "/customer/cart/", {
      method: "GET",
      headers: {
        Authorization: auth.user?.accessToken,
        //this will be replaced with an http only token
        //after auth gets set
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.cart) throw new Error("Malformed Response");
        setCart(res.cart);

        setDeliveries((curr) => {
          res.cart.forEach((item) => {
            curr[item.farmer] = true;
          });
          return curr;
        });
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [auth.user?.accessToken]);

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <View style={styles.screen}>
          <LoadingModal message='Placing Order' visible={confirmOrder} />
          <Header back={true} />
          <RefreshView getData={getData}>
            <View style={styles.pageContent}>
              <H3 style={styles.title}>Your Order</H3>
              <View style={styles.pageArea}>
                {cart?.map((farmer) =>
                  farmer.items.map((item) => (
                    <ProductView key={item.item} product={item} />
                  ))
                )}
              </View>
              <View style={styles.pageArea}>
                <H3>Sub Total</H3>
                <Pr fontSize={30}>{subTotal.toFixed(2)}</Pr>
              </View>
              <View style={styles.pageArea}>
                <H4 style={styles.title}>Delivery Costs</H4>
                {cart.map((farmer) => (
                  <DeliveryView
                    option={farmer}
                    key={farmer?.farmer}
                    delivery={deliveries[farmer?.farmer]}
                    setDelivery={(value) => setDelivery(farmer?.farmer, value)}
                  />
                ))}
              </View>
              <View style={styles.pageArea}>
                <H3>Total</H3>
                <Pr fontSize={30}>{total.toFixed(2)}</Pr>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  size='big'
                  color='filledWarning'
                  title='Confirm Order'
                  onPress={placeOrder}
                />
              </View>
            </View>
          </RefreshView>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  pageContent: {
    paddingHorizontal: 10,
  },
  pageArea: {
    marginBottom: 15,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
});
