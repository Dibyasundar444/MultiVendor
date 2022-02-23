import React from "react";
import { 
    View, 
    Text, 
    StyleSheet
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";


export default function MenuHeader({alert,city,state,country}){

    return(
        <View>
            <View style={styles.header}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <EvilIcons name="location" color="#000" size={24} />
                    <Text style={{color:"#000",fontSize:12,marginRight:10,fontWeight:"600"}}>{city}, {state} ({country})</Text>
                    <Entypo name="chevron-thin-down" color="#000" size={16} />
                </View>
                <Fontisto name="bell" color="#000" size={24} onPress={alert} />
            </View>
            
        </View>
    )
};
const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        marginBottom:10,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    circle: {
        height:80,
        width:80,
        borderRadius:80/2,
        backgroundColor:"gray",
    },
    name: {
        color:"#000",
        fontSize:10,
        marginTop:5,
        textTransform: "capitalize"
    },
    heading: {
        fontWeight:"bold",
        color:"#000",
        fontSize:16,
        marginBottom:10
    }
})