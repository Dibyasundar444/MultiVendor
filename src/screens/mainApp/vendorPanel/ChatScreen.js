import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions, 
    TextInput,
    Image
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

import Header from "./utils/header";
import { API_VENDOR } from "../../../../config";

export const { height, width } = Dimensions.get("window");

export default function VendorChat({navigation}){

    const [chatList, setChatList] = useState([]);
    const [vendorData, setVendorData] = useState(null);
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused){
            getChatList();
        }
    },[isFocused]);

    const getChatList=()=>{
        axios.get(`${API_VENDOR}/vendordetail`)
        .then(resp=>{
            setChatList(resp.data.customercontact);
            setVendorData(resp.data);
        })
        .catch(err=>{
            console.log("server error: ",err);
        })
    };
   

    return(
        <View style={styles.container}>
            <Header
                title={`Chat(${chatList.length})`}
                notify={()=>navigation.navigate("AlertScreen")}
                profile={()=>navigation.navigate("ProfileScreen")}
                bellColor="#000"
            />
            <View style={{
                backgroundColor:"#fff",flex:1,
                borderTopRightRadius:10,
                borderTopLeftRadius:10,bottom:-10
                }}
            >
                <View>
                    <FlatList 
                        data={chatList}
                        keyExtractor={item=>item._id}
                        contentContainerStyle={{paddingBottom:150}}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=>(
                            <TouchableOpacity key={item._id} 
                                style={styles.mainView} 
                                onPress={()=>navigation.navigate("ChatRoom",{totalData: vendorData,customerData:item})}
                            >
                                <View style={styles.subView}>
                                    <View style={{alignItems:"center"}}>
                                        {
                                            item.profileImg ? 
                                            <Image style={styles.bgCircle} 
                                            source={{uri: item.profileImg}}
                                            />
                                            :
                                            <Image style={styles.bgCircle} 
                                            source={require("../../../assets/profile.png")}
                                            />
                                        }
                                        {/* <View style={styles.smCircle}>
                                            <Text style={{color:"#000",fontSize:12}}>1</Text>
                                        </View> */}
                                    </View>
                                    <View style={styles.texts}>
                                        <Text style={{color:"#000",top:0,fontWeight:"500"}}>{item.name}</Text>
                                        {/* <Text style={{color:"#000",fontSize:11,}}>{item.duration}</Text> */}
                                        {/* <Text style={styles.msg}>{item.msg}</Text> */}
                                    </View>
                                    {/* <View style={styles.time}>
                                        <Text style={{color:"#000"}}>{item.time}</Text>
                                    </View> */}
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
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50/2,
        // backgroundColor: "#aaa"
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
        top:2,
        marginRight:50
    },
    timetxt: {
        color:"#000",
        fontSize:12,
        top:5
    },
    name: {
        color:"#000",
        top:3,
        fontWeight:"500"
    },
    duration: {
        color:"#000",
        fontSize:11,
    }
})