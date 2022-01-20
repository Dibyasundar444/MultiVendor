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
import MenuHeader from "./utils/menuHeader";

const data=[
    {
        "id":"0"
    },
    {
        "id":"1"
    },
    {
        "id":"2"
    },
    {
        "id":"3"
    },
    {
        "id":"4"
    },
    {
        "id":"5"
    },
    {
        "id":"6"
    },
    {
        "id":"7"
    },
    {
        "id":"8"
    },
    {
        "id":"9"
    },
];


const { height, width } = Dimensions.get("window");

export default function Menu({navigate}){
    return(
        <View style={styles.container}>
            <MenuHeader 
                nav={navigate}
            />
            <View style={{marginHorizontal:20,marginTop:20,marginBottom:height/2.5}}>
                <Text style={{color:"#fff",fontWeight:"bold",marginBottom:20,fontSize:16}}>Browse Categories</Text>
                <FlatList 
                    data={data}
                    keyExtractor={item=>item.id}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    renderItem={(index,item)=>(
                        <View style={styles.box} key={index}></View>
                    )}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        height: width/3.6,
        width: width/3.6,
        backgroundColor: "#aaa",
        marginRight:10,
        marginBottom:10
    }
})