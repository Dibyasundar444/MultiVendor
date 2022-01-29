import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions 
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";


export default function SearchHeader({nav}){

    return(
        <View style={styles.header}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <EvilIcons name="location" color="#000" size={24} />
                <Text style={{color:"#000",fontSize:12,marginRight:10}}>Gujrat, India</Text>
                <Entypo name="chevron-thin-down" color="#000" size={16} />
            </View>
            <Fontisto name="bell" color="#000" size={24} onPress={nav} />
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        marginVertical: 30,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
})