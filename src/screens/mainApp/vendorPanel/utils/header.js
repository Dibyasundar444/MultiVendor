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


export default function Header(props){
    return(
        <View style={{marginTop: 30,marginHorizontal: 20,}}>
            <View style={styles.header}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                {
                    props.isBack ? <Feather name="chevron-left" color="#000" size={32} onPress={props.back} style={{marginRight:20}} /> : null
                }
                <Text style={{color:"#000",fontSize: 16,textTransform:"capitalize"}}>{props.title}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Ionicons name="person-outline" color="#000" size={24} onPress={props.profile} />
                    <TouchableOpacity onPress={props.notify} style={[{marginLeft:20},props.activeStyle]}>
                        <Fontisto name="bell" size={24} color={props.bellColor} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{color:"gray",fontSize:12}}>{props.date}</Text>
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