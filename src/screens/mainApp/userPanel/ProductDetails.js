import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
    Image,
    Linking,
    Platform
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CategoryHeader from "./utils/CategoryHeader";


const { height, width } = Dimensions.get("window");

export default function ProductDetails({route,navigation}){

    const preData = route.params;

    const openDialer=()=>{
        let number = '';
        if(Platform.OS === "ios"){
            number = `telprompt:${1234567890}`;
        }
        else number = `tel:${1234567890}`;
        Linking.openURL(number);
    };

    return(
        <ScrollView style={styles.container}>
            <View style={{backgroundColor:"#ffe4e1"}}>
                <CategoryHeader 
                    route={preData.header}
                    back={()=>navigation.goBack()}
                    nav={()=>navigation.navigate("Alert")}
                />
            </View>
            <Image style={styles.banner} 
                source={{uri: preData.img}}
            />
            <View style={styles.body}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{preData.title}</Text>
                    <Text style={{color:"green",fontSize:12}}>data.status</Text>
                </View>
                <Text style={{color:"#000",fontSize:12}}>Details</Text>
                <View style={{marginBottom:20}}>
                    <Text style={{color:"#000",fontSize:13,marginVertical:10}}>Description</Text>
                    <Text style={{color:"#000",fontSize:11,flexWrap:"wrap"}}>{preData.des}</Text>
                </View>
                <Text style={{color:"#000"}}>Vendor Details</Text>
                <View style={[styles.titleView,{marginVertical:10}]}>
                    <View style={{alignItems:"center"}}>
                        <View style={styles.profile} />
                        <Text style={{color:"#000",fontSize:12}}>Akash jai</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={[styles.smCircle,{backgroundColor:"#f0bc43"}]}>
                            <FontAwesome name="star-o" color="#fff" size={20} />
                        </TouchableOpacity>
                        <Text style={{color:"#000",fontSize:12}}>8/10</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity 
                        style={[styles.smCircle,{backgroundColor:"#89f27c"}]}
                        onPress={openDialer}
                        >
                            <Feather name="phone-call" color="#fff" size={18} style={{marginBottom:-2,marginLeft:-2}} />
                        </TouchableOpacity>
                        <Text style={{color:"#000",fontSize:12}}>Call</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity 
                        style={[styles.smCircle,{backgroundColor:"#89f27c"}]}
                        onPress={()=>navigation.navigate("ChatRoom","Akash Jai")}
                        >
                            <Ionicons name="chatbox-ellipses-outline" color="#fff" size={20} />
                        </TouchableOpacity>
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
    },
    titleView: {
        flexDirection:"row",justifyContent:"space-between",alignItems:"center"
    },
    title: {
        color:"#000",fontWeight:"500",textTransform:"capitalize"
    },
    profile: {
        height:60,width:60,borderRadius:30,backgroundColor:"gray"
    },
    smCircle: {
        height:40,width:40,borderRadius:20,justifyContent:"center",alignItems:"center"
    }
})