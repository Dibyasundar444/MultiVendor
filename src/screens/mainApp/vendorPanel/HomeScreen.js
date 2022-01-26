import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions, 
    Image
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Header from "./utils/header";

const data=[
    {
        "id":"0",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"1",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"2",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"3",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"4",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"5",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"6",
        "name": "Product Name",
        "Deatails": "Details",
        "views": "205",
        "img": require("../../../assets/image1.jpeg")
    },
];
const serviceData=[
    {
        "id":"0",
        "title":"Beauty Parlours",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"1",
        "title":"DTH",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"2",
        "title":"Landline",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"3",
        "title":"Beauty Parlours",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"4",
        "title":"Beauty Parlours",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"5",
        "title":"Beauty Parlours",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"6",
        "title":"Beauty Parlours",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"7",
        "title":"Beauty Parlours",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"8",
        "title":"Beauty Parlours",
        "img": require("../../../assets/image1.jpeg")
    },
    {
        "id":"9",
        "title":"Beauty Parlours",
        "img": require("../../../assets/image1.jpeg")
    },
];

const { height, width } = Dimensions.get("window");
let clickBoxHeight = height/4.5;


export default function HomeScreen({navigation}){


    return(
        <View style={styles.container}>
            <Header 
                title="Hi, John Vendor"
                date="Jan 21, 2022"
                notify={()=>navigation.navigate("AlertScreen")}
                bellColor="#000"
            />
            <View style={styles.body}>
                {/* <View style={styles.body1}> */}
                    <Text style={{color:"#000",fontSize:16,fontWeight:"600"}}>This Month</Text>
                    {/* <TouchableOpacity onPress={()=>navigation.navigate("addProductScreen")}>
                        <Text style={{color:"#fff",fontSize:12}}>+Add Product</Text>
                        <View style={{width:90,borderWidth:0.5,borderColor:"#fff"}} />
                    </TouchableOpacity> */}
                {/* </View> */}
                <View>
                    <FlatList 
                        data={data}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item=>item.id}
                        renderItem={({item,index})=>(
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.6}
                                style={styles.box}
                            >
                                <View style={styles.boxSubView}>
                                    <Image style={styles.img} source={item.img} />
                                </View>
                                <View style={{marginLeft:5,marginTop:5}}>
                                    <Text style={{fontSize:12,color:"#000"}}>{item.name}</Text>
                                    <Text style={{fontSize:11,color:"#000"}}>{item.Deatails}</Text>
                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                        <Entypo name="eye" color="#000" size={18} style={{marginRight:5}} />
                                        <Text style={{fontSize:10,color:"#000"}}>{item.views}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.body2}>
                    <View style={styles.body1}>
                        <Text style={{color:"#000",fontSize:16,fontWeight:"600"}}>My Services</Text>
                        <TouchableOpacity onPress={()=>{}}>
                            <Text style={{color:"#000",fontSize:12}}>+Add Services</Text>
                            <View style={{width:90,borderWidth:0.5,borderColor:"#000"}} />
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        style={{marginBottom:height/1.2}}
                        data={serviceData}
                        keyExtractor={item=>item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item,index})=>(
                            <View key={index} style={{borderBottomWidth:1}}>
                                <View style={styles.subView}>
                                    <View style={{alignItems:"center",flexDirection:"row"}}>
                                        <Image style={styles.bgCircle} source={item.img} />
                                        <Text style={{fontSize:12,color:"#000"}}>{item.title}</Text>
                                    </View>
                                    <AntDesign name="right" size={16} color="#000" />
                                </View>
                            </View>
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
    body: {
        marginLeft:20,
        marginTop:40,
        // marginBottom:height/2.5,
    },
    box: {
        height: clickBoxHeight,
        width: width/3,
        borderRadius: 10,
        marginRight: 10,
        marginTop:20,
        backgroundColor: "#aaa"
    },
    body1: {
        flexDirection:"row",
        alignItems:"flex-end",
        justifyContent:"space-between",
        marginRight:20
    },
    boxSubView: {
        backgroundColor:"#fff",
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        flex:1
    },
    img: {
        height:clickBoxHeight/2+20,
        width: width/3,
        resizeMode: "contain",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flex:1
    },
    body2: {
        marginTop: 20,
    },
    subView: {
        flexDirection:"row",
        alignItems:"center",
        marginRight:20,
        marginVertical:15,
        justifyContent:"space-between"
    },
    bgCircle: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        // backgroundColor: "#aaa",
        marginRight: 10
    },
    time: {
        position: "absolute",
        right: 0,
        top: 0
    },
    msg: {
        color:"#aaa",
        fontSize:10,
        top:2,
        marginRight:50
    },
    name: {
        color:"#fff",
        fontWeight:"500"
    },
    timeTxt: {
        color:"#fff",
        fontSize:12
    }
})