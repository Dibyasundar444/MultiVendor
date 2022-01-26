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
import Fontisto from "react-native-vector-icons/Fontisto";


const { height, width } = Dimensions.get("window");

export default function CategoryHeader({route,nav,back}){

    return(
        <View style={styles.header}>
            <View style={styles.subView}>
                <AntDesign name="left" color="#000" size={22} onPress={back} />
                <Text style={styles.catText}>{route}</Text>
            </View>
            <Fontisto name="bell" color="#000" size={24} onPress={nav} />
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
        marginBottom: 30
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
})