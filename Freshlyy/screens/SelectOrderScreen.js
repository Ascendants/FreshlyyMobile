import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '../constants/theme';
import { P, H4, H5 } from '../components/Texts';
import { AntDesign } from '@expo/vector-icons';
import OrderView from '../components/OrderView';

export default function ({navigation}){
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    fetch('/get-order/:orderId')
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  return(
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true}/>
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOrderPress(item)}>
                <Text>{item.orderNumber}</Text>
              </TouchableOpacity>
            )}
          />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  container: {
    margin: 10,
    height: "100%",
    paddingHorizontal: 20,
  },

})