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

const DATA=[
    {
        "id":"0",
        "name":"Rajesh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"1",
        "name":"Suresh",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"2",
        "name":"John",
        "duration":"5 hours",
        "msg":"Hi!! I am Rajesh",
        "time":"03:33pm"
    },
    {
        "id":"3",
        "name":"Name4",
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

export default function ChatScreen({navigation}){

    const [text, setText] = useState("");
    const [data, setData] = useState(DATA);
    const [filterData, setFilterData] = useState(DATA);

    const searchFilter=(val)=>{
        if(val){
            const newData =  data.filter((item)=>{
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData  = val.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilterData(newData);
            setText(val);
        }
        else{
            setFilterData(data);
            setText(val);
        }
    };


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{
                    flexDirection:"row",justifyContent:"space-between",
                    alignItems:"center",marginTop:40
                    }}
                >
                    <Text style={{color:"#000",fontWeight:"bold",fontSize:16}}>Chats</Text>
                    <Fontisto name="bell" color="#000" size={24} onPress={()=>navigation.navigate("Alert")} />
                </View>
                <View style={styles.textInputDiv}>
                    <Feather name="search" size={22} style={{marginLeft:10,color:"#000"}} />
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Search"
                        placeholderTextColor="#000"
                        value={text}
                        onChangeText={(val)=>searchFilter(val)}
                    />
                </View>
            </View>
            <View style={{
                backgroundColor:"#fff",flex:1,
                borderTopRightRadius:10,
                borderTopLeftRadius:10,bottom:-10
                }}
            >
                <View>
                    <FlatList 
                        data={filterData}
                        keyExtractor={item=>item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item,index})=>(
                            <TouchableOpacity key={index} style={styles.mainView} onPress={()=>navigation.navigate("ChatRoom",item.name)}>
                                <View style={styles.subView}>
                                    <View style={{alignItems:"center"}}>
                                        <View style={styles.bgCircle} />
                                        <View style={styles.smCircle}>
                                            <Text style={{color:"#000",fontSize:12}}>1</Text>
                                        </View>
                                    </View>
                                    <View style={styles.texts}>
                                        <Text style={{color:"#000",top:3,fontWeight:"500"}}>{item.name}</Text>
                                        <Text style={{color:"#000",fontSize:11,}}>{item.duration}</Text>
                                        <Text style={styles.msg}>{item.msg}</Text>
                                        <Text style={styles.msg}>{item.msg}</Text>
                                    </View>
                                    <View style={styles.time}>
                                        <Text style={{color:"#000"}}>{item.time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
        // height: height/8,
        marginHorizontal: 20
    },
    textInputDiv: {
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: "#fff",
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
        top: 3
    },
    msg: {
        color:"#aaa",
        fontSize:10,
        top:2,
        marginRight:50
    },
    subView: {
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:20,
        marginVertical:10
    }
})