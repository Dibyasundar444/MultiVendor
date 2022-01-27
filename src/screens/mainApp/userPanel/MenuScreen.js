import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions 
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MenuHeader from "./utils/menuHeader";

const data=[
    {
        "id":"0"
    },
    {
        "id":"1"
    },
    {
        "id":"2"
    },
    {
        "id":"3"
    },
    {
        "id":"4"
    },
    {
        "id":"5"
    },
    {
        "id":"6"
    },
    {
        "id":"7"
    },
    {
        "id":"8"
    },
    {
        "id":"9"
    },
];


const { height, width } = Dimensions.get("window");

export default function Menu({navigation}){
    return(
        <ScrollView style={styles.container}>
            <MenuHeader 
                alert={()=>navigation.navigate("Alert")}
                vendorProfile={()=>navigation.navigate("VendorProfile")}
            />
            <View style={{marginLeft:20,marginTop:20}}>
                <Text style={{color:"#000",fontWeight:"bold",marginBottom:20,fontSize:16}}>Latest Products</Text>
                <FlatList 
                    horizontal={true}
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item})=>(
                        <View key={item.id} style={styles.box}>
                            <View style={{height: width/3.5,backgroundColor:"pink",width:"100%",borderRadius:10}} />
                            <View style={{marginLeft:10,marginTop:5}}>
                                <Text style={{color:"#000",fontSize:12}}>Product Name</Text>
                                <Text style={{color:"#000",fontSize:12}}>Details</Text>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"center",marginTop:5}}>
                                <Text style={{color:"#000",fontSize:10}}>Enquire</Text>
                                <EvilIcons name="arrow-right" color="#000" size={22} />
                            </View>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1"
    },
    box: {
        height: width/2,
        width: width/2.5,
        backgroundColor: "#fff",
        marginRight:10,
        marginBottom:10,
        elevation: 5,
        borderRadius: 10
    }
})