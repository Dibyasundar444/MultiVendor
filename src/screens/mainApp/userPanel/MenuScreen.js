import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
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

    useEffect(()=>{
        getProducts();
        getLocation();
    },[]);

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
                {/* <View style={{height:140}}> */}
                    {/* <Swiper 
                        showsButtons={false} 
                        dot={<></>} 
                        activeDot={<></>} 
                        autoplay={true} 
                        // autoplayTimeout={5}
                        loop={false}
                    >
                        <View>
                            <Image 
                                source={require('../../../assets/Banner/image1.jpg')} 
                                style={{height:"100%",width:"100%"}} 
                                resizeMode="stretch" 
                            />
                        </View>
                        <View>
                            <Image 
                                source={require('../../../assets/Banner/image2.jpg')} 
                                style={{height:"100%",width:"100%"}} 
                                resizeMode="stretch" 
                            />
                        </View>
                        <View>
                            <Image 
                                source={require('../../../assets/Banner/image3.jpg')} 
                                style={{height:"100%",width:"100%"}} 
                                resizeMode="stretch" 
                            />
                        </View>
                    </Swiper> */}
                    <ImageSlider 
                        data={[
                            {img: require('../../../assets/Banner/image1.jpg')},
                            {img: require('../../../assets/Banner/image2.jpg')},
                            {img: require('../../../assets/Banner/image3.jpg')}
                        ]}
                        localImg={true}
                        autoPlay={true}
                        // onItemChanged={(item) => console.log("item", item)}
                        closeIconColor="#fff"
                        showIndicator={false}
                        caroselImageContainerStyle={{height:150}}
                        timer={5000}
                    />
                {/* </View> */}
                <VendorsNearby 
                    vendorProfile={(item)=>navigation.navigate("VendorProfile",item)}
                    login={()=>navigation.navigate("SignIn")}
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