import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
    Image,
    Linking,
    Platform,
    TextInput,
    ActivityIndicator
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CategoryHeader from "./utils/CategoryHeader";
import { API, API_USER, API_VENDOR } from "../../../../config";
import axios from "axios";
import ChatDialog from "./utils/chatDialog";


const { height, width } = Dimensions.get("window");

export default function ProductDetails({route,navigation}){

    const preData = route.params;
    const [isVisible, setIsvisible] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");
    const [comment, setComment] = useState("");
    const [commentSent, setCommentSent] = useState(false);
    const [indicator, setIndicator] = useState(false);
    const [indicator2, setIndicator2] = useState(false);
    const [oneVendor, setOneVendor] = useState({});

    useEffect(()=>{
        views();
        setTimeout(()=>{
            setCommentSent(false);
        },2000);
        getOneVendor();
    },[]);

    const openDialer=()=>{
        let number = oneVendor.phoneNo;
        if(Platform.OS === "ios"){
            number = `telprompt:${number}`;
        }
        else number = `tel:${number}`;
        Linking.openURL(number);
    };

    const views = async() => {
        await axios.patch(`${API_USER}/products/views/${preData._id}`)
        .then(resp=>{
            console.log("New view added: ", resp.data.products.views);
        })
        .catch(err=>{
            console.log("Server error: ",err);
        })
    };

    let MESSAGE={
        "title": title,
        "query": msg,
        "productId": preData._id,
        "vendorId": "61f497b7a36c3400168d45b1"
    };

    const _sendMsg=()=>{
        setIndicator2(true);
        axios.post(`${API}/contactvendor`,MESSAGE)
        .then(resp=>{
            console.log(resp.data);  
            setIndicator2(false);         
            setIsSend(true);
            setTitle("");
            setMsg("");
        })
        .catch(err=>{
            console.log("Error from server MSG: ",err);
        })
    };
    
    let COMMENT = {
        "comment": comment,
        "productId": preData._id,
        "vendorId": preData.vendor
    };
    const _sendComment=()=>{
        setIndicator(true);
        axios.post(`${API}/comment`,COMMENT)
        .then(resp=>{
            setIndicator(false);
            setCommentSent(true);
            console.log("Comment is Sent");
            setComment("");
        })
        .catch(err=>{
            console.log("Error from server CMT: ",err);
        })
    };
    
    const commentMsg=()=>{
        setTimeout(()=>{
            setCommentSent(false);
        },5000);
        return(
            <Text style={{color:"green",fontSize:12,textAlign:"center"}}>Sent successfully</Text>
        )
    };

    const getOneVendor=()=>{
        axios.get(`${API_VENDOR}/onevendordetail/${preData.vendor}`)
        .then(resp=>{
            setOneVendor(resp.data);
        })
        .catch(err=>{
            console.log("OneVendor Error: ",err);
        })
    };
        

    return(
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <View style={{backgroundColor:"#ffe4e1"}}>
                    <CategoryHeader 
                        route={preData.title}
                        back={()=>navigation.goBack()}
                        nav={()=>navigation.navigate("Alert")}
                    />
                </View>
                <Image style={styles.banner} 
                    source={{uri: preData.images}}
                />
                <View style={styles.body}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{preData.title}</Text>
                        <Text style={{color:"green",fontSize:12}}>data.status</Text>
                    </View>
                    <Text style={{color:"#000",fontSize:12}}>{preData.description}</Text>
                    <View style={{marginBottom:20}}>
                        <Text style={{color:"#000",fontSize:13,marginVertical:10}}>{preData.content}</Text>
                        <Text style={{color:"#000",fontSize:11,flexWrap:"wrap"}}>{preData.des}</Text>
                    </View>
                    <Text style={{color:"#000"}}>Vendor Details</Text>
                    <View style={[styles.titleView,{marginVertical:10}]}>
                        <View style={{alignItems:"center"}}>
                            <View style={styles.profile} />
                            <Text style={{color:"#000",fontSize:12,textTransform:"capitalize"}}>{oneVendor.name}</Text>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={[styles.smCircle,{backgroundColor:"#f0bc43"}]}>
                                <FontAwesome name="star-o" color="#fff" size={20} />
                            </TouchableOpacity>
                            <Text style={{color:"#000",fontSize:12}}>8/10</Text>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity 
                            style={[styles.smCircle,{backgroundColor:"#89f27c"}]}
                            onPress={openDialer}
                            >
                                <Feather name="phone-call" color="#fff" size={18} style={{marginBottom:-2,marginLeft:-2}} />
                            </TouchableOpacity>
                            <Text style={{color:"#000",fontSize:12}}>Call</Text>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity 
                                style={[styles.smCircle,{backgroundColor:"#89f27c"}]}
                                onPress={()=>setIsvisible(true)}
                            >
                                <Ionicons name="chatbox-ellipses-outline" color="#fff" size={20} />
                            </TouchableOpacity>
                            <Text style={{color:"#000",fontSize:12}}>Chat</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <TextInput 
                            style={styles.comInput}
                            placeholder="Write your comment..."
                            placeholderTextColor="gray"
                            value={comment}
                            onChangeText={(val)=>setComment(val)}
                        />
                        {
                            indicator ? <ActivityIndicator style={{marginLeft:10}} size={24} /> 
                            :
                            <TouchableOpacity 
                                onPress={_sendComment}
                                disabled={comment !== "" ? false : true}
                            >
                                <MaterialCommunityIcons name="send-circle" color="#ff1493" size={44} />
                            </TouchableOpacity>
                        }
                    </View>
                    {
                        commentSent && commentMsg()                       
                    }
                    <View style={{flexDirection:"row",alignItems:"center",marginTop:10}}>
                        <Text style={{color:"#000",fontSize:14,marginRight:10}}>View Comments (23)</Text>
                        <AntDesign name="down" color="#000" size={18} />
                    </View>
                </View>
            </ScrollView>   
            {
                isVisible &&
                <ChatDialog 
                    Name={oneVendor.name}
                    closeDialog={()=>{
                        setIsvisible(false);
                        setTitle("");
                        setMsg("");
                        setIsSend(false);
                    }}
                    title={title}
                    setTitle={(val)=>setTitle(val)}
                    msg={msg}
                    setMsg={(val)=>setMsg(val)}
                    send={_sendMsg}
                    isSend={isSend}
                    setSend={
                        setTimeout(()=>{
                            setIsSend(false);
                        },8000)
                    }
                    INDICATOR2={indicator2}
                />
            }           
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff"
    },
    banner: {
        width:"100%",
        height: 160,
        borderRadius: 10,
        backgroundColor: "gray",
        marginTop: -10
    },
    body :{
        marginHorizontal: 20,
        marginVertical: 20,
    },
    titleView: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    title: {
        color:"#000",
        fontWeight:"500",
        textTransform:"capitalize"
    },
    profile: {
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:"gray"
    },
    smCircle: {
        height:40,
        width:40,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    comInput: {
        width:"85%",
        marginRight:5,
        borderRadius:35,
        paddingLeft:10,
        color:"#000",
        backgroundColor:"#ffe4e1"
    }
})