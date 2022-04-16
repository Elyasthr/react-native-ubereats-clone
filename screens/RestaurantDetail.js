import { View, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/RestaurantDetail/About";
import MenuItems from "../components/RestaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";

export default function RestaurantDetail({ route, navigation }) {
  return (

    <View>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems />
      <ViewCart navigation={navigation} restaurantName={route.params.name} />
    </View>

  );
}