import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from "react-native-btr";
const RATING=[{id:0},{id:1},{id:2},{id:3},{id:4}];

export default function Rating({
    visible,indicator,vendorName,submitRating,toggle,ratingArr,setRatingArr
}) {

  const click=(item)=>{
    !ratingArr.includes(`${item.id}`)
    ?
    setRatingArr([...ratingArr,`${item.id}`])
    :
    setRatingArr(
      ratingArr.filter(
          data => data !== `${item.id}`
      )
    )
  };

  return (
    <View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View style={styles.card}>
          <Text style={{color:"hotpink",marginTop:10,fontWeight:"600"}}>Review {vendorName}</Text>
          <View style={{justifyContent:"center",flex:1}}>
            <View style={{
                flexDirection:"row",
                alignItems:"center"
            }}>
              {
                RATING.map((item)=>(
                  <AntDesign name={ratingArr.includes(`${item.id}`) ? "star" : 'staro'}
                    color={ratingArr.includes(`${item.id}`) ? "#fc9d28" : '#000'}
                    size={30} 
                    key={item.id} 
                    style={{marginHorizontal:10}}
                    onPress={()=>click(item)} 
                  />
                ))
              }
            </View>
          </View>
          {
            indicator ? <ActivityIndicator style={{marginBottom:20}} size={24} />
            :
            <TouchableOpacity 
            onPress={submitRating}
            style={{
              backgroundColor:"hotpink",
              paddingVertical:5,
              paddingHorizontal:15,
              borderRadius:5,
              marginBottom:10
            }}>
            <Text style={{color:"#fff",fontWeight:"600"}}>Submit</Text>
          </TouchableOpacity>
          }
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    minHeight: 160,
    alignItems: "center",
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
});
