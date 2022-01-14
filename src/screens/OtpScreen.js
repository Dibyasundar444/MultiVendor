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
import OTPInputView from '@twotalltotems/react-native-otp-input';

const { height, width } = Dimensions.get("window");

export default function OtpVerify({route,navigation}){

    const number = route.params;
    const fNumber = number.split("",6);
    const [num, setNum] = useState("");


    const submit=()=>{
        navigation.navigate("Home");
    };
    const resendOTP=()=>{}

    return(
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="#0d5434" /> */}
            <View style={styles.heading}>
                <Text style={{textAlign:"center",color:"#fff",fontSize: 20}}>Joyayog</Text>
            </View>
            <View style={styles.modal}>
                <ScrollView style={{marginTop: 20, marginHorizontal: 30}}>
                    <Text style={{color:"#000",fontSize:22,marginBottom:20}}>Sign In</Text>
                    <Text style={{color:"#000",fontSize:14,marginBottom:10}}>Enter your code</Text>
                    <Text style={{color:"#000",fontSize:12}}>Please enter the 4-digit verification code sent</Text>
                    <Text style={{color:"#000",fontSize:12}}>to +91 {fNumber}****</Text>
                    <KeyboardAvoidingView style={styles.textInputDiv}>
                        <OTPInputView
                            style={styles.input}
                            pinCount={4}
                            code={num}
                            onCodeChanged={(code)=>setNum(code)}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled = {(code) => {
                                setNum(code)
                            }}
                        />
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.otp} activeOpacity={0.6} onPress={submit} disabled={num.length !==4 ? true : false}>
                        <Text style={{color:"#fff",fontWeight:"800"}}>Continue</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <Text style={{color:"blue",marginRight:5}} onPress={resendOTP}>Resend</Text>
                    </View>
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
        alignItems:"center",
        marginVertical: 20
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
    underlineStyleBase: {
        width: 59,
        height: 50,
        elevation: 5,
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: 10

    },
    underlineStyleHighLighted: {
    // borderColor: "#03DAC6",
    },
    input: {
        width: "80%",
        height: 50
    }
})