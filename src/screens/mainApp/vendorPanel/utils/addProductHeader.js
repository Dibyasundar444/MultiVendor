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


export default function AddProduct_Header({profile,notify,goBack}){
    return(
        <View style={{marginVertical: 30,marginHorizontal: 20,}}>
            <View style={styles.header}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Feather name="chevron-left" color="#000" size={32} onPress={goBack} />
                    <Text style={styles.heading}>Add Product</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Ionicons name="person-outline" color="#000" size={24} onPress={profile} />
                    <Fontisto name="bell" size={24} color="#000" onPress={notify} style={{marginLeft:25}} />
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },   
    heading: {
        color:"#000",
        fontSize: 16,
        marginLeft:20,
        fontWeight:"500"
    }
})