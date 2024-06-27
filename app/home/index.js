import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  BottomModal,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";
import { useFocusEffect } from "@react-navigation/native";

const habeet = require("../asset/habitter.jpg");

const Index = () => {
  const [option, setOption] = useState("Today");
  const [habits, setHabits] = useState([]);
  const router = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState();
  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .slice(0, 3);

  useEffect(() => {
    fetchHabits();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://172.20.10.6:3000/habitslist");
      if (Array.isArray(response.data)) {
        setHabits(response.data);
      } else {
        console.log("Invalid data format received from the API.");
      }
    } catch (error) {
      console.log("error fetching habits", error);
    }
  };

  const handleLongPress = (habitId) => {
    const selectedHabit = habits?.find((habit) => habit._id === habitId);
    setSelectedHabit(selectedHabit);
    setModalVisible(true);
  };

  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };

      await axios.put(`http://172.20.10.6:3000/habits/${habitId}/completed`, {
        completed: updatedCompletion,
      });

      await fetchHabits();

      setModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteHabit = async () => {
    try {
      const habitId = selectedHabit._id;
      const response = await axios.delete(
        `http://172.20.10.6:3000/habits/${habitId}`
      );

      if (response.status === 200) {
        await fetchHabits();
      }
      setModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCompletedDays = (completedObj) => {
    if (completedObj && typeof completedObj === "object") {
      return Object.keys(completedObj).filter((day) => completedObj[day]);
    }
    return [];
  };

  const filteredHabits = habits?.filter((habit) => {
    return !habit.completed || !habit.completed[currentDay];
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
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
              Tracker
            </Text>
          </View>
          <AntDesign
            onPress={() => router.navigate("create")}
            name="pluscircle"
            size={30}
            color="white"
          />
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Pressable
            onPress={() => setOption("Today")}
            style={{
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderColor: "#333",
              borderWidth: 1,
              alignItems: "center",
              backgroundColor: option == "Today" ? "#333" : "transparent",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Today</Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Weekly")}
            style={{
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderColor: "#333",
              borderWidth: 1,
              alignItems: "center",
              backgroundColor: option == "Weekly" ? "#333" : "transparent",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Weeekly</Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Overall")}
            style={{
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderColor: "#333",
              borderWidth: 1,
              alignItems: "center",
              backgroundColor: option == "Overall" ? "#333" : "transparent",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Overall</Text>
          </Pressable>
        </View>

        {option == "Today" &&
          (filteredHabits?.length > 0 ? (
            <View>
              {filteredHabits?.map(
                (
                  item,
                  index //q mark removed
                ) => (
                  <Pressable
                    key={item._id}
                    onLongPress={() => handleLongPress(item._id)}
                    style={{
                      marginVertical: 10,
                      backgroundColor: item?.color,
                      padding: 12,
                      borderRadius: 24,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      {item?.title}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          ) : (
            <View
              style={{
                marginTop: 150,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "auto",
              }}
            >
              <Image
                style={{ width: 60, height: 60, resizeMode: "cover" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/10609/10609386.png",
                }}
              />

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 10,
                }}
              >
                No habits for today
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 10,
                  color: "white",
                }}
              >
                No habits for today. Create one?
              </Text>

              <Pressable
                onPress={() => router.navigate("create")}
                style={{
                  backgroundColor: "#0071c5",
                  marginTop: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text>Create</Text>
              </Pressable>
            </View>
          ))}

        {option == "Weekly" && (
          <View>
            {habits?.map((habit, index) => (
              <Pressable
                style={{
                  marginVertical: 10,
                  backgroundColor: habit.color,
                  padding: 15,
                  borderRadius: 24,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 15, fontWeight: "500", color: "white" }}
                  >
                    {habit.title}
                  </Text>
                  <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginVertical: 10,
                  }}
                >
                  {days?.map((day, item) => {
                    const isCompleted = habit.completed && habit.completed[day];

                    return (
                      <Pressable>
                        <Text
                          style={{
                            color: day === currentDay ? "red" : "white",
                          }}
                        >
                          {day}
                        </Text>
                        {isCompleted ? (
                          <FontAwesome
                            name="circle"
                            size={24}
                            color="white"
                            style={{ marginTop: 12 }}
                          />
                        ) : (
                          <Feather
                            name="circle"
                            size={24}
                            color="white"
                            style={{ marginTop: 12 }}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {option === "Overall" && (
          <View>
            {habits?.map((habit, index) => (
              <>
                <Pressable
                  style={{
                    marginVertical: 10,
                    backgroundColor: habit.color,
                    padding: 15,
                    borderRadius: 24,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      {habit.title}
                    </Text>
                    <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                  </View>
                </Pressable>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ color: "white", paddingLeft: 5 }}>
                    Completed On
                  </Text>
                  <Text style={{ color: "white" }}>
                    {getCompletedDays(habit.completed).join(", ")}
                  </Text>
                </View>
              </>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Choose Option" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ marginVertical: 10 }}>
            <Text>Options</Text>
            <Pressable
              onPress={handleCompletion}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 10,
              }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="black"
              />
              <Text>Completed</Text>
            </Pressable>
            <Pressable
              onPress={deleteHabit}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
              }}
            >
              <AntDesign name="delete" size={24} color="black" />
              <Text>Delete</Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
