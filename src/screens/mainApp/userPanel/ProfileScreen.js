import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions, 
    TextInput
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";




const { height, width } = Dimensions.get("window");

export default function ProfileScreen({navigation}){

    const [text, setText] = useState("");


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerSub}>
                    <AntDesign name="left" color="#fff" size={24} onPress={()=>navigation.goBack()} />
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Text style={{color:"#fff",fontWeight:"500"}}>Profile</Text>
                        <View style={styles.round}>
                            <Ionicons name="person-outline" color="#fff" size={22} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bgCard}>
                    <View style={styles.img} />
                    <View style={styles.texts}>
                        <Text style={{color:"#000",fontWeight:"500"}}>John</Text>
                        <Text style={{color:"#000",fontSize: 12}}>+91 1234567890</Text>
                    </View>
                </View>
                <Text style={{marginLeft:25,marginTop:20,color:"#000",marginBottom:5}}>Account</Text>
                <View style={styles.smCard}>
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <Ionicons name="person-outline" color="#000" size={18}/>
                        <Text style={{color:"#000",marginLeft: 20}}>Profile</Text>
                    </View>
                    <AntDesign name="right" color="#000" size={18} style={{marginRight: 20}} />
                </View>
                <View style={styles.smCard}>
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <Octicons name="tasklist" color="#000" size={16}/>
                        <Text style={{color:"#000",marginLeft: 20}}>Wishlist</Text>
                    </View>
                    <AntDesign name="right" color="#000" size={18} style={{marginRight: 20}} />
                </View>
                <View style={styles.smCard}>
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <AntDesign name="sharealt" color="#000" size={18}/>
                        <Text style={{color:"#000",marginLeft: 20}}>Share</Text>
                    </View>
                    <AntDesign name="right" color="#000" size={18} style={{marginRight: 20}} />
                </View>
                <View style={styles.smCard}>
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <AntDesign name="setting" color="#000" size={18}/>
                        <Text style={{color:"#000",marginLeft: 20}}>Setting</Text>
                    </View>
                    <AntDesign name="right" color="#000" size={18} style={{marginRight: 20}} />
                </View>
                <View style={styles.smCard}>
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:20}}>
                        <MaterialIcons name="logout" color="#000" size={20}/>
                        <Text style={{color:"#000",marginLeft: 20}}>Logout</Text>
                    </View>
                    <AntDesign name="right" color="#000" size={18} style={{marginRight: 20}} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#054d36"
    },
    header: {
        // height: height/8,
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
        backgroundColor: "#42b349",
        height: 40,
        width: 40,
        borderRadius: 40/2,
        marginLeft: 10
    },
    body: {
        backgroundColor:"#fff",
        flex:1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
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
        backgroundColor: "#aaa",
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
    }
})