import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
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
} from "victory-native";
import { SafeAreaView } from "react-native-safe-area-context";

const data = {
  income: [
    { x: "Jan", y: 40 },
    { x: "Feb", y: 50 },
    { x: "Mar", y: 20 },
    { x: "Apr", y: 100 },
  ],
};

export default function ({ navigation, route }) {
  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Header back={true} home={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.barchart, styles.shadowProp]}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 0, y: 0 }}
             
            >
              <VictoryAxis
                tickValues={[0, 1, 2, 3]}
                tickFormat={["Jan", "Feb", "Mar", "Apr"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => `$${x / 1000}k`}
              />
              <VictoryBar
                data={data.income}
                x="Month"
                barWidth={18}
                style={{ data: { fill: Theme.primary } }}
                animate={{
                  duration: 3000,
                  onLoad: {
                    duration: 3000,
                  },
                }}
              />
    
            </VictoryChart>
          </View>
          <View>
            <VictoryPie
              standalone={true}
              width={400}
              height={400}
              data={[
                { x: "A", y: 40 },
                { x: "B", y: 33 },
                { x: "C", y: 33 },
              ]}
              innerRadius={70}
              labelRadius={100}
              style={{ labels: { fontSize: 20, fill: "white" } }}
            />
            <Circle
              cx="200"
              cy="200"
              r="65"
              fill="none"
              stroke="black"
              strokeWidth={3}
            />
            <Circle
              cx="200"
              cy="200"
              r="155"
              fill="none"
              stroke="black"
              strokeWidth={3}
            />
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={300}
              y={300}
              style={{ fontSize: 30,fill:"black", }}
              text="Label"
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
  },
  barchart: {
    marginHorizontal: 20,
    width: 380,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
  },
});
