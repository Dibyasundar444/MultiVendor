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


const { height, width } = Dimensions.get("window");

export default function SignIn({navigation}){

    const [num, setNum] = useState("");
    const [error, setError] = useState(false);


    const inputHandler=()=>{
        if(num==="" || num.length !== 10){
            setError(true);
        }
        else{
            setError(false);
        }
    };

    const submit=()=>{
        if(num === "" || num.length !== 10){
            setError(true);
        }
        else{
            navigation.navigate("OtpVerify",num);
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
                    <Text style={{color:"#000",fontSize:22,marginBottom:20}}>Sign In</Text>
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
    }
})