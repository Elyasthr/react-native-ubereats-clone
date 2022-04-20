import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";


export default function ViewCart() {
  const [modalVisible, setModelVisible] = useState(false);
  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems)
  const total = items
    .map((item) => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);

  const totalPrice = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD'
  });

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1
    },

    restaurantName: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 18,
      marginBottom: 10
    },

    subTotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15
    },

    subTotalText: {
      textAlign: 'left',
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 10
    }

  })

  const CheckoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {
              items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))
            }
          </View>
        </View>
      </>


      // <View style={{
      //   flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      //   marginTop: 30,
      // }}>
      //   <View style={{
      //     backgroundColor: "black",
      //     padding: 10,
      //     borderRadius: 30,
      //     width: 150,
      //     alignItems: "center"
      //   }}
      //   >
      //     <TouchableOpacity onPress={() => setModelVisible(false)}>
      //       <Text style={{
      //         color: "white"
      //       }}>Checkout</Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>
    )
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModelVisible(false)}
      >
        {CheckoutModalContent()}
      </Modal>
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
            }}
              onPress={() => setModelVisible(true)}
            >
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