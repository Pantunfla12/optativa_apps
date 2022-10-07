import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase, { db } from "../firebase-config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const ProductsList = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "products"), (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        const { name, amount, price } = doc.data();
        products.push({
          id: doc.id,
          name,
          amount,
          price,
        });
      });
      setProducts(products);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.buttonX}>
        <Button
          style={styles.button}
          onPress={() => props.navigation.navigate("CreateProductScreen")}
          title="Create Product"
        />
      </View>
      {products.map((product) => {
        return (
          <ListItem
            key={product.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("ProductDetailScreen", {
                userId: product.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{product.name}</ListItem.Title>
              {/* <ListItem.Subtitle>{product.email}</ListItem.Subtitle> */}
              <ListItem.Subtitle>cantidad: {product.amount}</ListItem.Subtitle>
              <ListItem.Subtitle>Precio: ${product.price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonX: {
    marginTop: 60,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default ProductsList;
