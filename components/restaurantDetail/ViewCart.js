import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";


export default function ViewCart() {
  const items = useSelector((state) => state.cartReducer.selectedItems.items)
  const total = items
    .map((item) => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);

  const totalPrice = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <>
      {total ? (
        <View style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          position: "fixed",
          bottom: 30,
          left: 0,
          right: 0,
          zIndex: 999
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "100%"
          }}>
            <TouchableOpacity style={{
              marginTop: 20,
              backgroundColor: 'black',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "flex-end",
              padding: 15,
              borderRadius: 30,
              width: 300,
              position: "relative"
            }}>
              <Text style={{ color: 'white', fontSize: 20, marginRight: 30 }}>View Cart</Text>
              <Text style={{ color: "white", fontSize: 20 }}>{totalPrice}</Text>
            </TouchableOpacity>
          </View>
        </View>)
        : (
          <></>
        )}
    </>
  )
}