import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions, 
    TextInput
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";


export default function ChatRoomHeader({name,back,pop_up}){

    // const name = route.params;

    return(
        <View style={styles.header}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <AntDesign name="left" color="#000" size={24} onPress={back} />
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                {/* <Feather name="phone-call" color="#000" size={20} onPress={()=>alert("update")} /> */}
                <MaterialCommunityIcons name="dots-vertical" color="#000" size={26} style={{marginLeft:20}} onPress={pop_up} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop: 30,
        marginHorizontal:20
    },
    name: {
        color:"#000",
        fontWeight:"500",
        marginLeft:20,
        fontSize:16
    }
})