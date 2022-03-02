import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    Dimensions, 
    ActivityIndicator,
    Image
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import MenuHeader from "./utils/menuHeader";
import { API } from "../../../../config";
import VendorsNearby from "./utils/VendorsNearby";
import { ImageSlider } from "./utils/img-slider";


const { height, width } = Dimensions.get("window");

export default function Menu({navigation}){

    const [data, setData] = useState([]);
    const [indicator, setIndicator] = useState(true);
    const [location, setLocation] = useState({});
    const [bannerImg, setBannerImg] = useState([]);
    const IMAGES = [];

    useEffect(()=>{
        getProducts();
        getLocation();
        getBanner();
    },[]);

    const getBanner=()=>{
        axios.get(`${API}/banner`)
        .then(resp=>{
            console.log(resp.data);
            resp.data.map(item=>{
                var innerObj = {img: item.imgUrl};
                IMAGES.push(innerObj);
                setBannerImg(IMAGES);
            });
        })
        .catch(err=>{
            console.log("banner err:",err);
        })
    };

    const getProducts=()=>{
        axios.get(`${API}/allproducts`)
        .then(resp=>{
            setData(resp.data);
            setIndicator(false);
        })
        .catch(e=>{
            console.log("server error: ",e);
        })
    };

    const getLocation=async()=>{
        try{
            const JSON_OBJ = await AsyncStorage.getItem('location');
            const Parsed = JSON.parse(JSON_OBJ);
            Parsed !== null ? setLocation(Parsed) : setLocation({});
        }
        catch(err){
            console.log("err",err);
        }
    };

    const vendorLogin=async()=>{
        // const SWITCH = await AsyncStorage.getItem('switch');
        // SWITCH !== null ?  navigation.navigate("VendorPanel")
        // :
        navigation.navigate("SignIn","vendor");
    }
    return(
        <View style={styles.container}>
            <MenuHeader 
                alert={()=>navigation.navigate("Alert")}
                city={location.city}
                state={location.state}
                country={location.country}
            />
            
            <ScrollView 
                contentContainerStyle={{paddingBottom:100}} 
                showsVerticalScrollIndicator={false}
            >
                {
                    bannerImg.length !== 0 ? 
                    <ImageSlider 
                        data={bannerImg}
                        autoPlay={true}
                        closeIconColor="#fff"
                        showIndicator={false}
                        caroselImageContainerStyle={{height:150}}
                        timer={5000}
                    />
                    :
                    <View style={{
                        height:150,alignItems:"center",justifyContent:"center",
                        borderTopWidth:0.5,borderBottomWidth:0.5}}
                    >
                        <Text style={{color:"#000",fontWeight:"500"}}>Loading...</Text>
                    </View>
                }
                <VendorsNearby 
                    vendorProfile={(item)=>navigation.navigate("VendorProfile",item)}
                    login={vendorLogin}
                />
                <View style={{marginLeft:20,marginTop:20}}>
                    <Text style={styles.products}>Latest Products</Text>
                    {
                        indicator ? <ActivityIndicator style={{left: -10,marginTop: 20}} size={30} />
                        :
                        <View style={{
                            flexDirection:"row",
                            flexWrap:"wrap"
                        }}>
                            {
                                data.map(item=>(
                                    <TouchableOpacity
                                        key={item._id} 
                                        style={styles.box}
                                        activeOpacity={0.7}
                                        onPress={()=>navigation.navigate("ProductDetails", item)}
                                    >
                                        <Image style={styles.img}
                                            source={{uri: item.images}}
                                        />
                                        <View style={{marginLeft:10,marginTop:5}}>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text style={{color:"#000",fontSize:12}}>{item.content}</Text>
                                        </View>
                                        <View style={styles.enquire}>
                                            <Text style={{color:"#000",fontSize:10}}>Enquire</Text>
                                            <EvilIcons name="arrow-right" color="#000" size={22} />
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1",
    },
    box: {
        minHeight: width/2,
        width: width/2.4,
        backgroundColor: "#fff",
        marginHorizontal:5,
        marginBottom:10,
        elevation: 5,
        borderRadius: 10
    },
    products: {
        color:"#000",
        fontWeight:"bold",
        marginBottom:20,
        fontSize:16
    },
    img: {
        height: width/3.5,
        backgroundColor:"pink",
        width:"100%",
        borderRadius:10
    },
    title: {
        color:"#000",
        fontSize:12,
        textTransform:"capitalize"
    },
    enquire: {
        flexDirection:"row",
        justifyContent:"center",
        marginVertical:5
    }
})