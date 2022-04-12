import { View, ScrollView, Text, Image } from "react-native";
const items = [
  {
    image: require("../assets/img/shopping-bag.png"),
    text: "Pick-up"
  },
  {
    image: require("../assets/img/soft-drink.png"),
    text: "Soft Drinks"
  },
  {
    image: require("../assets/img/bread.png"),
    text: "Bakery Items"
  },
  {
    image: require("../assets/img/fast-food.png"),
    text: "Fast Foods"
  },
  {
    image: require("../assets/img/deals.png"),
    text: "Deals"
  },
  {
    image: require("../assets/img/coffee.png"),
    text: "Coffee & Tea"
  },
  {
    image: require("../assets/img/desserts.png"),
    text: "Desserts"
  }
];

export default function Categories() {
  return (
    <View style={{
      marginTop: 5,
      backgroundColor: "#fff",
      paddingVertical: 10,
      paddingLeft: 20
    }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          items.map((item, index) => (
            <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
              <Image source={item.image} style={{
                width: 50,
                height: 40,
                resizeMode: "contain"
              }} />
              <Text style={{ fontSize: 13, fontWeight: "900" }}>{item.text}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}