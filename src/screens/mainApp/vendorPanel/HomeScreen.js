import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useIsFocused} from '@react-navigation/native';

import {API} from '../../../../config';
import Header from './utils/header';

const {height, width} = Dimensions.get('window');
let clickBoxHeight = height / 4.5;

export default function HomeScreen({navigation}) {
  const [serviceData, setServiceData] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading1, setloading1] = useState(true);
  const [loading2, setloading2] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    getLatestProductList();
    if (isFocused) {
      getServices();
    }
  }, [isFocused]);

  const getServices = () => {
    axios
      .get(`${API}/service`)
      .then(resp => {
        setServiceData(resp.data);
        setloading2(false);
      })
      .catch(err => {
        console.log('server error: ', err);
      });
  };
  const getLatestProductList = () => {
    axios
      .get(`${API}/products`)
      .then(resp => {
        setLatestProducts(resp.data.products);
        setloading1(false);
      })
      .catch(err => {
        console.log('server error: ', err);
      });
  };
  return (
    <View style={styles.container}>
      <Header
        title="Hi, John Vendor"
        date="Jan 21, 2022"
        notify={() => navigation.navigate('AlertScreen')}
        profile={() => navigation.navigate('ProfileScreen')}
        bellColor="#000"
      />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[2]}
      >
        <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
          This Month
        </Text>
        <View>
          {loading1 ? (
            <ActivityIndicator style={{marginVertical: 40}} size={30} />
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {latestProducts.map(item => (
                <TouchableOpacity
                  key={item._id}
                  activeOpacity={0.6}
                  style={styles.box}
                  onPress={()=>navigation.navigate("ProductDetailsVendor",item)} 
                >
                  <View style={styles.boxSubView}>
                    {item.images ? (
                      <Image
                        style={styles.img}
                        source={{uri: item.images}}
                        resizeMode="stretch"
                      />
                    ) : (
                      <View style={styles.img}>
                        <Text
                          style={{
                            color: 'gray',
                            fontSize: 12,
                            flexWrap: 'wrap',
                            marginTop: 30,
                            textAlign: 'center',
                            marginHorizontal: 5,
                          }}>
                          No Image available
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={{marginLeft: 5, marginTop: 5}}>
                    <Text style={{fontSize: 12, color: '#000'}}>
                      {item.title}
                    </Text>
                    <Text style={{fontSize: 11, color: '#000'}}>
                      {item.content}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo
                        name="eye"
                        color="#000"
                        size={18}
                        style={{marginRight: 5}}
                      />
                      <Text style={{fontSize: 10, color: '#000'}}>
                        {item.views}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.body2}>
          <View style={styles.body1}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
              My Services
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: '#000', fontSize: 12}}>+Add Services</Text>
              <View
                style={{width: 90, borderWidth: 0.5, borderColor: '#000'}}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{}} showsVerticalScrollIndicator={false}>
            {loading2 ? (
              <ActivityIndicator style={{marginTop: 80}} size={40} />
            ) : (
              serviceData.map(item => (
                <TouchableOpacity
                  key={item._id}
                  activeOpacity={0.7}
                  style={{borderBottomWidth: 1}}>
                  <View style={styles.subView}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <View style={styles.bgCircle} />
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#000',
                          textTransform: 'capitalize',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <AntDesign name="right" size={16} color="#000" />
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1',
  },
  body: {
    marginLeft: 20,
    marginTop: 40,
    // marginBottom:height/2.5,
  },
  box: {
    minHeight: clickBoxHeight,
    width: width / 3,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 20,
    backgroundColor: '#f2f2f2',
  },
  body1: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  boxSubView: {
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
    // flex:1
  },
  img: {
    height: clickBoxHeight / 2 + 20,
    width: width / 3,
    // resizeMode: "contain",
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // flex:1
  },
  body2: {
    marginTop: 20,
    marginBottom: 80,
  },
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginVertical: 15,
    justifyContent: 'space-between',
  },
  bgCircle: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#aaa',
    marginRight: 10,
  },
  time: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  msg: {
    color: '#aaa',
    fontSize: 10,
    top: 2,
    marginRight: 50,
  },
  name: {
    color: '#fff',
    fontWeight: '500',
  },
  timeTxt: {
    color: '#fff',
    fontSize: 12,
  },
});
