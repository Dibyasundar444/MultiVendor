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


export default function ProductHeader({profile,notify}){
    return(
        <View style={{marginVertical: 30,marginHorizontal: 20,}}>
            <View style={styles.header}>
                <Text style={{color:"#fff",fontSize: 16}}>Hi, John Vendor</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Ionicons name="person-outline" color="#fff" size={24} onPress={profile} />
                    <Fontisto name="bell" size={24} color="#fff" onPress={notify} style={{marginLeft:25}} />
                </View>
            </View>
            <Text style={{color:"#aaa",fontSize:12}}>Jan 17, 2022</Text>
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