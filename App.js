import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignIn from './src/screens/SigninScreen';
import OtpVerify from './src/screens/OtpScreen';
import UserPanel from './src/screens/mainApp/userPanel';
import VendorPanel from './src/screens/mainApp/vendorPanel';
import Categories from './src/screens/mainApp/userPanel/CategoriesScreen';
import CategoriesDetails from './src/screens/mainApp/userPanel/CategoriesDetails';
import ChatRoom from './src/screens/mainApp/userPanel/ChatRoom';
import AlertScreen from './src/screens/mainApp/userPanel/AlertScreen';
import Services from './src/screens/mainApp/userPanel/ServiceScreen';
import ServiceDetails from './src/screens/mainApp/userPanel/ServiceDetails';
import ProductDetails from './src/screens/mainApp/userPanel/ProductDetails';
import SplashScreen from './src/screens/SplashScreen';



const App = () => {

  const Stack = createNativeStackNavigator();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getToken();
    setTimeout(()=>{
      setLoading(false)
    },5000);
  },[]);

  const getToken=async()=>{
    try{
      const Json = await AsyncStorage.getItem("jwt");
      const Parsed = JSON.parse(Json);
      setToken(Parsed)
    }
    catch(e){
      console.log("Token Error: ",e);
    }
  };

  if(loading){
    return <SplashScreen />
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={token ? "UserPanel" : "SignIn"} 
        screenOptions={{headerShown: false}}    
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="UserPanel" component={UserPanel} />
        <Stack.Screen name="Alert" component={AlertScreen} />
        <Stack.Screen name="VendorPanel" component={VendorPanel} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CategoryDetails" component={CategoriesDetails} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
