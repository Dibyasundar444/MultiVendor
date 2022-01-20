import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TextInput, 
    KeyboardAvoidingView, 
    ScrollView, 
    TouchableOpacity, 
    StatusBar
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const { height, width } = Dimensions.get("window");

export default function SignIn({navigation}){

    const UserType = ["user","vendor"];
    const [num, setNum] = useState("");
    const [error, setError] = useState(false);
    const [error1, setError1] = useState(false);
    const [user, setUser] = useState("");


    const inputHandler=()=>{
        if(num==="" || num.length !== 10){
            setError(true);
        }
        else{
            setError(false);
        }
    };

    let navData = {
        "number": num,
        "user": user
    };

    const submit=()=>{
        if(num === "" || num.length !== 10){
            setError(true);
        }else if(user === ""){
            setError1(true);
        }
        else{
            setError1(false);
            navigation.navigate("OtpVerify",navData);
        }
    };

    return(
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="#0d5434" /> */}
            <View style={styles.heading}>
                <Text style={{textAlign:"center",color:"#fff",fontSize: 20}}>Joyayog</Text>
            </View>
            <View style={styles.modal}>
                <ScrollView style={{marginTop: 20, marginHorizontal: 30}}>
                    <View style={{flexDirection:"row",alignItems:"center",marginBottom:20,justifyContent:"space-between"}}>
                        <Text style={{color:"#000",fontSize:22}}>Sign In</Text>
                        <SelectDropdown
                            data={UserType}
                            defaultButtonText={"User type"}
                            onSelect={(selectedItem) => {
                                setUser(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdownBtnStyle}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <MaterialIcons
                                    name={isOpened ? "expand-less" : "expand-more"}
                                    color={"#000"}
                                    size={24}
                                    />
                                );
                                }}
                            dropdownIconPosition={"right"}
                            dropdownStyle={styles.DropdownStyle}
                            rowStyle={styles.rowStyle}
                        />
                    </View>
                    {error1 ? <Text style={styles.error1}>please select your user type</Text>:null}
                    <Text style={{color:"#000",fontSize:14,marginBottom:10}}>Enter your phone number</Text>
                    <Text style={{color:"#000",fontSize:12}}>You will receive a 4-digit code for phone</Text>
                    <Text style={{color:"#000",fontSize:12}}>number verification</Text>
                    <KeyboardAvoidingView style={styles.textInputDiv}>
                        <Text style={{color:"#000",marginLeft:10}}>+91</Text>
                        <TextInput style={styles.textInput} 
                            placeholder="Phone number"
                            value={num}
                            onChangeText={(val)=>setNum(val)}
                            keyboardType="number-pad"
                            placeholderTextColor="gray"
                            onBlur={inputHandler}
                        />
                    </KeyboardAvoidingView>
                    {error ? <Text style={{fontSize:12,color:"red",textAlign:"center"}}>please enter a valid number</Text>: null}
                    <TouchableOpacity style={styles.otp} activeOpacity={0.6} onPress={submit}>
                        <Text style={{color:"#fff",fontWeight:"800"}}>Get OTP</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#054d36"
    },
    heading: {
        marginTop: height/5,
        height: height/4
    },
    modal: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    textInputDiv: {
        marginHorizontal: 20,
        marginVertical: 20,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    textInput: {
        height: 60,
        color: "#000",
        paddingLeft: 15,
        width: "80%"
    },
    otp: {
        borderRadius: 10,
        backgroundColor: "#42b349",
        elevation: 5,
        marginHorizontal: width/6,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginVertical: 20
    },
    dropdownBtnStyle: {
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 5,
        marginHorizontal: 5,
        width: width/2.5,
        marginVertical: 2,
    },
    rowStyle: {
        borderRadius: 20,
    },
    error1: {
        color:"red",
        textAlign:"center",
        fontSize:12,
        top: -10
    }
})