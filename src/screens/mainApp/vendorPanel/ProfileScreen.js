import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    Alert,
    Share,
    ActivityIndicator
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { BottomSheet } from "react-native-btr";
import axios from "axios";


import { API_VENDOR } from "../../../../config";
import ProfileHeader from "./utils/profileHeader";


export default function ProfileScreen({navigation}){

    const [phoneNo, setPhoneNo] = useState();
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState({});
    const isFocused = useIsFocused();
    const [isUpdated, setIsUpdated] = useState(false);
    const [indicator, setIndicator] = useState(false);
    const [visible, setVisible] = useState(false);

    
    const link = "link/will/be/here";

    useEffect(()=>{
        if(isFocused){
            getVendor();
        }
        getLocation();
    },[isFocused]);

    const logOut_alert=()=>{
        Alert.alert(
            "Logging Out",
            "Are you sure?",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "OK", onPress: logOut }
            ]
        )
    };

    const logOut=async()=> {
        // axios.get(`${API_VENDOR}/logout`)
        // .then(async res=>{
            try{
                await AsyncStorage.removeItem("jwt");
                navigation.navigate("SignIn");
            }
            catch(e){
                console.log("logout error: ",e);
            }
        // })
        // .catch(err=>console.log(err))
    };

    const getVendor=()=>{
        axios.get(`${API_VENDOR}/vendordetail`)
        .then(async res=>{
            // console.log(res.data.reviews);
            setPhoneNo(res.data.phoneNo);
            setName(res.data.name);
            setImg(res.data.profileImg);
        })
        .catch(err=>{
            console.log(err);
        })
    };

    const onShare = async () => {
        try {
          const result = await Share.share({
            message: link,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    const getLocation=async()=>{
        try{
            const JSON_OBJ = await AsyncStorage.getItem('location');
            const Parsed = JSON.parse(JSON_OBJ);
            console.log(Parsed);
            Parsed !== null ? setLocation(Parsed) : setLocation({});
        }
        catch(err){
            console.log("err",err);
        }
    };

    let updateData={
        locality: location.city,
        state: location.state,
        country: location.country,
        latitude: location.lat,
        longitude:  location.long
    };

    if(isUpdated){
        setTimeout(()=>{
            setIsUpdated(false);
        },3000)
    };

    const toggle=()=>{
    setVisible((visible) => !visible)
    };

    const updateLocation=()=>{
        setIndicator(true);
        axios.patch(`${API_VENDOR}/updatevendor`,updateData)
        .then(res=>{
            setIndicator(false);
            setIsUpdated(true);
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
            setIndicator(false);
        })
    };

    return(
        <View style={styles.container}>
            <ProfileHeader 
                nav={()=>navigation.navigate("AlertScreen")}
                goBack={()=>navigation.goBack()}
            />
            <View style={styles.body}>
                <View style={styles.bgCard}>
                    <Image style={styles.img} 
                        source={img ==="" || img === undefined || img === null ? require("../../../assets/profile.png") : {uri: img}}
                    />
                    <View style={styles.texts}>
                        {
                            name === "" || name === undefined ? null : <Text style={{color:"#000",fontWeight:"500"}}>{name}</Text>
                        }
                        <Text style={{color:"#000",fontSize: 12}}>+91 {phoneNo}</Text>
                    </View>
                </View>
                <Text style={{marginLeft:25,marginTop:20,color:"#000",marginBottom:5}}>Account</Text>
                <TouchableOpacity 
                    style={styles.smCard}
                    onPress={()=>navigation.navigate("EditProfile")}
                    activeOpacity={0.8}
                >
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <Ionicons name="person-outline" color="#000" size={18}/>
                        <Text style={{color:"#000",marginLeft: 20}}>Profile</Text>
                    </View>
                    <AntDesign name="right" color="#000" size={18} style={{marginRight: 20}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.smCard}
                    onPress={onShare}
                >
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <AntDesign name="sharealt" color="#000" size={18}/>
                        <Text style={{color:"#000",marginLeft: 20}}>Share</Text>
                    </View>
                    <AntDesign name="right" color="#000" size={18} style={{marginRight: 20}} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.smCard}
                    activeOpacity={0.8}
                    onPress={toggle}
                >
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <EvilIcons name="location" color="#000" size={24} />
                        <Text style={{color:"#000",marginLeft:10}}>Update location</Text>
                    </View>
                    <MaterialIcons name="my-location" color="#000" size={18} style={{marginRight: 20}} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.smCard}
                    activeOpacity={0.8}
                    onPress={logOut_alert}
                >
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <MaterialIcons name="logout" color="#000" size={20}/>
                        <Text style={{color:"#000",marginLeft: 20}}>Logout</Text>
                    </View>
                    <AntDesign name="right" color="#000" size={18} style={{marginRight: 20}} />
                </TouchableOpacity>
            </View>
            <BottomSheet
                visible={visible}
                onBackButtonPress={toggle}
                onBackdropPress={toggle}
            >
                <View style={styles.card}>
                    <Text 
                    style={{
                        color:"#000",
                        fontWeight:"500",
                        marginVertical:10
                    }}
                    >My Location</Text>
                    <View 
                    style={{
                        width:"80%",
                        borderWidth: 0.5,
                        marginBottom:5
                    }} 
                    />
                    <Text 
                    style={{color:"gray",fontSize:12}}
                    >
                        *** this will automatically fetch your current location***
                    </Text>
                    <View>
                        <View
                        style={{flexDirection:"row",alignItems:"center",marginVertical:20}}
                        >
                            <Text
                            style={{
                                color:"#000",
                                fontWeight:"500"
                            }}
                            >City :</Text>
                            <Text
                            style={{
                                color:"gray",
                                fontWeight:"500",
                                marginHorizontal:10
                            }}
                        >{location.city}</Text>
                        </View>
                        <View
                        style={{flexDirection:"row",alignItems:"center"}}
                        >
                            <Text
                            style={{
                                color:"#000",
                                fontWeight:"500"
                            }}
                            >State :</Text>
                            <Text
                            style={{
                                color:"gray",
                                fontWeight:"500",
                                marginHorizontal:10
                            }}
                        >{location.state}</Text>
                        </View>
                        <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center",
                            marginVertical:20
                        }}
                        >
                            <Text
                            style={{
                                color:"#000",
                                fontWeight:"500"
                            }}
                            >Country :</Text>
                            <Text
                            style={{
                                color:"gray",
                                fontWeight:"500",
                                marginHorizontal:10
                            }}
                        >{location.country}</Text>
                        </View>
                    </View>
                    {
                        indicator ? 
                        <View style={{marginVertical:20}}>
                            <ActivityIndicator size={30} color="#ff1493" />
                        </View>
                        :
                        <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center",
                            marginHorizontal:40,
                            marginVertical:20
                        }}
                        >
                            <TouchableOpacity
                            style={{
                                backgroundColor:"#ff1493",
                                paddingHorizontal:8,
                                paddingVertical:5,
                                borderRadius:4
                            }}
                            onPress={toggle}
                            activeOpacity={0.7}
                            >
                                <Text style={{color:"#fff",fontWeight:"500"}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{
                                backgroundColor:"green",
                                paddingHorizontal:8,
                                paddingVertical:5,
                                borderRadius:4,
                                marginLeft:30
                            }}
                            onPress={updateLocation}
                            activeOpacity={0.7}
                            >
                                <Text style={{color:"#fff",fontWeight:"500"}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        isUpdated && <Text style={{color:"green",fontSize:12}}>Successfully Updated</Text>
                    }
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1"
    },
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
    body: {
        backgroundColor:"#fff",
        flex:1,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    bgCard: {
        marginHorizontal: 20,
        elevation: 5,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        borderRadius: 10
    },
    img: {
        height: 60,
        width: 60,
        borderRadius: 60/2,
        // backgroundColor: "#ffe4e1",
        marginVertical: 10,
        marginHorizontal: 10
    },
    texts: {
        marginLeft: 10
    },
    smCard: {
        elevation: 5,
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-between",
        height: 40,
        borderRadius: 10
    },
    card: {
        backgroundColor: "#fff",
        height: 350,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        alignItems:"center"
    },
})