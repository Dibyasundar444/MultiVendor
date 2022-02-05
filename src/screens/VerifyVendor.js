import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyVendor = ({navigation}) => {

    const [isVendor, setIsVendor] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`${API}/admin/alladmins`)
        .then(resp=>{
            setLoading(false);
            if(resp.data[0].role == 1){
                console.log(resp.data);
                setIsVendor(true);
                navigation.navigate("VendorPanel");
            }
            else{
                setIsVendor(false);
            }
        })
        .catch(err=>{
            setLoading(false);
            console.log("server error: ",err);
        })
    },[]);

    const goBack=async()=>{
        await AsyncStorage.removeItem("jwt");
        navigation.navigate("SignIn");
    };

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        {
            loading ? 
            <>
                <Text style={{color:"#000"}}>Please wait...</Text>
                    <Text style={{color:"#000",marginBottom:40}}>Verifying for vendor profile...</Text>
                <ActivityIndicator color="blue" size={40} />
            </>
            :
            !isVendor &&
            <>
                <Text style={{color:"#000"}}>Vendor verification failed</Text>
                <Text style={{color:"blue",marginVertical:20}}
                    onPress={goBack}
                >SignIn again</Text>
            </>
        }
    </View>
  );
};

export default VerifyVendor;
