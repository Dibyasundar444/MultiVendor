import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorChat from '../screens/mainApp/vendorPanel/ChatScreen';




export default function ChatStack(){

  
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='ChatScreen' component={VendorChat} />
        </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#054d36"
  }
});
