import { View, ScrollView, Text, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import Categories from "../components/Categories";
import HeaderTabs from "../components/HeaderTabs";
import RestaurantItems, { localRestaurants } from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";

const YELP_API_KEY = "Bearer QkEWkOg-_eY998JxUrW7J2BC0IgjHh4jDeUFZWtvxHQ2nSr6h2Hrm0Qp4370hwAY1vFWhKmWGQSUZBNHVy0KSsq5vS9tlVNjnf391a89-szCjdKRYfYPaJaWdZ1WYnYx"

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);

  const getRestaurantFromYelp = () => {
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=Paris'
    const corsUrl = 'https://cors-anywhere.herokuapp.com'
    const finalUrl = corsUrl + '/' + yelpUrl

    const apiOptions = {
      headers: {
        Authorization: YELP_API_KEY,
      },
    }

    return fetch(finalUrl, apiOptions)
      .then((res) => res.json())
      .then(json => setRestaurantData(json.businesses))
  }

  useEffect(() => {
    getRestaurantFromYelp();
    console.log(restaurantData)
  }, [])
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs />
        <SearchBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
    </SafeAreaView>
  );
}
