import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    PermissionsAndroid,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import AddProduct_Header from "./utils/addProductHeader";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { height, width } from "./ChatScreen";


export default function AddProduct({navigation}){

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [cost, setCost] = useState("");
    const [file, setFile] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    // console.log("Path: ", file.uri);
    // // console.log("Base64: ", file.base64);
    // console.log("Name: ", file.fileName);
    // console.log("Type: ", file.type);


    // const requestCameraPermission=async()=>{
    //     if(Platform.OS === 'android'){
    //         try{
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.CAMERA,{
    //                     title: "Camera Permission",
    //                     message: "App needs camera permission"
    //                 }
    //             );
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         }
    //         catch(err){
    //             console.log(err);
    //             return false;
    //         }
    //     }
    //     else return true;
    // };

    // const requestLibraryPermission=async()=>{
    //     if(Platform.OS === 'android'){
    //         try{
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
    //                     title: "Files Permission",
    //                     message: "App needs storage permission"
    //                 }
    //             );
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         }
    //         catch(err){
    //             console.log(err);
    //             alert("Storage permission error", err)
    //         }
    //         return false;
    //     }
    //     else return true;
    // };

    const openCamera=async()=>{
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true
        };
        // let isCameraPermitted = await requestCameraPermission();
        // let isStoragePermitted = await requestLibraryPermission();

        // if(isCameraPermitted && isStoragePermitted){
            launchCamera(options, resp => {
                if(resp.didCancel){
                    console.log("Canceled");
                    setIsVisible(false);
                }
                else if(resp.error){
                    console.log("Error: ", resp.error);
                    setIsVisible(false);
                }
                else{
                    resp.assets.map(x=>setFile(x));
                    setIsVisible(false);
                }
            })
        // }
    };
    const openLibrary=async()=>{
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true
        };
        // let isCameraPermitted = await requestCameraPermission();
        // let isStoragePermitted = await requestLibraryPermission();

        // if(isCameraPermitted && isStoragePermitted){
            launchImageLibrary(options, resp => {
                if(resp.didCancel){
                    console.log("Canceled");
                    setIsVisible(false);
                }
                else if(resp.error){
                    console.log("Error: ", resp.error);
                    setIsVisible(false);
                }
                else{
                    resp.assets.map(x=>setFile(x));
                    setIsVisible(false);
                }
            })
        // }
    };

    const upload=()=>(
            <View style={styles.alertBox}>
                <Text style={styles.select}>Select Photo...</Text>
                <View style={styles.line} />
                <View style={{alignItems:"center",marginTop:20}}>
                    <TouchableOpacity style={styles.content}
                        onPress={openCamera}
                    >
                        <Text style={{color:"#fff"}}>launch camera</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical:8}} />
                <View style={{alignItems:"center"}}>
                    <TouchableOpacity style={styles.content}
                        onPress={openLibrary}
                    >
                        <Text style={{color:"#fff"}}>select from storage</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lastView}>
                    <TouchableOpacity style={styles.cancel}
                        onPress={()=>setIsVisible(false)}
                    >
                        <Text style={{color:"#fff"}}>cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );

    return(
        <ScrollView style={[styles.container,isVisible && {backgroundColor:'rgba(0,0,0,0.7)'}]}>
            <AddProduct_Header 
                goBack={()=>navigation.goBack()}
                notify={()=>navigation.navigate("AlertScreen")}
            />
            <View style={{marginTop: 60}} />
            <TouchableOpacity 
                style={[styles.input1,isVisible && {backgroundColor:'#aaa'}]}
                activeOpacity={0.6}
            >
                <View style={styles.cat}>
                    <Text style={{color:"gray"}}>Category</Text>
                    <AntDesign name="down" size={18} color="#000" />
                </View>
            </TouchableOpacity>
            <View style={[styles.textInput1,isVisible && {backgroundColor:'#aaa'}]}>
                <TextInput 
                    style={styles.Name}
                    placeholder="Name of Product"
                    placeholderTextColor="gray"
                    value={name}
                    onChangeText={(val)=>setName(val)}
                    editable={isVisible?false:true}
                />
            </View>
            <View style={styles.desc}>
                <TextInput 
                    style={[styles.Name,{
                            height:"100%",textAlignVertical:"top"
                        },isVisible && {
                            backgroundColor: "#aaa"
                        }
                    ]}
                    placeholder="Description"
                    placeholderTextColor="gray"
                    multiline={true}
                    value={desc}
                    onChangeText={(val)=>setDesc(val)}
                    editable={isVisible?false:true}
                />
            </View>
            <TouchableOpacity 
                style={[styles.textInput1,styles.image]}
                activeOpacity={0.8}
                onPress={()=>setIsVisible(true)}
            >
                <Text style={{color:"gray"}}>Images</Text>
                <Feather name="upload" color="#000" size={18} />
            </TouchableOpacity>
            <View style={styles.textInput1}>
                <TextInput 
                    style={styles.Name}
                    placeholder="Costs"
                    placeholderTextColor="gray"
                    value={cost}
                    onChangeText={(val)=>setCost(val)}
                />
            </View>
            <View style={{alignItems:"center",marginTop: 40}}>
                <TouchableOpacity style={styles.btn}
                    disabled={isVisible ? true : false}
                >
                    <Text style={{color:"#fff",fontWeight:"600"}}>Add Product</Text>
                </TouchableOpacity>
            </View>
            {isVisible && upload()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1"
    },
    textInput1: {
        height: 45,
        backgroundColor: "#fff",
        marginHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10
    },
    input1: {
        height: 45,
        backgroundColor: "#fff",
        marginHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent:"center",
        paddingHorizontal: 20,
    },
    Name: {
        paddingLeft: 20,
        borderRadius: 10,
        color: "#000",
    },
    desc: {
        backgroundColor: "#fff",
        marginHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
        height: 100
    },
    image: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:20
    },
    btn: {
        alignItems:"center",
        backgroundColor:"#ff1493",
        paddingVertical:13,
        paddingHorizontal:20,
        borderRadius:10
    },
    alertBox: {
        height:"40%",
        width:"90%",
        backgroundColor:"#fff",
        position:"absolute",
        left:20,
        right:20,
        bottom:height/3,
        top:height/3,
        borderRadius: 10,
    },
    cancel: {
        backgroundColor: "red",
        paddingVertical:8,
        paddingHorizontal: 15,
        borderRadius: 5
    },
    content: {
        backgroundColor:"#42b349",
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:10
    },
    select: {
        textAlign:"center",
        fontWeight:"700",
        marginTop:10,
        color:"#000",
        fontSize:16
    },
    lastView: {
        alignItems:"center",
        justifyContent:"flex-end",
        flex:1,
        marginBottom:15
    },
    line: {
        width:"80%",
        borderWidth:0.5,
        alignSelf:"center",
        marginTop:10
    },
    cat: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
});