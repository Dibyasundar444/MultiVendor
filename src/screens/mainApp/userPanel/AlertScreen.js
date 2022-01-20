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
import Entypo from "react-native-vector-icons/Entypo";

const data=[
    {
        "id":"0",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"1",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"2",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"3",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"4",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"5",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"6",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"7",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"8",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"9",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
];

const { height, width } = Dimensions.get("window");

export default function AlertScreen({navigate}){

    const [text, setText] = useState("");


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerSub}>
                    <Text style={styles.alert}>Alerts</Text>
                    <Ionicons name="person-outline" color="#fff" size={24} onPress={navigate} />
                </View>
            </View>
            <View style={styles.body}>
                <View>
                    <FlatList 
                        data={data}
                        keyExtractor={item=>item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item,index})=>(
                            <View key={index} style={styles.mainView}>
                                <View style={styles.subView}>
                                    <View style={{alignItems:"center"}}>
                                        <View style={styles.bgCircle} />
                                    </View>
                                    <View style={styles.texts}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.msg}>{item.msg}</Text>
                                        <Text style={styles.msg}>{item.msg}</Text>
                                    </View>
                                    <View style={styles.time}>
                                        <Text style={styles.timeTxt}>{item.time}</Text>
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
    },
    header: {
        // height: height/8,
        marginHorizontal: 20,
        marginBottom: 20
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
        // justifyContent:"center"
    },
    bgCircle: {
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50/2,
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
    },
    time: {
        position: "absolute",
        right: 0,
        top: 0
    },
    subView: {
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:20,
        marginVertical:15
    },
    headerSub: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:40
    },
    body: {
        backgroundColor:"#fff",
        flex:1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        bottom:-10
    },
    alert: {
        color:"#fff",
        fontWeight:"bold",
        fontSize:16
    },
    msg: {
        color:"#aaa",
        fontSize:10,
        top:2,
        marginRight:50
    },
    name: {
        color:"#000",
        fontWeight:"500"
    },
    timeTxt: {
        color:"#000",
        fontSize:12
    }
})