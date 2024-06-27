import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const habeet = require("../asset/habitter.jpg");
export default function AboutScreen() {
  const router = useNavigation();

  const [inputText, setInputText] = useState("");

  const saveJournalEntry = async () => {
    try {
      await axios.post(
        "http://172.20.10.6:3000/journal",

        {
          entry: inputText,
        }
      );
      setInputText(null);
      alert("Journal entry saved successfully!");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

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
            onPress={() => router.navigate("homescreen")}
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
            Journal
          </Text>
        </View>
      </View>
      <View>
        <Pressable
          onPress={() => router.navigate("report")}
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
            View Report
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, color: "white", marginTop: 10 }}>
        <TextInput
          style={{
            backgroundColor: "transparent",
            borderRadius: 25,
            borderColor: "#333",
            borderWidth: 1,
            paddingVertical: 100,
            color: "white",
            marginTop: 5,

            padding: 15,
          }}
          placeholder="Start writing anything..."
          placeholderTextColor={"#999"}
          value={inputText}
          multiline={true}
          onChangeText={(text) => setInputText(text)}
        />
      </View>

      <Pressable
        onPress={saveJournalEntry}
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
          Save
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginVertical: 4,
    marginHorizontal: 2,
  },
});
