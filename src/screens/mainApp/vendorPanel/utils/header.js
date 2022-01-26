import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions 
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";


export default function Header({profile,notify,title,date,activeStyle,bellColor}){
    return(
        <View style={{marginTop: 30,marginHorizontal: 20,}}>
            <View style={styles.header}>
                <Text style={{color:"#000",fontSize: 16}}>{title}</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Ionicons name="person-outline" color="#000" size={24} onPress={profile} />
                    <TouchableOpacity onPress={notify} style={[{marginLeft:20},activeStyle]}>
                        <Fontisto name="bell" size={24} color={bellColor} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{color:"gray",fontSize:12}}>{date}</Text>
        </View>
    )
};
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },   
})