import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";

import axios from "axios";

const create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const Navigation = useNavigation();
  const colors = [
    "#1b85b8",
    "#5a5255",
    "#559e83",
    "#ae5a41",
    "#c3cb71",
    "#CCCCFF",
    "#ffbdbd",
  ];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  async function addHabit() {
    try {
      const habitDetails = {
        title: title,
        color: selectedColor,
        repeatMode: "daily",
        reminder: true,
      };

      const response = await axios.post(
        "http://172.20.10.6:3000/habits",
        habitDetails
      );

      if (response.status === 200) {
        setTitle("");
        Alert.alert("Habit added succesfully", "Enjoy Practising");
      }

      console.log("habit added", response);
    } catch (error) {
      console.log("error adding a habit", error);
    }
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: "black", padding: 10, paddingTop: 20 }}
    >
      <AntDesign
        onPress={() => Navigation.navigate("index")}
        name="arrowleft"
        size={20}
        color="white"
      />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: 300,
          marginTop: 10,
          padding: 5,
        }}
      >
        Create Habit
      </Text>

      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          backgroundColor: "transparent",
          borderRadius: 25,
          borderColor: "#333",
          borderWidth: 1,
          paddingVertical: 20,
          color: "white",
          marginTop: 5,

          padding: 15,
        }}
        placeholder="Title"
        placeholderTextColor={"#999"}
      />

      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: 300,
            marginTop: 5,
            paddingLeft: 5,
            fontSize: 20,
          }}
        >
          Color
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
            marginLeft: 7,
          }}
        >
          {colors?.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <FontAwesome name="circle" size={40} color={item} />
              ) : (
                <FontAwesome name="circle" size={25} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Pressable
        onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 25,
        }}
      >
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          SAVE
        </Text>
      </Pressable>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({});
