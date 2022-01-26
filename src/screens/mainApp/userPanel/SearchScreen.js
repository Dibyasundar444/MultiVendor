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
import SearchHeader from "./utils/searchHeader";

const catData=[
    {
        "id":"0",
        "title":"Grocery"
    },
    {
        "id":"1",
        "title":"Medicines"
    },
    {
        "id":"2",
        "title":"Used Cars"
    },
    {
        "id":"3",
        "title":"Beauty"
    },
    {
        "id":"4",
        "title":"Computers"
    },
    {
        "id":"5",
        "title":"Camera"
    },
];

const serviceData=[
    {
        "id":"0",
        "title":"Clothing"
    },
    {
        "id":"1",
        "title":"Electronics"
    },
    {
        "id":"2",
        "title":"Toys"
    },
    {
        "id":"3",
        "title":"Books"
    },
    {
        "id":"4",
        "title":"Clothing"
    },
    {
        "id":"5",
        "title":"Clothing"
    },
];

const { height, width } = Dimensions.get("window");

export default function SearchScreen({navigation}){
    return(
        <ScrollView style={styles.container}showsVerticalScrollIndicator={false} >
            <SearchHeader
                nav={()=>navigation.navigate("Alert")}
            />
            <View style={{marginHorizontal:20}}>
                <Text style={{color:"#000",fontWeight:"bold",marginBottom:20,fontSize:16}}>Browse Categories</Text>          
                <FlatList 
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={catData}
                    columnWrapperStyle={{justifyContent:"space-between"}}
                    renderItem={({item})=>(
                        <TouchableOpacity
                            style={styles.cat} 
                            key={item.id}
                            onPress={()=>navigation.navigate("Categories",item.title)}
                        >
                            <View style={{flexDirection:"row",alignItems:"center",marginLeft:10}}>
                                <View style={{height:30,width:30,borderRadius:15,backgroundColor:"pink",marginRight:10}} />
                                <Text style={{color:"#000",fontSize:12,flexWrap:"wrap"}}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />             
            </View>
            <View style={{marginHorizontal:20,marginBottom:height/5,marginTop:10}}>
                <Text style={{color:"#000",fontWeight:"bold",marginBottom:20,fontSize:16}}>Browse Services</Text>          
                <FlatList 
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={serviceData}
                    columnWrapperStyle={{justifyContent:"space-between"}}
                    renderItem={({item})=>(
                        <TouchableOpacity 
                            style={styles.cat} key={item.id}
                            onPress={()=>{}}
                        >
                            <View style={{flexDirection:"row",alignItems:"center",marginLeft:10}}>
                                <View style={{height:30,width:30,borderRadius:15,backgroundColor:"pink",marginRight:10}} />
                                <Text style={{color:"#000",fontSize:12}}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
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
    }
})