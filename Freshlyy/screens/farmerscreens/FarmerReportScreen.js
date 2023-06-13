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
import { H2, H4, H5 } from "../../components/Texts";
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
import ProductCard from "../../components/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg } from "react-native-svg";
import useAuth from "../../hooks/useAuth";
import ENV from "../../constants/env";
import * as Animatable from "react-native-animatable";
import { Animations } from "../../constants/Animation";

export default function ({ navigation, route }) {
  const [barChartData, setBarChartData] = useState();
  const [barChartMessage, setBarChartMessage] = useState();
  const [pieChartData, setPieChartData] = useState();
  const [colors, setColors] = useState();
  const [barChartGood, setBarChartGood] = useState(false);
  const [titles, setTitles] = useState();
  const [months, setMonths] = useState();
  const [pieChartMessage, setPieChartMessage] = useState();
  const [bestOverallProducts, setBestOverallProducts] = useState();
  const [randomNumber, setRandomNumber] = React.useState(null);
  const sendToProductDetail = async (pubUrl) => {
    navigation.navigate("Product Detail", {
      purl: pubUrl,
    });
  };

  const getReports = async (isRefreshing) => {
    // isRefreshing ? setRefreshing(true) : setLoaded(false);

    await fetch(ENV.backend + "/farmer/reports/", {
      //getting data from the backend (all products)
      method: "GET",
      headers: {
        Authorization: route.params?.auth,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBarChartData(res.barchart);
        setPieChartData(res.pieChartData);
        setColors(res.colors);
        setBarChartMessage(res.barChartMessage);
        setPieChartMessage(res.pieChartMessage);
        setBarChartGood(res.barchartGood);
        setTitles(res.titles);
        setBestOverallProducts(res.bestOverallProduct);
        setMonths(res.months);
        // isRefreshing ? setRefreshing(false) : setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getReports();
  }, []);

  const animation = Animations[Math.floor(Math.random() * Animations.length)];

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 15) + 1; // Generates a random number between 1 and 15
    setRandomNumber(number);
  };

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={false} home={true} />
        <ScrollView>
          <View style={[styles.barchart, styles.shadowProp]}>
            <H4>Last Months Income </H4>
            <VictoryChart
              theme={VictoryTheme.material}
              //domainPadding={{ x: 0, y: 0 }}
              domainPadding={{ x: 20, y: 50 }}
              alignment='middle'
            >
              <VictoryAxis tickValues={[0, 1, 2, 3]} tickFormat={months} />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => `Rs.${x / 1000}k`}
              />
              <VictoryBar
                data={barChartData}
                labels={({ datum }) => `Rs.${datum.y / 1000}k`}
                cornerRadius={{ topLeft: 8 }}
                alignment='start'
                x='Month'
                barWidth={18}
                style={{ data: { fill: Theme.primary } }}
                animate
              />
            </VictoryChart>
          </View>
          {barChartGood ? (
            <Animatable.View
              animation={animation}
              duration={1000}
              delay={randomNumber * 300}
            >
              <View style={styles.barChartView}>
                <View style={styles.barchartmessage}>
                  <H4>{barChartMessage}</H4>
                </View>
                <Image
                  source={require("../../assets/hurray.png")}
                  style={styles.vectorimage}
                />
              </View>
            </Animatable.View>
          ) : (
            <Animatable.View
              animation={animation}
              duration={1000}
              delay={randomNumber * 300}
            >
              <View style={styles.barChartView}>
                <View style={styles.barchartmessage}>
                  <H4>{barChartMessage}</H4>
                </View>
                <Image
                  source={require("../../assets/dontgiveup.png")}
                  style={styles.vectorimage}
                />
              </View>
            </Animatable.View>
          )}

          <View style={styles.piechart}>
            <H4>Last Month Income Split</H4>
            <Svg
              width={380}
              height={310}
              viewBox='-35 35 350 400'
              //style={{ position: "relative" }}
            >
              <VictoryPie
                standalone={false}
                width={399}
                height={398.1}
                data={pieChartData}
                innerRadius={60}
                labelRadius={90}
                //labels={() => null}
                style={{ labels: { fontSize: 28, fill: "white" } }}
                animate={{
                  duration: 4000,
                  onLoad: {
                    duration: 4000,
                  },
                }}
                colorScale={[
                  "tomato",
                  "orange",
                  "gold",
                  "cyan",
                  "navy",
                  "cornflowerblue",
                  "lightgreen",
                ]}
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
                orientation='vertical'
                gutter={10}
                data={titles}
                labelComponent={<VictoryLabel angle={360} />}
              />
            </Svg>
          </View>
          <Animatable.View
            animation={animation}
            duration={1000}
            delay={randomNumber * 300}
          >
            <View style={styles.pieChartView}>
              <View style={styles.barchartmessage}>
                <H4>{pieChartMessage}</H4>
              </View>
              <Image
                source={require("../../assets/fruits.png")}
                style={styles.pieChartImage}
              />
            </View>
          </Animatable.View>

          <View style={styles.bestselling}>
            <H4>Your Highest Rated Products</H4>
            <FlatList
              horizontal
              data={bestOverallProducts}
              renderItem={({ item }) => (
                <ProductCard
                  //cardType='social'
                  title={item.title}
                  id={item.id}
                  userID={route.params.userEmail}
                  imageUrl={item.imageUrl}
                  // unit={item.unit}
                  likes={item.likes}
                  overallRating={item.overallRating}
                  price={item.price}
                  //farmerName='Nadun'
                  // publicUrl={item.publicUrl}
                  // onPress={sendToProductDetail}
                  // onLike={handleLike}
                />
              )}
              keyExtractor={(item) => item._id}
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
    paddingHorizontal: 2,
  },
  barchart: {
    marginHorizontal: 10,
    width: 390,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
  },
  piechart: {
    width: 390,
    marginHorizontal: 10,
  },
  bestselling: {
    padding: 10,
  },
  barChartView: {
    display: "flex",
    flexDirection: "row",
    width: 380,
    paddingVertical: 20,
    paddingHorizontal: 5,
    paddingLeft: 5,
    backgroundColor: Theme.primaryShade,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  vectorimage: {
    alignItems: "center",
    width: 160, // Adjust the width to fit the image
    height: 170,
    marginRight: 10,
    marginVertical: 0,
  },
  barchartmessage: {
    width: 220,
    color: Theme.primary,
    paddingHorizontal: 5,
  },
  dontgiveupImage: {
    alignItems: "center",
    width: 160, // Adjust the width to fit the image
    height: 180,
    marginRight: 10,
    marginVertical: 0,
  },
  pieChartView: {
    display: "flex",
    flexDirection: "row",
    width: 380,
    paddingVertical: 20,
    paddingHorizontal: 5,
    paddingLeft: 5,
    backgroundColor: Theme.yellow,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  pieChartImage: {
    alignItems: "center",
    width: 160, // Adjust the width to fit the image
    height: 90,
    marginRight: 10,
    marginVertical: 0,
  },
});
