import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions, 
    ActivityIndicator
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";
import { API_VENDOR } from "../../../../../config";
import VendorsNearby from "../VendorsNearby";

const data=[
    {
        "id":"0"
    },
    {
        "id":"1"
    },
    {
        "id":"2"
    },
    {
        "id":"3"
    },
    {
        "id":"4"
    },
    {
        "id":"5"
    },
    {
        "id":"6"
    },
    {
        "id":"7"
    },
    {
        "id":"8"
    },
    {
        "id":"9"
    },
];

export default function MenuHeader({alert,vendorProfile}){

    const [vendors, setVendors] = useState([]);
    const [indicator, setIndicator] = useState(true);

    useEffect(()=>{
        getVendors();
    },[vendors]);
    const getVendors=()=>{
        axios.get(`${API_VENDOR}/allvendors`)
        .then(resp=>{
            setVendors(resp.data);
            setIndicator(false);
        })
        .catch(err=>{
            console.log("Server error: ",err);
            // setIndicator(false);
        })
    };
    return(
        <View>
            <View style={styles.header}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <EvilIcons name="location" color="#000" size={24} />
                    <Text style={{color:"#000",fontSize:12,marginRight:10}}>Gujrat, India</Text>
                    <Entypo name="chevron-thin-down" color="#000" size={16} />
                </View>
                <Fontisto name="bell" color="#000" size={24} onPress={alert} />
            </View>
            <View style={{height:120,width:"100%",backgroundColor:"gray"}} />
        </View>
    )
};
const styles = StyleSheet.create({
    header: {
        marginVertical: 30,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    circle: {
        height:80,
        width:80,
        borderRadius:80/2,
        backgroundColor:"gray",
    },
    name: {
        color:"#000",
        fontSize:10,
        marginTop:5,
        textTransform: "capitalize"
    },
    heading: {
        fontWeight:"bold",
        color:"#000",
        // marginLeft:20,
        fontSize:16,
        marginBottom:10
    }
})