import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";


export default function SearchHeader({nav,city,state,country}){

    return(
        <View style={styles.header}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <EvilIcons name="location" color="#000" size={24} />
                <Text style={{color:"#000",fontSize:12,marginRight:10,fontWeight:"600"}}>{city}, {state} ({country})</Text>
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