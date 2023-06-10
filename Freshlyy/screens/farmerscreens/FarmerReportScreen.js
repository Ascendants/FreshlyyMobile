import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  SectionList,
} from "react-native";
import { H2, H4 } from "../../components/Texts";
import { Button } from "../../components/Buttons";
import Header from "../../components/Header";
import Theme from "../../constants/theme";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLabel,
  Circle,
  VictoryLegend,
  VictoryTooltip,
} from "victory-native";
import ProductCard from '../../components/ProductCard';
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg } from "react-native-svg";
import useAuth from "../../hooks/useAuth";
import ENV from "../../constants/env";

const data = {
    income: [
      { x: "Jan", y: 4000 },
      { x: "Feb", y: 5000 },
      { x: "Mar", y: 2000 },
      { x: "Apr", y: 1000 },
    ],
  };
  const DATA=[
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-4733f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0dff-3da1-4733f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0dff-3da1-4733f-bd96-1455551e29d72',
      title: 'Third Item',
    },
  ];

  export default function ({ navigation, route }) {
  
    const sendToProductDetail = async (pubUrl) => {
      navigation.navigate('Product Detail', {
        purl: pubUrl,
      });
    };
  return(
    <SafeAreaView>
        <View style={styles.screen}>
        <Header back={true} home={true} />
        <ScrollView>
        <View style={[styles.barchart, styles.shadowProp]}>
            
            <H4>Last Months Income </H4>
        <VictoryChart
              theme={VictoryTheme.material}
              //domainPadding={{ x: 0, y: 0 }}
              domainPadding={{ x: 20, y: 50 }}
              alignment='middle'
            >
              <VictoryAxis
                tickValues={[0, 1, 2, 3]}
                tickFormat={["Jan", "Feb", "Mar", "Apr"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => `Rs.${x / 1000}k`}
              />
              <VictoryBar
                data={data.income}
                labels={({ datum }) => datum.y}
                cornerRadius={{ topLeft: 8 }}
                alignment='start'
                x='Month'
                barWidth={18}
                style={{ data: { fill: Theme.primary } }}
                animate
              />
            </VictoryChart>
            </View>
            <View style={styles.piechart}>
            <H4>Last Month Income Split</H4>
            <Svg
              width={380}
              height={310}
              viewBox='-35 35 400 400'
              //style={{ position: "relative" }}
            >
              <VictoryPie
                standalone={false}
                width={399}
                height={398.1}
                data={[
                  { x: "50%", y: 40, label: null },
                  { x: "25%", y: 33 },
                  { x: "25%", y: 33 },
                ]}
                innerRadius={60}
                labelRadius={90}
                //labels={() => null}
                style={{ labels: { fontSize: 28, fill: "white" } }}
                animate={{
                  duration: 70000,
                  onLoad: {
                    duration: 47500,
                  },
                }}
                // animate={{
                //   duration: 3000,
                //   onLoad: {
                //     duration: 3000,
                //   },
                // }}
                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
              />
              <Circle
                cx={200}
                cy={200}
                r={63}
                fill='none'
                //stroke='black'
                strokeWidth={3}
              />
              <Circle
                cx={200}
                cy={200}
                r={150}
                fill='none'
                //stroke={Theme.primary}
                strokeWidth={3}
              />
              <VictoryLabel
                textAnchor='middle'
                verticalAnchor='middle'
                x={200}
                y={200}
                style={{ fontSize: 30, fill: "black" }}
                text='Income'
              />
              <VictoryLegend
                data={[
                  { name: "Carrots", symbol: { fill: "tomato", size: 8 } },
                  { name: "Beans", symbol: { fill: "orange", size: 8 } },
                  { name: "Mango", symbol: { fill: "gold", size: 8 } },
                ]}
                labelComponent={<VictoryLabel angle={360} />}
              />
            </Svg>
          </View>
          <View style={styles.bestselling}>
            <H4>Best Selling Products</H4>
            <FlatList
             horizontal
              data={DATA}
              renderItem={({ item }) => (
                <ProductCard
                      cardType='social'
                      title="strawberry"
                      id={item.id}
                      // userEmail={auth.user.userEmail}
                      // imageUrl={item.imageUrl}
                      // unit={item.unit}
                       likes="[nadun@gmail.com,harini@gmail.com]"
                      // overallRating={item.overallRating}
                      price={67}
                      farmerName="Nadun"
                      // publicUrl={item.publicUrl}
                      onPress={sendToProductDetail}
                      // onLike={handleLike}
                    />
              )}
              keyExtractor={(item) => item.id}
           
            />
          
          </View>
        </ScrollView>
        </View>
    </SafeAreaView>

  );

  }
  const styles = StyleSheet.create({
    screen: {
      height: "100%",
      paddingHorizontal: 5,
    },
    barchart: {
      marginHorizontal: 10,
      width: 390,
      backgroundColor: "#F2F2F2",
      borderRadius: 10,
    },
    piechart: {
      width: 390,
      marginHorizontal: 20,
    },
    bestselling:{
      padding:10
    }
  });