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
    TextInput,
    Image
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheet } from "react-native-btr";
import axios from "axios";

import SearchHeader from "./utils/searchHeader";
import { API } from "../../../../config";
import VendorsNearby from "./utils/VendorsNearby";



const { height, width } = Dimensions.get("window");

export default function SearchScreen({navigation}){

    const [catData, setCatData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [indicator1, setIndicator1] = useState(true);
    const [indicator2, setIndicator2] = useState(true);
    const [indicator3, setIndicator3] = useState(false);
    const [success, setSuccess] = useState(false);
    const [text, setText] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [location, setLocation] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        getCategories();
        getServices();
        getLocation();
    },[]);

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

    const getCategories=()=>{
        axios.get(`${API}/category`)
        .then(resp=>{
            setCatData(resp.data);
            setFilterData(resp.data);
            setIndicator1(false);
        })
        .catch(e=>{
            console.log("server error: ",e);
        })
    };
    const getServices=()=>{
        axios.get(`${API}/service`)
        .then(resp=>{
            setServiceData(resp.data);
            setIndicator2(false);
        })
        .catch(e=>{
            console.log("server error: ",e);
        })
    };

    const Categories=()=>(
        <View style={styles.boxContainer}>
            {
                filterData.map(item=>(
                    <TouchableOpacity
                        style={styles.cat} 
                        key={item._id}
                        onPress={()=>navigation.navigate("Categories",{"title": item.name,"id": item._id})}
                    >
                        <View style={styles.subView}>
                            {
                                item.imgUrl ?
                                <Image style={styles.smImg} source={{uri: item.imgUrl}} />
                                :
                                <View style={styles.smImg} />
                            }
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
    const Services=()=>(
        <View style={styles.boxContainer}>
            {
                serviceData.map(item=>(
                    <TouchableOpacity 
                        style={styles.cat} key={item._id}
                        onPress={()=>navigation.navigate("Services",{"title": item.name,"id": item._id})}
                    >
                        <View style={styles.subView}>
                        {
                                item.imgUrl ?
                                <Image style={styles.smImg} source={{uri: item.imgUrl}} />
                                :
                                <View style={styles.smImg} />
                            }
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    );

    const searchFilter=(val)=>{
        if(val){
            const newData =  catData.filter((item)=>{
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData  = val.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilterData(newData);
            setText(val);
        }
        else{
            setFilterData(catData);
            setText(val);
        }
    };

    const toggle=()=>{
        setIsVisible(visble => !visble)
    };

    const sendRequest=()=>{
        setIndicator3(true);
        axios.post(`${API}/customorder`,{title:title,description:description})
        .then(resp=>{
            console.log(resp.data);
            setIndicator3(false);
            setSuccess(true);
        })
        .catch(err=>{
            console.log(err);
            setSuccess(false);
        })
    };

    if(success){
        setTimeout(()=>{
            setSuccess(false);
        },3000)
    };


    return(
        <ScrollView 
            style={styles.container} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:100}}
        >
            <SearchHeader
                nav={()=>navigation.navigate("Alert")}
                city={location.city}
                state={location.state}
                country={location.country}
            />
            <View style={styles.textInputDiv}>
                <Feather name="search" size={22} style={{marginLeft:10,color:"#000"}} />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Find your products..."
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={(val)=>searchFilter(val)}
                />
            </View>
            <VendorsNearby 
                vendorProfile={(item)=>navigation.navigate("VendorProfile",item)}
                login={()=>navigation.navigate("SignIn")}
            />
            <View style={{marginHorizontal:20}}>
                <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between",marginVertical:20}}>
                    <Text style={styles.subHeader}>Browse Categories</Text>   
                    <TouchableOpacity
                        style={{
                            backgroundColor:"#ff1493",
                            paddingHorizontal:10,
                            paddingVertical:3,
                            borderRadius:5
                        }}
                        onPress={toggle}
                    >
                        <Text style={{
                            color:"#fff",
                            fontSize:12
                        }}>Request a product</Text>
                    </TouchableOpacity>  
                </View>     
                {
                    indicator1 ? <ActivityIndicator /> : <Categories />
                }             
            </View>
            <View style={{marginHorizontal:20,marginTop:10}}>
                <View style={{marginBottom:10}}>
                    <Text style={styles.subHeader}>Browse Services</Text>
                </View>          
                {
                    indicator2 ? <ActivityIndicator /> : <Services />
                }             
            </View>
            <BottomSheet
            visible={isVisible}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}
            >
                <View style={styles.sheet}>
                    <Text style={{
                        color:"#000",
                        fontWeight:"600",
                        marginVertical:10
                    }}>
                        Request a Product
                    </Text>
                    <View 
                        style={{
                            width:"80%",
                            borderWidth:0.5,
                        }}
                    />
                    <TextInput 
                        style={{
                            backgroundColor:"#ffe4e1",
                            width: "80%",
                            marginTop:20,
                            borderRadius:5,
                            color:"#000",
                            paddingLeft: 10
                        }}
                        placeholder="Title"
                        placeholderTextColor="gray"
                        value={title}
                        onChangeText={(val)=>setTitle(val)}
                    />
                    <TextInput 
                        style={{
                            backgroundColor:"#ffe4e1",
                            width: "80%",
                            marginTop:20,
                            borderRadius:5,
                            color:"#000",
                            paddingLeft: 10,
                            textAlignVertical:"top",
                            paddingTop:10,
                            height:80
                        }}
                        placeholder="Description"
                        placeholderTextColor="gray"
                        value={description}
                        onChangeText={(val)=>setDescription(val)}
                    />
                    {
                        indicator3 ? <ActivityIndicator style={{marginTop:40}} color="#ff1493" size={24} />
                        :
                        success ? 
                        <Text style={{
                            color:"green",
                            marginTop:40,
                            fontSize:13
                        }}>
                            Request has been sent
                        </Text>
                        :
                        <TouchableOpacity 
                            style={{
                                backgroundColor:"#ff1493",
                                marginTop:40,
                                paddingVertical:5,
                                paddingHorizontal:10,
                                borderRadius:5
                            }}
                            onPress={sendRequest}
                        >
                            <Text style={{color:"#fff"}}>send request</Text>
                        </TouchableOpacity>
                    }
                </View>
            </BottomSheet>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1"
    },
    mainView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor: "#aaa"
    },
    cat: {
        height:40,
        width:"48%",
        backgroundColor:"#fff",
        borderRadius:10,
        justifyContent:"center",
        marginBottom:10
    },
    subHeader: {
        color:"#000",
        fontWeight:"bold",
        fontSize:16
    },
    smImg: {
        height:30,
        width:30,
        borderRadius:15,
        backgroundColor:"pink",
        marginRight:10
    },
    name: {
        color:"#000",
        fontSize:12,
        flexWrap:"wrap",
        textTransform: "capitalize"
    },
    subView: {
        flexDirection:"row",
        alignItems:"center",
        marginLeft:10
    },
    boxContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"wrap"
    },
    circle: {
        height:80,
        width:80,
        borderRadius:80/2,
        backgroundColor:"gray"
    },
    heading: {
        fontWeight:"bold",
        color:"#000",
        marginLeft:20,
        fontSize:16
    },
    textInputDiv: {
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        height: 40,
        color: "#000",
        paddingLeft: 15,
        width: "85%"
    },
    sheet: {
        height:350,
        backgroundColor:"#fff",
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        alignItems:"center"
    }
})