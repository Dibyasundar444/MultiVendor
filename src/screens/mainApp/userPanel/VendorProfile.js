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
    ActivityIndicator,
    Platform,
    Linking
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../../config";
import ChatDialog from "./utils/chatDialog";


const { height, width } = Dimensions.get("window");


export default function VendorProfile({navigation,route}){

    const item = route.params;
    const [products, setProducts] = useState([]);
    const [indicator, setIndicator] = useState(true);
    const [indicator2, setIndicator2] = useState(false);
    const [isVisible, setIsvisible] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(()=>{
        getVendors();
    },[]);
    
    const getVendors=()=>{
        axios.get(`${API}/products/vendor/${item._id}`)
        .then(resp=>{
            setProducts(resp.data);
            setIndicator(false);
        })
        .catch(err=>{
            console.log("Server error: ",err);
        })
    };

    const openDialer=()=>{
        let number = item.phoneNo;
        if(Platform.OS === "ios"){
            number = `telprompt:${number}`;
        }
        else number = `tel:${number}`;
        Linking.openURL(number);
    };

    let MESSAGE={
        "title": title,
        "query": msg,
        "vendorId": item._id
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

    return(
        <View style={styles.container}>
            <>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <AntDesign name="left" 
                            size={22} 
                            color="#fff" 
                            onPress={()=>navigation.goBack()} 
                        />
                        <Text style={styles.vendor}>Vendors</Text>
                    </View>
                    <View style={styles.profile}>
                        <View style={styles.circle} />
                        <View>
                            <Text style={{fontWeight:"600",color:"#fff",textTransform:'capitalize'}}>{item.name}</Text>
                            <Text style={{fontWeight:"500",fontSize:12,color:"#fff"}}>Cloths, Toys</Text>
                            <Text style={{fontSize:10}}>Delhi, India</Text>
                        </View>
                    </View>
                    <Text style={styles.des}>Description</Text>
                    <View style={styles.btns}>
                        <TouchableOpacity style={styles.btnRound} onPress={()=>openDialer()}>
                            <Feather name="phone-call" color="#000" size={16} />
                        </TouchableOpacity>
                        <View style={styles.btnRound}>
                            <AntDesign name="star" color="#fc9d28" size={18} />
                            <Text style={{fontSize:8,color:"#000",fontWeight:"500"}}>5/5</Text>
                        </View>
                        <TouchableOpacity style={styles.btnRound} onPress={()=>setIsvisible(true)}>
                            <MaterialIcons name="chat" color="#000" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:20,marginBottom:10}}> 
                    <Text style={styles.bodyTitle}>All Products</Text>
                    {
                        indicator ? <ActivityIndicator size={40} style={{marginTop:width/3.5}} /> 
                        : 
                        <FlatList 
                            style={{marginBottom:height/1.9}}
                            data={products}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item=>item._id}
                            columnWrapperStyle={styles.wrapper}
                            renderItem={({item,index})=>(
                                <TouchableOpacity 
                                    key={index} 
                                    style={styles.box}
                                    activeOpacity={0.6}
                                    onPress={()=>navigation.navigate("ProductDetails",item)}
                                >
                                    <View style={{height: width/3.5,backgroundColor:"pink",width:"100%",borderRadius:10}} />
                                    <View style={{marginLeft:10,marginTop:5}}>
                                        <Text style={{color:"#000",fontSize:12,textTransform:"capitalize"}}>{item.title}</Text>
                                        <Text style={{color:"#000",fontSize:12}}>{item.description}</Text>
                                    </View>
                                    <View style={{flexDirection:"row",justifyContent:"center",marginTop:5}}>
                                        <Text style={{color:"#000",fontSize:10}}>Enquire</Text>
                                        <EvilIcons name="arrow-right" color="#000" size={22} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    }
                </View>
            </>
            {
                isVisible && 
                <ChatDialog 
                    Name={item.name}
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
                            setIsSend(false)
                        },8000)
                    }
                    INDICATOR2={indicator2}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        backgroundColor: "#ff1493",
        height: "40%",
        width: "100%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    title: {
        flexDirection:"row",
        marginLeft: 20,
        marginTop: 40,
        alignItems: "center"
    },
    vendor: {
        color:"#fff",
        fontSize:18,
        fontWeight:"600",
        marginLeft:20
    },
    profile: {
        marginVertical: 20,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    circle: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: "gray",
        marginHorizontal: 10
    },
    des: {
        marginHorizontal: 20,
        flexWrap: "wrap"
    },
    box: {
        height: width/2,
        width: "48%",
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 10,
    },
    btns: {
        position:"absolute",
        flexDirection: "row",
        alignItems: "center",
        bottom: 0,
        right: 0,
    },
    btnRound: {
        justifyContent:"center",
        alignItems: "center",
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginRight: 20,
        bottom: -20,
        elevation: 9
    },
    bodyTitle: {
        color:"#000",
        fontSize:16,
        fontWeight:"500",
        marginBottom:10,
        marginHorizontal:20
    },
    wrapper: {
        justifyContent:"space-between",
        marginBottom:10,
        marginHorizontal:20
    },
})