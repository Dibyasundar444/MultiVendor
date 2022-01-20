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


export default function MenuHeader({nav}){
    return(
        <>
            <View style={styles.header}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <EvilIcons name="location" color="#fff" size={24} />
                    <Text style={{color:"#fff",fontSize:12,marginRight:10}}>Gujrat, India</Text>
                    <Entypo name="chevron-thin-down" color="#fff" size={16} />
                </View>
                <Ionicons name="person-outline" color="#fff" size={24} onPress={nav} />
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
        color:"#fff",
        fontSize:10,
        marginTop:5
    },
    heading: {
        fontWeight:"bold",
        color:"#fff",
        marginLeft:20,
        fontSize:16
    }
})