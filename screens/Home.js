import { View, ScrollView, Text, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import Categories from "../components/Categories";
import HeaderTabs from "../components/HeaderTabs";
import RestaurantItems, { localRestaurants } from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/BottomTabs";

const YELP_API_KEY = "Bearer QkEWkOg-_eY998JxUrW7J2BC0IgjHh4jDeUFZWtvxHQ2nSr6h2Hrm0Qp4370hwAY1vFWhKmWGQSUZBNHVy0KSsq5vS9tlVNjnf391a89-szCjdKRYfYPaJaWdZ1WYnYx"

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState('Paris')
  const [activeTab, setActiveTab] = useState('Delivery')

  const getRestaurantFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`
    const corsUrl = 'https://cors-anywhere.herokuapp.com'
    const finalUrl = corsUrl + '/' + yelpUrl

    const apiOptions = {
      headers: {
        Authorization: YELP_API_KEY,
      },
    }

    return fetch(finalUrl, apiOptions)
      .then((res) => res.json())
      .then(json => setRestaurantData(json.businesses
        /*.filter((business)=>business.transactions.includes(activeTab.toLowerCase()))*/
      ))
  }

  useEffect(() => {
    getRestaurantFromYelp();
  }, [city, activeTab])
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
