import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    BackHandler
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import VendorChat from "./ChatScreen";
import AddProduct from "./AddProduct";
import HomeStack from "./stackNavigator/HomeStack";
import MyProduct from "./ProductScreen";
import ProductStack from "./stackNavigator/ProductStack";
import ChatStack from "./stackNavigator/ChatStack";



const Tab = createBottomTabNavigator();

export default function VendorPanel({navigation}){

    // const [index, setIndex] = useState(0);
    // const [nav, setNav] = useState(false);

    // const segmentClicked=(index)=>{
    //     setIndex(index);
    // };

    // const backAction=()=>{
    //     setNav(false);
    //     return true;
    // };

    // const funcBackHandler=()=>{
    //     BackHandler.addEventListener('hardwareBackPress',backAction);
    //     return ()=> {
    //         BackHandler.removeEventListener('hardwareBackPress',backAction);
    //     }
    // };

    // useEffect(()=>{
    //     funcBackHandler();
    // },[]);

    // const addProduct=()=>{
    //     setNav(true);
    // };
    // const back=()=>{
    //     setNav(false);
    // };

    // const renderPages=()=>{
    //     if(index === 0){
    //         if(nav){
    //             return <AddProduct goBack={back} />
    //         } else return <ProductScreen navigateTo={addProduct} />
    //     }
    //     else if(index === 1){
    //         return 
    //     }
    //     else{
    //         return <VendorChat />
    //     }
    // };

    // const bottomTab=()=>(
    //     <View style={styles.bottomTab}>
    //         <TouchableOpacity 
    //             style={styles.default}
    //             active={index===0}
    //             onPress={()=>segmentClicked(0)}
    //         >
    //             <View style={[styles.default2,index ===0 && styles.active]}>
    //                 <Feather name="codesandbox" color={index===0?"#fff":"#000"} size={26} />
    //                 <Text style={{fontSize:12,color: index===0?"#fff":"#000"}}>Products</Text>
    //             </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //             style={[styles.default]}
    //             active={index===1}
    //             onPress={()=>segmentClicked(1)}
    //         >
    //             <View style={[styles.default2,index ===1 && styles.active]}>
    //                 <Foundation name="clipboard-notes" color={index===1?"#fff":"#000"} size={28} />
    //                 <Text style={{fontSize:12,color: index===1?"#fff":"#000"}}>Orders</Text>
    //             </View>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //             style={styles.default}
    //             active={index===2}
    //             onPress={()=>segmentClicked(2)}
    //         >
    //             <View style={[styles.default2,index ===2 && styles.active]}>
    //                 <Ionicons name="chatbox-ellipses-outline" color={index===2?"#fff":"#000"} size={26} />
    //                 <Text style={{fontSize:12,color: index===2?"#fff":"#000"}}>Chats</Text>
    //             </View>
    //         </TouchableOpacity>
    //     </View>
    // );


    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.bottomTab
        }}
        >
            <Tab.Screen name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={[styles.default2,focused && styles.active]}>
                            <Feather name="codesandbox" color={focused?"#fff":"#000"} size={26} />
                            <Text style={{fontSize:12,color:focused?"#fff":"#000"}}>Home</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="MyProduct"
                component={ProductStack}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={[styles.default2,focused && styles.active]}>
                            <Foundation name="clipboard-notes" color={focused?"#fff":"#000"} size={26} />
                            <Text style={{fontSize:12,color:focused?"#fff":"#000"}}>Products</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Chat"
                component={ChatStack}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={[styles.default2,focused && styles.active]}>
                            <Ionicons name="chatbox-ellipses-outline" color={focused?"#fff":"#000"} size={26} />
                            <Text style={{fontSize:12,color:focused?"#fff":"#000"}}>Chats</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1"
    },
    bottomTab: {
        backgroundColor: "#fff",
        elevation: 5,
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: "center",
        position:"absolute"
    },
    tabText: {
        color:"#000",
        fontSize:12
    },
    default: {
        flex: 1,
    },
    default2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginVertical:5,
        marginHorizontal: 15,
        width: 80
        
    },
    active: {
        backgroundColor: "#ff1493",
        borderRadius: 15
    }
})