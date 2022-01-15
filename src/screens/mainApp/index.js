import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Menu from "./MenuScreen";
import SearchScreen from "./SearchScreen";
import ChatScreen from "./ChatScreen";
import AlertScreen from "./AlertScreen";




export default function MainApp({navigation}){

    const [index, setIndex] = useState(0);

    const segmentClicked=(index)=>{
        setIndex(index);
    };


    const bottomTab=()=>(
        <View style={styles.bottomTab}>
            <TouchableOpacity 
                style={[styles.btn1_inActiveStyle, index===0 && styles.btn1_activeStyle]}
                active={index===0} onPress={()=>segmentClicked(0)}
            >
                <View style={{right: index===0 ? -10 : null,alignItems:"center"}}>
                    <AntDesign name="menufold" size={22} color={index===0?"#fff":"#000"} />
                    <Text style={{color:index===0?"#fff":"#000",fontSize:10}}>Menu</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btn2_inActiveStyle}
                active={index===1} onPress={()=>segmentClicked(1)}
            >
                <View style={[index===1 && styles.btn2SubView,{alignItems:"center"}]}>
                    <Feather name="search" size={24} color={index===1?"#fff":"#000"} />
                    <Text style={{color:index===1?"#fff":"#000",fontSize:10}}>Search</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btn2_inActiveStyle}
                active={index===2} onPress={()=>segmentClicked(2)}
            >
                <View style={[index===2 && styles.btn2SubView,{alignItems:"center"}]}>
                    <Ionicons name="chatbox-ellipses-outline" size={24} color={index===2?"#fff":"#000"} />
                    <Text style={{color:index===2?"#fff":"#000",fontSize:10}}>Chat</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.btn4_inActiveStyle, index===3 && styles.btn4_activeStyle]}
                active={index===3} onPress={()=>segmentClicked(3)}
            >
                <View style={{left: index===3 ? -10 : null,alignItems:"center"}}>
                    <Fontisto name="bell" size={22} color={index===3?"#fff":"#000"} />
                    <Text style={{color:index===3?"#fff":"#000",fontSize:10}}>Alerts</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderPages=()=>{
        if(index === 0){
            return <Menu 
                        navigate={()=>navigation.navigate("Profile")}
                    />
        }
        else if(index === 1){
            return <SearchScreen
                        navigate={()=>navigation.navigate("Profile")}
                    />
        }
        else if(index === 2){
            return <ChatScreen 
                        navigate={()=>navigation.navigate("Profile")}
                    />
        }
        else{
            return <AlertScreen 
                        navigate={()=>navigation.navigate("Profile")}
                    />
        }
    };

    return(
        <View style={styles.container}>
            <View style={{flex:1}}>
                {renderPages()}
            </View>
            <View>
                {bottomTab()}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#054d36"
    },
    bottomTab: {
        backgroundColor: "#fff",
        elevation: 5,
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    btn1_activeStyle: {
        backgroundColor:"#42b349",
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
    btn1_inActiveStyle: {
        flex:1,
        height:50,
        justifyContent:"center",
        alignItems:"center",
    },
    btn4_activeStyle: {
        backgroundColor:"#42b349",
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10
    },
    btn4_inActiveStyle: {
        flex:1,
        height:50,
        justifyContent:"center",
        alignItems:"center",
    },
    btn2_inActiveStyle: {
        flex:1,
        height:80,
        justifyContent:"center",
        alignItems:"center",
    },
    btn2SubView: {
        backgroundColor:"#42b349",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:50,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
    }
})