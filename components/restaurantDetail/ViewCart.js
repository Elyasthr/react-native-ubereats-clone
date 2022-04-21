import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";

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

  const addOrderToFirebase = () => {
    const db = firebase.firestore()
    db.collection('orders').add({
      items: items,
      restaurantName: restaurantName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setModelVisible(false)
  }

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
            <View style={styles.subTotalContainer}>
              <Text style={styles.subTotalText}>Subtotal</Text>
              <Text>{totalPrice}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  marginTop: 20,
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative'
                }}
                onPress={() => addOrderToFirebase(false)}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
                <Text style={{ position: "absolute", right: 20, color: "white", fontSize: 15, top: 17 }}>{total ? totalPrice : ""}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
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