import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {API} from '../../../../config';
import axios from 'axios';
import Header from './utils/header';
import { ImageSlider } from '../userPanel/utils/img-slider';

export default function ProductDetailsVendor({route, navigation}) {
  const preData = route.params;
  const IMAGES = [];
  preData.images.forEach(elemet=>{
    var innerObj = {img: elemet};
    IMAGES.push(innerObj);
  });
  const [commentList, setCommentList] = useState([]);
  const [isVisible2, setIsvisible2] = useState(false);

  useEffect(() => {
    getCommentList();
  }, []);


  const getCommentList = async() => {
    const json_Val = await AsyncStorage.getItem("jwt");
    const parsed = JSON.parse(json_Val);
    let axiosConfig = {
        headers:{
            Authorization: parsed.token
        }
    };
    axios
      .get(`${API}/commentofprod/${preData._id}`,axiosConfig)
      .then(resp => {
        setCommentList(resp.data);
      })
      .catch(err => {
        console.log('server err: ', err);
      });
  };

  const showComment = () =>(
    commentList.map(item=>(
      <View style={styles.cmntView} key={item._id}>
        {item.customerId.profileImg ? (
          <Image
            style={styles.cmntCircle}
            source={{uri: item.customerId.profileImg}}
          />
        ) : (
          <Image
            style={styles.cmntCircle}
            source={require('../../../assets/profile.png')}
          />
        )}
        <View style={{width: '90%', alignItems: 'flex-start'}}>
          {item.customerId.name ? (
            <Text style={{fontSize: 13, color: '#000'}}>
              {item.customerId.name}
            </Text>
          ) : (
            <Text style={{fontSize: 13, color: '#000'}}>
              {item.customerId._id.split('', 10)}***
            </Text>
          )}
          <View style={styles.cmntBox}>
            <Text style={{color: '#000', fontSize: 12}}>
              {item.comment}
            </Text>
          </View>
        </View>
      </View>
    ))
  );
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={{backgroundColor: '#ffe4e1'}}>
          <Header
            isBack={true}
            back={() => navigation.goBack()}
            title={preData.title}
            notify={() => navigation.navigate('AlertScreen')}
            profile={() => navigation.navigate('ProfileScreen')}
            bellColor="#000"
          />
        </View>
        <View style={styles.banner}>
          <ImageSlider 
            data={IMAGES}
            autoPlay={true}
            closeIconColor="#fff"
            showIndicator={false}
            caroselImageContainerStyle={styles.img}
            timer={5000}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{preData.title}</Text>
            {
              preData.availstatus === true ? 
              <Text style={{color: 'green', fontSize: 10,marginRight:10}}>Available</Text>
              :
              <Text style={{color: 'red', fontSize: 10}}>Not available</Text>
            }
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{color: '#000', fontSize: 13, marginVertical: 10}}>
              {preData.content}
            </Text>
            <Text style={{color: '#000', fontSize: 11, flexWrap: 'wrap'}}>
              {preData.description}
            </Text>
          </View>
          <View style={{alignItems: 'flex-start', marginTop: 10}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              activeOpacity={0.7}
              onPress={() => setIsvisible2(!isVisible2)}>
              <Text style={{color: '#000', fontSize: 14, marginRight: 10}}>
                View Comments ({commentList.length})
              </Text>
              <AntDesign
                name={isVisible2 ? 'up' : 'down'}
                color="#000"
                size={18}
              />
            </TouchableOpacity>
          </View>
          {isVisible2 && <>{showComment()}</>}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    backgroundColor: '#f7984f',
    marginTop: -10,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
  },
  body: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  profile: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'gray',
  },
  smCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comInput: {
    width: '85%',
    marginRight: 5,
    borderRadius: 35,
    paddingLeft: 10,
    color: '#000',
    backgroundColor: '#ffe4e1',
  },
  cmntCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    // backgroundColor: 'gray',
    marginRight: 10,
  },
  cmntBox: {
    backgroundColor: '#ffe4e1',
    padding: 5,
    borderRadius: 5,
  },
  cmntView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
});
