import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';

const Products = (props) => {
  return (
   <View>
        <Button title='Agregar Producto' onPress={ () => props.navigation.navigate('products_add')} />
   </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Button: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Products;