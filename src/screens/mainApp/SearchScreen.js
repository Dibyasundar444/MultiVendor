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
import SearchHeader from "./utils/searchHeader";

const data=[
    {
        "id":"0",
        "title":"Clothing"
    },
    {
        "id":"1",
        "title":"Electronics"
    },
    {
        "id":"2",
        "title":"Toys"
    },
    {
        "id":"3",
        "title":"Books"
    },
    {
        "id":"4",
        "title":"Clothing"
    },
    {
        "id":"5",
        "title":"Clothing"
    },
    {
        "id":"6",
        "title":"Clothing"
    },
    {
        "id":"7",
        "title":"Clothing"
    },
    {
        "id":"8",
        "title":"Clothing"
    },
    {
        "id":"9",
        "title":"Clothing"
    },
];

const { height, width } = Dimensions.get("window");

export default function SearchScreen({navigate}){
    return(
        <View style={styles.container}>
            <SearchHeader
                nav={navigate}
            />
            <View style={{marginHorizontal:20,marginTop:10,marginBottom:height/2.5}}>
                <Text style={{color:"#fff",fontWeight:"bold",marginBottom:20,fontSize:16}}>Quick Search</Text>
                <FlatList 
                    data={data}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({index,item})=>(
                        <View style={styles.mainView} key={index}>
                            <View style={{flexDirection:"row",alignItems:"center",marginBottom:10}}>
                                <View style={{height:50,width:50,borderRadius:25,backgroundColor:"#aaa"}} />
                                <Text style={{marginLeft:20,fontSize:13}}>{item.title}</Text>
                            </View>
                            <AntDesign name="right" color="#fff" size={18} />
                        </View>
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
    mainView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor: "#aaa"
    }
})