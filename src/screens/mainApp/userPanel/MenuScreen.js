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
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MenuHeader from "./utils/menuHeader";
import axios from "axios";
import { API } from "../../../../config";
import VendorsNearby from "./VendorsNearby";


const { height, width } = Dimensions.get("window");

export default function Menu({navigation}){

    const [data, setData] = useState([]);
    const [indicator, setIndicator] = useState(true);

    useEffect(()=>{
        getProducts();
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
    return(
        <View style={styles.container}>
            <MenuHeader 
                alert={()=>navigation.navigate("Alert")}
            />
            <ScrollView style={{marginBottom:70}}>
                <VendorsNearby 
                    vendorProfile={(item)=>navigation.navigate("VendorProfile",item)}
                />
                <View style={{marginLeft:20,marginTop:20}}>
                    <Text style={{color:"#000",fontWeight:"bold",marginBottom:20,fontSize:16}}>Latest Products</Text>
                    {
                        indicator ? <ActivityIndicator style={{left: -10,marginTop: 20}} size={30} />
                        :
                        <FlatList 
                            horizontal={true}
                            data={data}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item})=>(
                                <TouchableOpacity
                                    key={item._id} 
                                    style={styles.box}
                                    activeOpacity={0.7}
                                    onPress={()=>navigation.navigate("ProductDetails",{
                                        "title": item.title, "des": item.description, "img": item.images, "header": "Product Details"
                                    })}
                                >
                                    <Image style={{height: width/3.5,backgroundColor:"pink",width:"100%",borderRadius:10}}
                                        source={{uri: item.images}}
                                    />
                                    <View style={{marginLeft:10,marginTop:5}}>
                                        <Text style={{color:"#000",fontSize:12,textTransform:"capitalize"}}>{item.title}</Text>
                                        <Text style={{color:"#000",fontSize:12}}>Details</Text>
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
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1",
    },
    box: {
        height: width/2,
        width: width/2.5,
        backgroundColor: "#fff",
        marginHorizontal:5,
        marginBottom:10,
        elevation: 5,
        borderRadius: 10
    }
})