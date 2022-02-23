import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Linking,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import CategoryHeader from './utils/CategoryHeader';
import {API, API_USER, API_VENDOR} from '../../../../config';
import Rating from './utils/Rating';


export default function ProductDetails({route, navigation}) {
  const preData = route.params;
  const [isVisible2, setIsvisible2] = useState(false);
  const [comment, setComment] = useState('');
  const [commentSent, setCommentSent] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [oneVendor, setOneVendor] = useState({});
  const [heartPressed, setHeartPressed] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [indicator2, setIndicator2] = useState(false);
  const [rating, setRating] = useState([]);
  
  useEffect(() => {
    views();
    setTimeout(() => {
      setCommentSent(false);
    }, 2000);
    getOneVendor();
    getWishlist();
    getCommentList();
  }, []);

  const openDialer = () => {
    let number = oneVendor.phoneNo;
    if (Platform.OS === 'ios') {
      number = `telprompt:${number}`;
    } else number = `tel:${number}`;
    Linking.openURL(number);
  };

  const views = () => {
    axios
      .patch(`${API_USER}/products/views/${preData._id}`)
      .then(resp => {
        console.log('New view added: ', resp.data.products.views);
      })
      .catch(err => {
        console.log('Server error: ', err);
      });
  };

  let MESSAGE = {
    title: "title",
    query: "msg",
    productId: preData._id,
    vendorId: oneVendor._id,
  };

  const _sendMsg = () => {
    axios
      .post(`${API}/contactvendors`, MESSAGE)
      .then(resp => {
        console.log(resp.data);
        navigation.navigate("Chat");
      })
      .catch(err => {
        console.log('Error from server MSG: ', err);
      });
  };

  let COMMENT = {
    comment: comment,
    productId: preData._id,
    vendorId: preData.vendor,
  };
  const _sendComment = () => {
    setIndicator(true);
    axios
      .post(`${API}/comment`, COMMENT)
      .then(resp => {
        setIndicator(false);
        setCommentSent(true);
        getCommentList();
        console.log('Comment is Sent');
        setComment('');
      })
      .catch(err => {
        console.log('Error from server CMT: ', err);
      });
  };

  const commentMsg = () => {
    setTimeout(() => {
      setCommentSent(false);
    }, 5000);
    return (
      <Text style={{color: 'green', fontSize: 12, textAlign: 'center'}}>
        Sent successfully
      </Text>
    );
  };

  const getOneVendor = () => {
    axios
      .get(`${API_VENDOR}/onevendordetail/${preData.vendor}`)
      .then(resp => {
        setOneVendor(resp.data);
        let f_id = resp.data._id.split('',2);
        global.f_id = f_id;
      })
      .catch(err => {
        console.log('OneVendor Error: ', err);
      });
  };

  const addWishList = async () => {
    setHeartPressed(!heartPressed);
    if (!heartPressed) {
      wishlist.push(preData);
      await AsyncStorage.setItem('MyWishList', JSON.stringify(wishlist));
    } else if (heartPressed) {
      const removeItem = wishlist.filter(item => item._id !== preData._id);
      await AsyncStorage.setItem('MyWishList', JSON.stringify(removeItem));
    }
  };

  const getWishlist = async () => {
    try {
      const listJSON = await AsyncStorage.getItem('MyWishList');
      const listParsed = JSON.parse(listJSON);
      if (listParsed !== null) {
        setWishlist(listParsed);
        var __FOUND = listParsed.find(function (item, index) {
          if (item._id == preData._id) return true;
        });
        __FOUND !== undefined ? setHeartPressed(true) : setHeartPressed(false);
      } else {
        setWishlist([]);
        setHeartPressed(false);
      }
    } catch (err) {
      console.log('error of getting wishlist', err);
    }
  };

  const getCommentList = () => {
    axios
      .get(`${API}/commentofprod/${preData._id}`)
      .then(resp => {
        setCommentList(resp.data);
        console.log('ok');
      })
      .catch(err => {
        console.log('server err: ', err);
      });
  };
  const showComment = () => (
    commentList.map(item=>{
      return(
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
    );
  }
));

const toggle=()=>{
  setVisible((visible) => !visible)
};



  let ratingData={
    rating: rating.length,
    vendorId: oneVendor._id
  };
  console.log(ratingData);

  const _submitRating=()=>{
    setIndicator2(true);
    axios.patch(`${API_USER}/vendorreview`,ratingData)
    .then(resp=>{
      console.log(resp.data);
      setIndicator2(false);
    })
    .catch(err=>{
      console.log("err",err);
      setIndicator2(false);
    })
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#ffe4e1'}}>
          <CategoryHeader
            route={preData.title}
            back={() => navigation.goBack()}
            nav={() => navigation.navigate('Alert')}
          />
        </View>
        {!preData.images ? (
          <View style={styles.banner}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                textAlign: 'center',
                marginTop: 50,
              }}>
              No image available
            </Text>
          </View>
        ) : (
          <Image style={styles.banner} source={{uri: preData.images}} />
        )}
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.absWishlist}
            onPress={addWishList}
            activeOpacity={1}>
            <AntDesign
              name={heartPressed ? 'heart' : 'hearto'}
              color={heartPressed ? '#ff1493' : '#000'}
              size={18}
            />
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>{preData.title}</Text>
            {
              preData.availstatus === true ? 
              <Text style={{color: 'green', fontSize: 10,marginRight:10}}>Available</Text>
              :
              <Text style={{color: 'red', fontSize: 10}}>Not available</Text>
            }
          </View>
          <Text style={{color: '#000', fontSize: 12}}>{preData.content}</Text>
          <View style={{marginBottom: 20}}>
            <Text style={{color: '#000', fontSize: 13, marginVertical: 10}}>
              {preData.description}
            </Text>
            <Text style={{color: '#000', fontSize: 11, flexWrap: 'wrap'}}>
              {preData.des}
            </Text>
          </View>
          <Text style={{color: '#000'}}>Vendor Details</Text>
          <View style={[styles.titleView, {marginVertical: 10}]}>
            <View style={{alignItems: 'center'}}>
              <Image style={styles.profile} source={{uri : oneVendor.profileImg}} />
              {
                oneVendor.name ? 
                <Text
                style={{
                  color: '#000',
                  fontSize: 12,
                  textTransform: 'capitalize',
                }}>
                {oneVendor.name}
              </Text>
              :
              <Text
                style={{
                  color: '#000',
                  fontSize: 12,
                  textTransform: 'capitalize',
                }}>
                Vendor{global.f_id}**
              </Text>
              }
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={()=>setVisible(true)}
                style={[styles.smCircle, {backgroundColor: '#f0bc43'}]}>
                <FontAwesome name="star-o" color="#fff" size={20} />
              </TouchableOpacity>
              <Text style={{color: '#000', fontSize: 12}}>{oneVendor.ratings}/5</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={[styles.smCircle, {backgroundColor: '#89f27c'}]}
                onPress={openDialer}>
                <Feather
                  name="phone-call"
                  color="#fff"
                  size={18}
                  style={{marginBottom: -2, marginLeft: -2}}
                />
              </TouchableOpacity>
              <Text style={{color: '#000', fontSize: 12}}>Call</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={[styles.smCircle, {backgroundColor: '#89f27c'}]}
                onPress={_sendMsg}>
                <Ionicons
                  name="chatbox-ellipses-outline"
                  color="#fff"
                  size={20}
                />
              </TouchableOpacity>
              <Text style={{color: '#000', fontSize: 12}}>Chat</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={styles.cmntInput}
              placeholder="Write your comment..."
              placeholderTextColor="gray"
              value={comment}
              onChangeText={val => setComment(val)}
            />
            {indicator ? (
              <ActivityIndicator style={{marginLeft: 10}} size={24} />
            ) : (
              <TouchableOpacity
                onPress={_sendComment}
                disabled={comment !== '' ? false : true}>
                <MaterialCommunityIcons
                  name="send-circle"
                  color="#ff1493"
                  size={44}
                />
              </TouchableOpacity>
            )}
          </View>
          {commentSent && commentMsg()}
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
          {isVisible2 && (
            <>
              {showComment()}
            </>
          )}
        </View>
        <Rating 
          visible={visible}
          toggle={toggle}
          vendorName={oneVendor.name}
          indicator={indicator2}
          submitRating={_submitRating}
          ratingArr={rating}
          setRatingArr={setRating}
        />
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
    backgroundColor: 'gray',
    marginTop: -10,
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
  cmntInput: {
    width: '85%',
    marginRight: 5,
    borderRadius: 35,
    paddingLeft: 15,
    color: '#000',
    backgroundColor: '#ffe4e1',
  },
  absWishlist: {
    position: 'absolute',
    right: 20,
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    top: -35,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cmntCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
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
