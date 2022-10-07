import React, { useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView } from "react-native";

import firebase, { db } from "../firebase-config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const CreateProductScreen = (props) => {
  const initalState = {
    name: "",
    amount: "",
    price: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewProduct = async () => {
    if (state.name === "") {
      alert("Please provide a name");
    } else {
      try {
        const docRef = await addDoc(collection(db, "products"), {
          name: state.name,
          amount: state.amount,
          price: state.price,
        });
        console.log("Document written with ID: ", docRef.id);
        props.navigation.navigate("HomeScreen");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Amount"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "amount")}
          value={state.amount}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Price"
          onChangeText={(value) => handleChangeText(value, "price")}
          value={state.price}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save Product" onPress={() => saveNewProduct()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    marginTop: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateProductScreen;
