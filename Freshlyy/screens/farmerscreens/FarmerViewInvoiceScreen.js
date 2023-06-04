import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H2, P, H3, H5, H6, H7, Pr } from '../../components/Texts';
import OrderInvoiceView from '../../components/OrderInvoiceView';
import Header from '../../components/Header';
import Theme from '../../constants/theme';
import ENV from '../../constants/env';
import ListItem from '../../components/ListItem';
import Box from '../../components/Box';
import Loading from '../../components/Loading';
import FadeComponent from '../../components/FadeComponent';
function PriceItem(props) {
  let color = { marginBottom: 5 };
  if (props.main) {
    color['color'] = Theme.primary;
  }
  return (
    <View style={styles.priceItemContainer}>
      <H5 style={color}>{props.title}</H5>
      <Pr
        style={{
          textAlign: 'right',
        }}
        fontSize={20}
      >
        {props.amount}
      </Pr>
    </View>
  );
}
function calculateNetEarnings(data) {
  return (
    data.totalEarnings -
    data.commissionAmount -
    data.cashInHand -
    data.couponCharges
  );
}
export default function ({ route, navigation }) {
  const [loaded, setLoaded] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [invoice, setInvoice] = React.useState({});
  const getData = React.useCallback(async (refreshing = false) => {
    refreshing ? setRefreshing(true) : setLoaded(false);
    return fetch(ENV.backend + '/farmer/invoice/' + route.params.invoiceId, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.invoice) {
          throw new Error('Invoice not found');
        }
        setInvoice(res.invoice);
        refreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  });
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        {!loaded ? (
          <Loading />
        ) : (
          <View style={styles.invoiceContainer}>
            <FadeComponent>
              <FlatList
                ListHeaderComponent={
                  <>
                    <H3 style={styles.invoiceInfo}>Invoice</H3>
                    <H7 style={styles.invoiceInfo} selectable={true}>
                      For the month {invoice?.date}
                    </H7>
                    <H6 style={styles.invoiceInfoFarmer}>
                      {invoice?.farmerName}
                    </H6>
                    <H6 style={styles.invoiceInfo}>{invoice?.farmerEmail}</H6>
                    <H7 style={styles.invoiceInfo}>{invoice?.farmerAddress}</H7>
                    <Box>
                      <ListItem>
                        <View style={{ width: '100%' }}>
                          <PriceItem
                            title='Total Earnings'
                            amount={invoice?.totalEarnings}
                            main={true}
                          />
                          <PriceItem
                            title='Commission Charged'
                            amount={invoice?.commissionAmount}
                          />
                          <PriceItem
                            title='Cash With You'
                            amount={invoice?.cashInHand}
                          />
                        </View>
                      </ListItem>
                      <View style={{ marginTop: 10 }}>
                        <PriceItem
                          title='Net Earnings'
                          amount={calculateNetEarnings(invoice)}
                        />
                      </View>
                    </Box>
                    <H3 style={styles.invoiceInfo}>Orders</H3>
                  </>
                }
                data={invoice?.orders}
                renderItem={({ item }) => (
                  <OrderInvoiceView
                    orderId={item.id}
                    orderDate={item.date}
                    orderNItems={item.nItems}
                    orderSubTotal={item.subTotal}
                    orderDeliveryCharge={item.deliveryCharge}
                    orderCommission={item.commission}
                    orderTotal={item.total}
                    key={item.id}
                  />
                )}
                keyExtractor={(item) => item.id}
                refreshing={refreshing}
                onRefresh={() => getData(true)}
                ListFooterComponent={<View style={{ height: 100 }}></View>}
              />
            </FadeComponent>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  invoiceContainer: {
    marginVertical: 10,
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  pageContent: {
    paddingHorizontal: 20,
  },
  invoiceInfo: {
    textAlign: 'center',
  },
  invoiceInfoFarmer: {
    textAlign: 'center',
    color: Theme.secondary,
  },
  orderContainer: {
    marginBottom: 100,
  },
});
