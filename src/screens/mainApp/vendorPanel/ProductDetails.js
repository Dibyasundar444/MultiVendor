import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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

// import CategoryHeader from "./utils/CategoryHeader";
import {API, API_USER, API_VENDOR} from '../../../../config';
import axios from 'axios';
import Header from './utils/header';
// import ChatDialog from "./utils/chatDialog";

const {height, width} = Dimensions.get('window');

export default function ProductDetailsVendor({route, navigation}) {
  const preData = route.params;
  const [isVisible, setIsvisible] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [comment, setComment] = useState('');
  const [commentSent, setCommentSent] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [indicator2, setIndicator2] = useState(false);
  const [oneVendor, setOneVendor] = useState({});
  const [isVisible2, setIsvisible2] = useState(false);

  useEffect(() => {
    getCommentList();
    setTimeout(() => {
      setCommentSent(false);
    }, 2000);
  }, []);

  // let COMMENT = {
  //   comment: comment,
  //   productId: preData._id,
  //   vendorId: preData.vendor,
  // };
  // const _sendComment = () => {
  //   setIndicator(true);
  //   axios
  //     .post(`${API}/comment`, COMMENT)
  //     .then(resp => {
  //       setIndicator(false);
  //       setCommentSent(true);
  //       getCommentList();
  //       console.log('Comment is Sent', resp.data);
  //       setComment('');
  //     })
  //     .catch(err => {
  //       console.log('Error from server CMT: ', err);
  //     });
  // };

  // const commentMsg = () => {
  //   setTimeout(() => {
  //     setCommentSent(false);
  //   }, 5000);
  //   return (
  //     <Text style={{color: 'green', fontSize: 12, textAlign: 'center'}}>
  //       Sent successfully
  //     </Text>
  //   );
  // };

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
          <Image
            style={styles.img}
            source={{uri: preData.images}}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.body}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{preData.title}</Text>
            <Text style={{color: 'green', fontSize: 12}}>data.status</Text>
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
      {/* <View style={{position: 'absolute', bottom: 10, left: 0, right: 0}}>
        {commentSent && commentMsg()}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <TextInput
            style={styles.comInput}
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
      </View> */}
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
    width: '100%',
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
