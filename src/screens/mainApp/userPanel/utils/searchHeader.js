import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions 
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";


export default function SearchHeader({nav}){

    const [text, setText] = useState("");

    return(
        <>
            <View style={styles.header}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <EvilIcons name="location" color="#000" size={24} />
                    <Text style={{color:"#000",fontSize:12,marginRight:10}}>Gujrat, India</Text>
                    <Entypo name="chevron-thin-down" color="#000" size={16} />
                </View>
                <Fontisto name="bell" color="#000" size={24} onPress={nav} />
            </View>
            <View style={styles.textInputDiv}>
                <Feather name="search" size={22} style={{marginLeft:10,color:"#000"}} />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Find your products..."
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={(val)=>setText(val)}
                />
            </View>
            <View>
                <Text style={styles.heading}>Top Vendors Near you</Text>
                <ScrollView style={{marginVertical:20}} 
                    horizontal={true} s
                    howsHorizontalScrollIndicator={false}
                >
                    <View style={{alignItems:"center",marginLeft:20}}>
                        <View style={styles.circle} />
                        <Text style={styles.name}>Akash jai</Text>
                    </View>
                    <View style={{alignItems:"center",marginLeft:10}}>
                        <View style={styles.circle} />
                        <Text style={styles.name}>Akash jai</Text>
                    </View>
                    <View style={{alignItems:"center",marginLeft:10}}>
                        <View style={styles.circle} />
                        <Text style={styles.name}>Akash jai</Text>
                    </View>
                    <View style={{alignItems:"center",marginLeft:10}}>
                        <View style={styles.circle} />
                        <Text style={styles.name}>Akash jai</Text>
                    </View>
                    <View style={{alignItems:"center",marginLeft:10}}>
                        <View style={styles.circle} />
                        <Text style={styles.name}>Akash jai</Text>
                    </View>
                    <View style={{alignItems:"center",marginLeft:10}}>
                        <View style={styles.circle} />
                        <Text style={styles.name}>Akash jai</Text>
                    </View>
                    <View style={{alignItems:"center",marginLeft:10,marginRight:20}}>
                        <View style={styles.circle} />
                        <Text style={styles.name}>Akash jai</Text>
                    </View>
                </ScrollView>
            </View>
        </>
    )
};
const styles = StyleSheet.create({
    header: {
        marginVertical: 30,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    circle: {
        height:80,
        width:80,
        borderRadius:80/2,
        backgroundColor:"gray"
    },
    name: {
        color:"#000",
        fontSize:10,
        marginTop:5
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