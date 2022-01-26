import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/screens/SigninScreen';
import OtpVerify from './src/screens/OtpScreen';
import UserPanel from './src/screens/mainApp/userPanel';
import ProfileScreen from './src/screens/mainApp/userPanel/ProfileScreen';
import VendorPanel from './src/screens/mainApp/vendorPanel';
import Categories from './src/screens/mainApp/userPanel/CategoriesScreen';
import CategoriesDetails from './src/screens/mainApp/userPanel/CategoriesDetails';
import ChatRoom from './src/screens/mainApp/userPanel/ChatRoom';
import AlertScreen from './src/screens/mainApp/userPanel/AlertScreen';



const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="UserPanel" component={UserPanel} />
        <Stack.Screen name="Alert" component={AlertScreen} />
        <Stack.Screen name="VendorPanel" component={VendorPanel} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CategoryDetails" component={CategoriesDetails} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
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
