import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default function BottomTabs() {

  return (

    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
        //position: 'fixed', bottom: 0, left: 0, right: 0,
      }}
    >
      <Icon icon="home" text="Home" />
      <Icon icon="search" text="Browse" />
      <Icon icon="shopping-bag" text="Grocery" />
      <Icon icon="receipt" text="Orders" />
      <Icon icon="user" text="Account" />
    </View>

  );
}

const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5 name={props.icon} size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center"
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>

)