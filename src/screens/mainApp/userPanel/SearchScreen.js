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
    TextInput
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import SearchHeader from "./utils/searchHeader";
import axios from "axios";
import { API } from "../../../../config";
import VendorsNearby from "./VendorsNearby";


const { height, width } = Dimensions.get("window");

export default function SearchScreen({navigation}){

    const [catData, setCatData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [indicator1, setIndicator1] = useState(true);
    const [indicator2, setIndicator2] = useState(true);
    const [text, setText] = useState("");
    const [filterData, setFilterData] = useState([]);

    useEffect(()=>{
        getCategories();
        getServices();
    },[]);

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
                            <View style={styles.smImg} />
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
                            <View style={styles.smImg} />
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


    return(
        <ScrollView style={styles.container}showsVerticalScrollIndicator={false} >
            <SearchHeader
                nav={()=>navigation.navigate("Alert")}
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
            />
            <View style={{marginHorizontal:20}}>
                <Text style={styles.subHeader}>Browse Categories</Text>          
                {
                    indicator1 ? <ActivityIndicator /> : <Categories />
                }             
            </View>
            <View style={{marginHorizontal:20,marginBottom:height/5,marginTop:10}}>
                <Text style={styles.subHeader}>Browse Services</Text>          
                {
                    indicator2 ? <ActivityIndicator /> : <Services />
                }             
            </View>
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
        marginBottom:20,
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
})