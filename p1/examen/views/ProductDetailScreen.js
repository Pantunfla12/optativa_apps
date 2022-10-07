import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase, { db } from "../firebase-config";
import {
  collection,
  addDoc,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const ProductDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    amount: "",
    price: "",
  };

  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setProduct({ ...product, [prop]: value });
  };

  const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProduct({ ...docSnap.data(), id: docSnap.id });
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const deleteProduct = async () => {
    setLoading(true);
    const docRef = doc(db, "products", props.route.params.userId);
    await deleteDoc(docRef);
    setLoading(false);
    props.navigation.navigate("HomeScreen");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the Product",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteProduct() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateProduct = async () => {
    const docRef = doc(db, "products", product.id);
    await setDoc(docRef, {
      name: product.name,
      amount: product.amount,
      price: product.price,
    });
    setProduct(initialState);
    props.navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    getProductById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={product.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Amount"
          autoCompleteType="amount"
          style={styles.inputGroup}
          value={product.amount}
          onChangeText={(value) => handleTextChange(value, "amount")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Price"
          autoCompleteType="price"
          style={styles.inputGroup}
          value={product.price}
          onChangeText={(value) => handleTextChange(value, "price")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button
          title="Update"
          onPress={() => updateProduct()}
          color="#19AC52"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    marginTop: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default ProductDetailScreen;
