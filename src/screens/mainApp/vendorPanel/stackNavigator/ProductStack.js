import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyProduct from '../ProductScreen';
import AddProduct from '../AddProduct';
import AlertScreen from '../AlertScreen';
import ProfileScreen from '../ProfileScreen';
import EditProfile from '../EditProfileScreen';
import ProductDetails from '../ProductDetails';



export default function ProductStack(){

  
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='ProductScreen' component={MyProduct} />
            <Stack.Screen name="addProductScreen" component={AddProduct} />
            <Stack.Screen name='AlertScreen' component={AlertScreen} />
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            {/* <Stack.Screen name='ProductDetails' component={ProductDetails} /> */}
        </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe4e1"
  }
});
