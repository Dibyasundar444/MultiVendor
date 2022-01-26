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
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";




const { height, width } = Dimensions.get("window");

export default function ProfileHeader({nav}){

    const [text, setText] = useState("");


    return(
        <View style={styles.header}>
            <View style={styles.headerSub}>
                <Text style={{color:"#000",fontSize:16,fontWeight:"500"}}>Profile</Text>
                <Fontisto name="bell" color="#000" size={24} onPress={nav} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    headerSub: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:40
    },
    round: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff1493",
        height: 40,
        width: 40,
        borderRadius: 40/2,
        marginLeft: 10
    },
})