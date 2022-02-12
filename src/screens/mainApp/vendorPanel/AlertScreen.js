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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Header from "./utils/header";

const DATA=[
    {
        "id":"0",
        "name":"Rajesh",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:40pm"
    },
    {
        "id":"1",
        "name":"Suresh",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:45pm"
    },
    {
        "id":"2",
        "name":"John",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:33pm"
    },
    {
        "id":"3",
        "name":"Name4",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:33pm"
    },
    {
        "id":"4",
        "name":"Rajesh",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:33pm"
    },
    {
        "id":"5",
        "name":"Rajesh",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:33pm"
    },
    {
        "id":"6",
        "name":"Rajesh",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:33pm"
    },
    {
        "id":"7",
        "name":"Rajesh",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:33pm"
    },
    {
        "id":"8",
        "name":"Rajesh",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:33pm"
    },
    {
        "id":"9",
        "name":"Rajesh",
        "title":"Service Rating",
        "totalRating":"5",
        "ratingGiven":"4",
        "time":"03:40pm"
    },
];

export const { height, width } = Dimensions.get("window");

export default function AlertScreen({navigation}){

    // const [text, setText] = useState("");
    // const [data, setData] = useState(DATA);
   

    return(
        <View style={styles.container}>
            <Header
                title="Alerts(03)"
                activeStyle={styles.bell}
                bellColor="#fff"
                profile={()=>navigation.navigate("ProfileScreen")}
            />
            <View style={styles.body}>
                <View style={{}}>
                    <FlatList 
                        data={DATA}
                        keyExtractor={item=>item.id}
                        showsVerticalScrollIndicator={false}
                        style={{marginBottom:80}}
                        renderItem={({item,index})=>(
                            <View key={index} style={styles.mainView}>
                                <View style={styles.subView}>
                                    <View style={styles.bgCircle} />                        
                                    <View style={styles.texts}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <View style={{flexDirection:"row",alignItems:"center",top:2}}>
                                            <Text style={styles.msg}>{item.title} {item.ratingGiven}/{item.totalRating}</Text>
                                            <FontAwesome name="star" color="#eb9534" size={16} style={{marginRight:2}} />
                                            <FontAwesome name="star" color="#eb9534" size={16} style={{marginRight:2}} />
                                            <FontAwesome name="star" color="#eb9534" size={16} style={{marginRight:2}} />
                                            <FontAwesome name="star" color="#eb9534" size={16} style={{marginRight:2}} />
                                            <FontAwesome name="star-o" color="#000" size={16} style={{marginRight:2}} />
                                        </View>
                                    </View>
                                    <View style={styles.time}>
                                        <Text style={styles.timetxt}>{item.time}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1"
    },
    header: {
        marginHorizontal: 20
    },
    textInputDiv: {
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: "#aaa",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        height: 40,
        color: "#000",
        paddingLeft: 20,
        width: "85%"
    },
    mainView: {
        borderBottomWidth:1,
    },
    bgCircle: {
        // borderWidth: 1,
        height: 55,
        width: 55,
        borderRadius: 55/2,
        backgroundColor: "#aaa"
    },
    smCircle: {
        borderWidth: 1,
        height: 20,
        width: 20,
        borderRadius: 20/2,
        backgroundColor: "#aaa",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },
    texts: {
        marginLeft: 10,
        // top: -10
    },
    time: {
        position: "absolute",
        right: 0,
        top: 3
    },
    body: {
        backgroundColor:"#fff",
        flex:1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        // bottom:-10
    },
    subView: {
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:20,
        marginVertical:10
    },
    msg: {
        color:"#aaa",
        fontSize:10,
        // top:2,
        marginRight:5
    },
    timetxt: {
        color:"#000",
        fontSize:12,
        top:5
    },
    name: {
        color:"#000",
        // top:3,
        fontWeight:"500"
    },
    duration: {
        color:"#000",
        fontSize:11,
    },
    bell: {
        backgroundColor: "#ff1493",
        width: 45,
        height: 45,
        borderRadius: 45/2,
        justifyContent:"center",
        alignItems: "center"
    }
})