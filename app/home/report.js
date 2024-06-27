import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const habeet = require("../asset/habitter.jpg");

const Report = () => {
  const router = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://172.20.10.6:3000/journalentrieslist"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const renderGraphs = (data) => {
    if (!data || data.length === 0) return null;

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return daysOfWeek.map((dayName, index) => {
      const dayData = data.find(
        (item) => new Date(item.createdAt).getDay() === index
      );

      const compoundValue = dayData && dayData.compound ? dayData.compound : 0;

      const backgroundColor = compoundValue < 0 ? "red" : "#39FF14";

      return (
        <View key={index} style={{ marginRight: 10, paddingLeft: 10 }}>
          <View
            style={{
              width: 10,
              paddingLeft: 15,
              height: Math.abs(compoundValue) * 200,
              backgroundColor: backgroundColor,
              borderRadius: 25,
            }}
          />
          <Text style={{ color: "white", textAlign: "center", marginTop: 5 }}>
            {dayName}
          </Text>
        </View>
      );
    });
  };
  /*const renderGraphs1 = (data) => {
    // Check if data is defined and not empty
    if (!data || data.length === 0) return null;

    // Map over the data and display lines for each journal entry
    return data.map((entry, index) => {
      // Extract the compound value from the entry
      const compoundValue = entry.compound || 0;
      // Determine background color based on compound value
      const backgroundColor = compoundValue < 0 ? "red" : "#39FF14";

      // Return a view for each entry
      return (
        <View key={index} style={{ marginRight: 10, paddingBottom: 20 }}>
          <View
            style={{
              width: 3,

              height: Math.abs(compoundValue) * 100, // Adjust the multiplier to scale the height
              backgroundColor: backgroundColor,
              borderRadius: 25,
            }}
          />
          { You can add additional information here if needed }
        </View>
     */

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign
            onPress={() => router.navigate("journal")}
            name="arrowleft"
            size={20}
            color="white"
          />
          <Image source={habeet} style={{ height: 60, width: 60 }} />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Report
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 300,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingTop: 20,
          }}
        >
          Weekly
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          paddingLeft: 20,
          borderWidth: 1,
          borderColor: "#333",
          paddingTop: 50,
          paddingBottom: 30,
          borderRadius: 25,
        }}
      >
        {renderGraphs(data)}
      </View>
    </ScrollView>
  );
};

export default Report;

const styles = StyleSheet.create({});
