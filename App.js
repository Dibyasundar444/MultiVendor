import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/screens/SigninScreen';
import OtpVerify from './src/screens/OtpScreen';
import UserPanel from './src/screens/mainApp/userPanel';
import ProfileScreen from './src/screens/mainApp/userPanel/ProfileScreen';
import VendorPanel from './src/screens/mainApp/vendorPanel';
import AddProduct from './src/screens/mainApp/vendorPanel/AddProduct';



const App = () => {

  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="UserPanel" component={UserPanel} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="VendorPanel" component={VendorPanel} />
        {/* <Stack.Screen name="addProductScreen" component={AddProduct} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default App;
