import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    Dimensions, 
    Image,
    ActivityIndicator
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import Header from "./utils/header";
import axios from "axios";
import { API_VENDOR } from "../../../../config";


export const { height, width } = Dimensions.get("window");

export default function AlertScreen({navigation}){

    const [indicator, setIndicator] = useState(false);
    const [data, setData] = useState([]);
    const [productReq, setProductReq] = useState([]);

    const isFocused = useIsFocused();
    console.log(productReq);
    

    useEffect(()=>{
        if(isFocused){
            getVendor();
            getProductReq();
        }
    },[isFocused]);

    const getProductReq=async()=>{
        const dataObj = await AsyncStorage.getItem("PRODUCT_REQ");
        const dataJSON = JSON.parse(dataObj);
        dataJSON ? setProductReq(dataJSON) : setProductReq([]);
    };

    const getVendor=async()=>{
        setIndicator(true);
        const json_Val = await AsyncStorage.getItem("jwt");
        const parsed = JSON.parse(json_Val);
        let axiosConfig = {
            headers:{
                Authorization: parsed.token
            }
        };
        axios.get(`${API_VENDOR}/vendordetail`,axiosConfig)
        .then(async res=>{
            console.log(res.data.reviews);
            setData(res.data.reviews);
            let tempDate = new Date(res.data.createdAt);
            let year = tempDate.getFullYear();
            let month = ('0' + (tempDate.getMonth()+1)).slice(-2);     // to get 0 before a single month (i.e 1 -> 01)
            let day = ('0' + tempDate.getDate()).slice(-2);             // to get 0 before a single day   (i.e 3 -> 03)
            let fDate = `${day}-${month}-${year}`;
            global.fDate = fDate;
            setIndicator(false);
        })
        .catch(err=>{
            console.log(err);
        })
    };

    const rating_given=(ratingNo)=>{
        let arr = [];
        for(let i=0; i<ratingNo; i++){
            arr.push(
                <FontAwesome name="star" color="#eb9534" size={16} style={{marginRight:2}} key={i} />
            )
        }
        return arr;
    };
    const rating_remain=(ratingNo)=>{
        let arr = [];
        for(let i=ratingNo; i<5; i++){
            arr.push(
                <FontAwesome name="star-o" color="#000" size={16} style={{marginRight:2}} key={i} />
            )
        }
        return arr;
    };
   

    return(
        <View style={styles.container}>
            <Header
                title={`Alerts(${data.length+productReq.length})`}
                activeStyle={styles.bell}
                bellColor="#fff"
                profile={()=>navigation.navigate("ProfileScreen")}
            />
            <View style={styles.body}>
                <ScrollView 
                    contentContainerStyle={{paddingBottom:100}}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        indicator ? <ActivityIndicator size={30} style={{marginTop:50}} />
                        :
                        data.length === 0 && productReq.length === 0 ? 
                        <Text style={{color:"gray",fontWeight:"600",textAlign:"center",marginTop:30}}>You Have No Alert</Text>
                        :
                        <>
                            <View style={{alignItems:"center"}}>
                                <Text style={{color:"gray",fontWeight:"600",marginVertical:5}}>Product Requests</Text>
                                <View style={{borderWidth:0.5,width:"50%",marginBottom:5}} />
                            </View>
                            {
                                productReq.length === 0 ?
                                <Text style={{color:"#aaa",textAlign:"center",fontWeight:"500",marginVertical:50}}>No Request</Text>
                                :
                                productReq.map((item,index)=>(
                                    <View 
                                        key={index}
                                        style={{marginLeft:20,borderBottomWidth:0.3}}
                                    >
                                        <View style={{marginVertical:5}}>
                                            <View
                                                style={{
                                                    flexDirection:"row",
                                                    alignItems:"flex-end"
                                                }}
                                            >
                                                <Text style={{color:"#000",fontWeight:"500",fontSize:13}}>Requested Category: </Text>
                                                <Text style={{color:"gray",textTransform:"capitalize",fontWeight:"500",fontSize:13}}>{item.category}</Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection:"row",
                                                    alignItems:"flex-end"
                                                }}
                                            >
                                                <Text style={{color:"#000",fontWeight:"500",fontSize:13}}>Requested Product: </Text>
                                                <Text style={{color:"gray",textTransform:"capitalize",fontWeight:"500",fontSize:13}}>{item.title}</Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection:"row",
                                                    alignItems:"flex-end",
                                                    flexWrap:"wrap"
                                                }}
                                            >
                                                <Text style={{color:"#000",fontWeight:"500",fontSize:13}}>Description: </Text>
                                                <Text style={{color:"#000",fontSize:12}}>{item.description}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }
                            <View style={{alignItems:"center"}}>
                                <Text style={{color:"gray",fontWeight:"600",marginVertical:5}}>Ratings</Text>
                                <View style={{borderWidth:0.5,width:"50%",marginBottom:5}} />
                            </View>
                            {
                                data.length === 0 ?
                                <Text style={{color:"#aaa",textAlign:"center",fontWeight:"500",marginTop:50}}>No Rating</Text>
                                :
                                data.map(item=>(
                                    <View key={item._id} style={styles.mainView}>
                                        <View style={styles.subView}>
                                            {
                                                item.user.profileImg ? 
                                                <Image style={styles.bgCircle} source={{uri:item.user.profileImg}} />
                                                :
                                                <View style={styles.bgCircle} />
                                            }                        
                                            <View style={styles.texts}>
                                                {
                                                    item.user.name ? 
                                                    <Text style={styles.name}>{item.user.name}</Text>
                                                    :
                                                    <Text style={styles.name}>{item.user._id.split('',6)}***</Text>
                                                }
                                                <View style={{flexDirection:"row",alignItems:"center",top:2}}>
                                                    <Text style={styles.msg}>Service Rating {item.rating}/5</Text>
                                                    {
                                                        rating_given(item.rating)
                                                    }
                                                    {
                                                        rating_remain(item.rating)
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.time}>
                                                <Text 
                                                    style={styles.timetxt}
                                                >
                                                    {`${new Date(item.user.createdAt).getFullYear()}-${('0' + (new Date(item.user.createdAt).getMonth()+1)).slice(-2)}-${('0' + (new Date(item.user.createdAt).getDate()+1)).slice(-2)}`}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }
                        </>
                    }
                </ScrollView>
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
        marginLeft:20
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
        marginRight:20,
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