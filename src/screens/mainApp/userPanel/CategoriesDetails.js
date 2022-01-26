import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CategoryHeader from "./utils/CategoryHeader";


const { height, width } = Dimensions.get("window");

export default function CategoriesDetails({route,navigation}){

    const {title} = route.params;
    const data = {
        "id": "0",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    };

    return(
        <ScrollView style={styles.container}>
            <View style={{backgroundColor:"#ffe4e1"}}>
                <CategoryHeader 
                    route={title}
                    back={()=>navigation.goBack()}
                    nav={()=>navigation.navigate("Alert")}
                />
            </View>
            <View style={styles.banner} />
            <View style={styles.body}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{color:"#000"}}>{data.pName}</Text>
                    <Text style={{color:"green",fontSize:12}}>{data.status}</Text>
                </View>
                <Text style={{color:"#000",fontSize:12}}>{data.pDetails}</Text>
                <View style={{marginBottom:20}}>
                    <Text style={{color:"#000",fontSize:13,marginVertical:10}}>Description</Text>
                    <Text style={{color:"#000",fontSize:11,flexWrap:"wrap"}}>{data.description}</Text>
                </View>
                <Text style={{color:"#000"}}>Vendor Details</Text>
                <View style={{marginVertical:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <View style={{alignItems:"center"}}>
                        <View style={{height:60,width:60,borderRadius:30,backgroundColor:"gray"}} />
                        <Text style={{color:"#000",fontSize:12}}>Akash jai</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <View style={{height:40,width:40,borderRadius:20,backgroundColor:"#f0bc43",justifyContent:"center",alignItems:"center"}}>
                            <FontAwesome name="star-o" color="#fff" size={20} />
                        </View>
                        <Text style={{color:"#000",fontSize:12}}>8/10</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <View style={{height:40,width:40,borderRadius:20,backgroundColor:"#89f27c",justifyContent:"center",alignItems:"center"}}>
                            <Feather name="phone-call" color="#fff" size={18} style={{marginBottom:-2,marginLeft:-2}} />
                        </View>
                        <Text style={{color:"#000",fontSize:12}}>Call</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <View style={{height:40,width:40,borderRadius:20,backgroundColor:"#89f27c",justifyContent:"center",alignItems:"center"}}>
                            <Ionicons name="chatbox-ellipses-outline" color="#fff" size={20} />
                        </View>
                        <Text style={{color:"#000",fontSize:12}}>Chat</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginTop:10}}>
                    <Text style={{color:"#000",fontSize:14,marginRight:10}}>View Comments (23)</Text>
                    <AntDesign name="down" color="#000" size={18} />
                </View>
            </View>              
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff"
    },
    banner: {
        width:"100%",
        height: 160,
        borderRadius: 10,
        backgroundColor: "gray",
        marginTop: -10
    },
    body :{
        marginHorizontal: 20,
        marginVertical: 20,
    }
})