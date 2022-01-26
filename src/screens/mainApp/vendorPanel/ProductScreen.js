import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions, 
    Image
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Header from "./utils/header";
import { height, width } from "./ChatScreen";

let clickBoxHeight = height/4;

const data=[
    {
        "id":"0",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"1",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"2",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"3",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"4",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"5",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"6",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
];


export default function MyProduct({navigation}){
    return(
        <View style={styles.container}>
            <Header 
                title="My Products" 
                notify={()=>navigation.navigate("AlertScreen")}
                bellColor="#000"
            />
            <View style={styles.body}>
                <View style={styles.bodyTitle}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Text style={styles.subTitle}>All Products</Text>
                        <AntDesign name="down" size={16} color="#000" />
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate("addProductScreen")}>
                        <Text style={{color:"#000",fontSize:12}}>+Add Product</Text>
                        <View style={{width:90,borderWidth:0.5,borderColor:"#000"}} />
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:"center"}}>
                    <FlatList 
                        style={{marginBottom:height/6.1}}
                        data={data}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item=>item.id}
                        columnWrapperStyle={{justifyContent:"space-between"}}
                        renderItem={({item})=>(
                            <View key={item.id} style={styles.box}>
                                <View style={styles.boxSubView}>
                                    <Image style={styles.img} source={item.img} resizeMode="contain" />
                                </View>
                                <View style={{marginLeft:10,marginTop:5}}>
                                    <Text style={{fontSize:12,color:"#000"}}>{item.name}</Text>
                                    <Text style={{fontSize:11,color:"#000"}}>{item.Deatails}</Text>
                                    <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}}>
                                        <Entypo name="eye" color="#000" size={18} style={{marginRight:5}} />
                                        <Text style={{fontSize:10,color:"#000"}}>{item.views}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#ffe4e1"
    },
    body: {
        marginTop:20,
        flex:1,
        marginHorizontal:20
    },
    bodyTitle: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20
    },
    subTitle: {
        fontWeight:"500",
        color:"#000",
        marginRight:10
    },
    box: {
        height: clickBoxHeight,
        width: "48%",
        borderRadius: 10,
        marginBottom:10,
        backgroundColor: "#fff",
        // margin: 5
    },
    boxSubView: {
        backgroundColor:"#f7984f",
        borderRadius:10,
        maxHeight:clickBoxHeight/2+25,
        flex:1
    },
    img: {
        // height:clickBoxHeight/2+20,
        width: "100%",
        resizeMode: "contain",
        height:"100%",
        borderRadius: 10,
        flex:1
    },
})