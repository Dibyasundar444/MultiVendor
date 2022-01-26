import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import CategoryHeader from "./utils/CategoryHeader";

const data=[
    {
        "id": "0",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"1",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"2",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"3",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"4",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"5",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"6",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"7",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"8",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
    {
        "id":"9",
        "pName": "Product Name",
        "pDetails": "Details",
        "status": "Available",
        "description": "qwertyuiopasdfghjklzxcvbnmasdfghjklqwertyuidfghjzxctbnmxcfvbhnsdfghnjdfghdfghjdfghjfghjfghjdfgbhnjfghdfghjdfghxdcfvgbhdqwertyuiodfghjkzxcvbnmkcvbnmnmxcvbnmcvbnm,cvbnmxcvbndfghjdfghjdfghjdfghj"
    },
];

const { height, width } = Dimensions.get("window");

export default function Categories({route,navigation}){

    const title = route.params;

    return(
        <View style={styles.container}>
            <CategoryHeader 
                route={title}
                back={()=>navigation.goBack()}
                nav={()=>navigation.navigate("Alert")}
            />
            <View style={{}}>
                <FlatList 
                    style={{marginBottom:height/7.7}}
                    data={data}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item=>item.id}
                    columnWrapperStyle={{justifyContent:"space-between",marginHorizontal:20,marginBottom:10}}
                    renderItem={({item})=>(
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.box}
                            activeOpacity={0.6}
                            onPress={()=>navigation.navigate("CategoryDetails",{data:data,title:title})}
                        >
                            <View style={{height: width/3.5,backgroundColor:"pink",width:"100%",borderRadius:10}} />
                            <View style={{marginLeft:10,marginTop:5}}>
                                <Text style={{color:"#000",fontSize:12}}>Product Name</Text>
                                <Text style={{color:"#000",fontSize:12}}>Details</Text>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"center",marginTop:5}}>
                                <Text style={{color:"#000",fontSize:10}}>Enquire</Text>
                                <EvilIcons name="arrow-right" color="#000" size={22} />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#ffe4e1"
    },
    header: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 20
    },
    subView: {
        flexDirection: "row",
        alignItems: "center"
    },
    catText: {
        fontWeight:"600",
        color:"#000",
        fontSize: 15,
        marginLeft: 20
    },
    box: {
        height: width/2,
        width: "48%",
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 10,
    }
})