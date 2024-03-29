import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H5, Pr, H3, P, H4, H6 } from '../../components/Texts';
import Theme from '../../constants/theme';
import ENV from '../../constants/env';
import RefreshView from '../../components/RefreshView';
import Box from '../../components/Box';
import ListItem from '../../components/ListItem';
import { Button } from '../../components/Buttons';

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
    data.commissionCharged -
    data.cashInHand -
    data.couponCharges
  );
}

export default function ({ navigation, route }) {
  const [data, setData] = useState({});
  function viewOrders(type) {
    navigation.navigate('Orders List', {
      initialTab: type,
    });
  }
  const getData = React.useCallback(async () => {
    return fetch(ENV.backend + '/farmer/earnings', {
      method: 'GET',
      headers: {
        Authorization: route.params.auth,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != 'Success') {
          throw new Error('Something went wrong');
        }
        setData(res.earnings);
      })
      .catch((err) => console.log(err));
  },[]);
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <RefreshView getData={getData} route={route}>
          <H3 style={{ textAlign: 'center' }}>Your Earnings</H3>
          <Box>
            <ListItem>
              <View style={{ width: '100%' }}>
                <PriceItem
                  title='Total Earnings'
                  amount={data.totalEarnings}
                  main={true}
                />
                <PriceItem
                  title='Commission Charged'
                  amount={data.commissionCharged}
                />
                <PriceItem title='Cash With You' amount={data.cashInHand} />
              </View>
            </ListItem>
            <View style={{ marginTop: 10 }}>
              <PriceItem
                title='Net Earnings'
                amount={calculateNetEarnings(data)}
              />
            </View>
          </Box>
          <Box color={data.isWithdrawable ? 'primary' : 'danger'}>
            <PriceItem
              title='Withdrawable Balance'
              amount={data.withdrawable}
            />
            {!data.isWithdrawable && data.withdrawable >= 0 && (
              <P style={styles.infoTextLast}>
                ⓘ Balance must be more than <Pr>2000</Pr> to withdraw
              </P>
            )}
            {!data.isWithdrawable && data.withdrawable < 0 && (
              <>
                <P style={styles.infoTextLast}>
                  ⓘ Please payout the outstanding balance within 30 days to
                  prevent suspension
                </P>
                <Button
                  title='Settle Account'
                  color='filledPrimary'
                  size='big'
                  onPress={() => navigation.navigate('Settle Account')}
                />
                <P style={styles.infoTextLast}>
                  ⓘ Negative since {data.negativeSince}
                </P>
              </>
            )}
          </Box>
          {data.hasBankAccount && (
            <>
              <View style={styles.bankInfo}>
                <H4 style={{ marginBottom: 10, color: Theme.secondary }}>
                  Bank Account Information
                </H4>
                <H5>{data.bank}</H5>
                <H6>{data.bankAccountNum}</H6>
              </View>
              {data.isWithdrawable && (
                <Button
                  size='big'
                  color='filledPrimary'
                  title='Request Withdrawal'
                  onPress={() =>
                    navigation.navigate('Payout Request Screen', {
                      withdrawable: data.withdrawable,
                    })
                  }
                />
              )}
            </>
          )}
          {!data.hasBankAccount && data.isWithdrawable && (
            <>
              <View style={styles.bankInfo}>
                <H4
                  style={{
                    marginBottom: 10,
                    color: Theme.secondary,
                    textAlign: 'center',
                  }}
                >
                  Add a bank account to withdraw!
                </H4>
                <Button
                  size='big'
                  color='filledPrimary'
                  title='Add Bank Account'
                  onPress={() => navigation.navigate('Configure Bank')}
                />
              </View>
            </>
          )}
          <Button
            size='big'
            color='shadedSecondary'
            title='View Payout Requests'
            onPress={() => navigation.navigate('Farmer Payout Requests')}
          />
          <Button
            size='big'
            color='shadedSecondary'
            title='View Invoices'
            onPress={() => navigation.navigate('Farmer Invoices')}
          />
          <Button size='big' color='shadedWarning' title='Contact Support' />
          {data.hasBankAccount && (
            <Button
              size='big'
              color='shadedTertiary'
              title='Change Bank Account'
              onPress={() => navigation.navigate('Configure Bank')}
            />
          )}
          <View style={styles.infoTextCont}>
            <P style={{ textAlign: 'center' }}>
              Last updated {data.lastUpdate}
            </P>
            <P style={styles.infoTextLast}>
              ⓘ Balance updates 3 days after an order is complete
            </P>
          </View>
        </RefreshView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    fontFamily: 'Poppins',
  },
  priceItemContainer: {
    width: '100%',
  },
  infoTextCont: {
    textAlign: 'center',
    margin: 20,
    marginBottom: 40,
  },
  infoTextLast: {
    marginTop: 10,
    textAlign: 'center',
  },
  bankInfo: {
    margin: 10,
    marginVertical: 30,
  },
});
