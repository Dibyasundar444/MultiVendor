import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
    Dimensions
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import SearchScreen from "./SearchScreen";
import ChatScreen from "./ChatScreen";
import AlertScreen from "./AlertScreen";
import MenuStack from "./stackNavigator/MenuStack";
import ProfileScreen from "./ProfileScreen";
import ProfileStack from "./stackNavigator/ProfileStack";
import SearchStack from "./stackNavigator/SearchStack";


const { height, width } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

export default function UserPanel({navigation}){

    const getTabBarVisibility=(route)=>{
        const routeName = getFocusedRouteNameFromRoute(route);
        if(routeName === "EditProfile"){
            return "none";
        }
        return "flex";
    };

    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.bottomTab,
            tabBarHideOnKeyboard: true
        }}
        >
            <Tab.Screen name="Menu"
                component={MenuStack}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{flex:1,width:width/4,justifyContent:"center"}}>
                            <View style={[styles.btn1_inActiveStyle, focused && styles.btn1_activeStyle]}>
                                <AntDesign name="menufold" color={focused?"#fff":"#000"} size={26} style={focused && {right:-10}} />
                                <Text style={[{fontSize:12,color:"#000"},focused && {color:"#fff",right:-10}]}>Menu</Text>
                            </View>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Search"
                component={SearchStack}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={[styles.btn2_inActiveStyle, focused && styles.btn2SubView]}>
                            <Feather name="search" color={focused?"#fff":"#000"} size={26} />
                            <Text style={{fontSize:12,color:focused?"#fff":"#000"}}>Search</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={[styles.btn2_inActiveStyle, focused && styles.btn2SubView]}>
                            <Ionicons name="chatbox-ellipses-outline" color={focused?"#fff":"#000"} size={26} />
                            <Text style={{fontSize:12,color:focused?"#fff":"#000"}}>Chats</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="ProfileStack"
                component={ProfileStack}
                options={({route})=>({
                    tabBarStyle: [styles.bottomTab,{display: getTabBarVisibility(route)}],
                    tabBarIcon: ({focused})=>(
                        <View style={{flex:1,width:width/4,justifyContent:"center"}}>
                            <View style={[styles.btn4_inActiveStyle, focused && styles.btn4_activeStyle]}>
                                <Ionicons name="person-outline" color={focused?"#fff":"#000"} size={24} style={focused && {left:-10}} />
                                <Text style={[{fontSize:12,color:"#000"},focused && {color:"#fff",left:-10}]}>Profile</Text>
                            </View>
                        </View>
                    )
                })}
            />
        </Tab.Navigator>
    )
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#054d36"
//     },
//     bottomTab: {
//         backgroundColor: "#fff",
//         elevation: 5,
//         height: 80,
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         alignItems: "center",
//         position:"absolute"
//     },
//     tabText: {
//         color:"#000",
//         fontSize:12
//     },
//     default: {
//         flex: 1,
//     },
//     default2: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         marginVertical:5,
//         marginHorizontal: 15,
//         width: 80
        
//     },
//     active: {
//         backgroundColor: "#42b349",
//         borderRadius: 15
//     }
// })
// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     BackHandler
// } from "react-native";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import Feather from "react-native-vector-icons/Feather";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Fontisto from "react-native-vector-icons/Fontisto";
// import Menu from "./MenuScreen";
// import SearchScreen from "./SearchScreen";
// import ChatScreen from "./ChatScreen";
// import AlertScreen from "./AlertScreen";




// export default function UserPanel({navigation}){

//     const [index, setIndex] = useState(0);

//     const segmentClicked=(index)=>{
//         setIndex(index);
//     };

//     const backAction=()=>{
//         return true;
//     };

//     useEffect(()=>{
//         BackHandler.addEventListener('hardwareBackPress',backAction);
//         return ()=> {
//             BackHandler.removeEventListener('hardwareBackPress',backAction);
//         }
//     },[]);

//     const renderPages=()=>{
//         if(index === 0){
//             return <Menu 
//                         navigate={()=>navigation.navigate("Profile")}
//                     />
//         }
//         else if(index === 1){
//             return <SearchScreen
//                         navigate={()=>navigation.navigate("Profile")}
//                     />
//         }
//         else if(index === 2){
//             return <ChatScreen 
//                         navigate={()=>navigation.navigate("Profile")}
//                     />
//         }
//         else{
//             return <AlertScreen 
//                         navigate={()=>navigation.navigate("Profile")}
//                     />
//         }
//     };

//     const bottomTab=()=>(
//         <View style={styles.bottomTab}>
//             <TouchableOpacity 
//                 style={[styles.btn1_inActiveStyle, index===0 && styles.btn1_activeStyle]}
//                 active={index===0} onPress={()=>segmentClicked(0)}
//             >
//                 <View style={{right: index===0 ? -10 : null,alignItems:"center"}}>
//                     <AntDesign name="menufold" size={22} color={index===0?"#fff":"#000"} />
//                     <Text style={{color:index===0?"#fff":"#000",fontSize:10}}>Menu</Text>
//                 </View>
//             </TouchableOpacity>
//             <TouchableOpacity 
//                 style={styles.btn2_inActiveStyle}
//                 active={index===1} onPress={()=>segmentClicked(1)}
//             >
//                 <View style={[index===1 && styles.btn2SubView,{alignItems:"center"}]}>
//                     <Feather name="search" size={24} color={index===1?"#fff":"#000"} />
//                     <Text style={{color:index===1?"#fff":"#000",fontSize:10}}>Search</Text>
//                 </View>
//             </TouchableOpacity>
//             <TouchableOpacity 
//                 style={styles.btn2_inActiveStyle}
//                 active={index===2} onPress={()=>segmentClicked(2)}
//             >
//                 <View style={[index===2 && styles.btn2SubView,{alignItems:"center"}]}>
//                     <Ionicons name="chatbox-ellipses-outline" size={24} color={index===2?"#fff":"#000"} />
//                     <Text style={{color:index===2?"#fff":"#000",fontSize:10}}>Chat</Text>
//                 </View>
//             </TouchableOpacity>
//             <TouchableOpacity 
//                 style={[styles.btn4_inActiveStyle, index===3 && styles.btn4_activeStyle]}
//                 active={index===3} onPress={()=>segmentClicked(3)}
//             >
//                 <View style={{left: index===3 ? -10 : null,alignItems:"center"}}>
//                     <Fontisto name="bell" size={22} color={index===3?"#fff":"#000"} />
//                     <Text style={{color:index===3?"#fff":"#000",fontSize:10}}>Alerts</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     );

//     return(
//         <View style={styles.container}>
//             <View style={{flex:1}}>
//                 {renderPages()}
//             </View>
//             <View>
//                 {bottomTab()}
//             </View>
//         </View>
//     )
// };

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
        position:"absolute",
        // flex:1
    },
    btn1_activeStyle: {
        backgroundColor:"#ff1493",
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        paddingVertical:5
    },
    btn1_inActiveStyle: {
        // flex:1,
        // height:50,
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:"gray"
    },
    btn4_activeStyle: {
        backgroundColor:"#ff1493",
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        paddingVertical:5
    },
    btn4_inActiveStyle: {
        // flex:1,
        // height:50,
        justifyContent:"center",
        alignItems:"center",
    },
    btn2_inActiveStyle: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    btn2SubView: {
        backgroundColor:"#ff1493",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        // width:50,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        paddingHorizontal:5
    }
})