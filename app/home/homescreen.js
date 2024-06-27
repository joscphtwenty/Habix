import React from "react";
import { View, Text, Image, Pressable, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const habit = require("../asset/habitter.jpg");

const HomeScreen = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Image
        source={habit}
        style={{
          position: "absolute",
          top: 250,
          left: 120,
          height: 150,
          width: 150,
        }}
      />
      <View
        style={{
          marginTop: 400,
          gap: 10,
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => {
            console.log("Journal button pressed");
            navigation.navigate("journal");
          }}
          style={{
            borderRadius: 25,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderColor: "#333",
            borderWidth: 1,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ color: "white", fontSize: 14 }}>Journal</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log("Journal button pressed");
            navigation.navigate("index");
          }}
          style={{
            borderRadius: 25,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderColor: "#333",
            borderWidth: 1,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ color: "white", fontSize: 14 }}>Tracker</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
