import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useIsFocused} from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import Header from './header';
import { height } from '../ChatScreen';
import { API, API_VENDOR } from '../../../../../config';

let clickBoxHeight = height / 4;


export default function MyProduct() {
    
  const navigation = useNavigation();
  const route = useRoute();
  const preData = route.params;
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  //   const [vendorId, setVendorId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getProducts();
    }
  }, [isFocused]);

  const getProducts = () => {
    preData ? 
    (
      axios
        .get(`${API}/products/service/${preData._id}`)
        .then(resp => {
          console.log(resp.data);
          setData(resp.data);
          setLoading(false);
        })
        .catch(err => {
          console.log('server error: ', err);
        })
    )
    :
    (
      axios
      .get(`${API_VENDOR}/vendordetail`)
      .then(res => {
        // setVendorId(res.data._id);
        axios
          .get(`${API}/products/vendor/${res.data._id}`)
          .then(resp => {
            console.log(resp.data);
            setData(resp.data);
            setLoading(false);
          })
          .catch(err => {
            console.log('server error: ', err);
          });
      })
      .catch(err => {
        console.log(err);
      })
    )
  };

  return (
    <View style={styles.container}>
      <Header
        isBack={preData ? true : false}
        back={()=>navigation.goBack()}
        title="My Products"
        notify={() => navigation.navigate('AlertScreen')}
        profile={() => navigation.navigate('ProfileScreen')}
        bellColor="#000"
      />
      <View style={styles.body}>
        <View style={styles.bodyTitle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.subTitle}>{preData ? preData.name : "All Products"}</Text>
            <AntDesign name="down" size={16} color="#000" />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('addProductScreen')}>
            <Text style={{color: '#000', fontSize: 12}}>+Add Product</Text>
            <View style={{width: 90, borderWidth: 0.5, borderColor: '#000'}} />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          {loading ? (
            <ActivityIndicator size={40} style={{marginTop: 80}} />
          ) : data.length === 0 ? (
            <Text style={{color: '#000', marginTop: 40}}>No Product found</Text>
          ) : (
            <FlatList
              style={{marginBottom: height / 6.1}}
              data={data}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item._id}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              renderItem={({item}) => (
                <TouchableOpacity key={item._id} style={styles.box}
                    activeOpacity={0.6}
                    onPress={()=>navigation.navigate("ProductDetailsVendor",item)}
                >
                  <View style={styles.boxSubView}>
                    <Image
                      style={styles.img}
                      source={{uri: item.images}}
                      resizeMode="stretch"
                    />
                  </View>
                  <View style={{marginLeft: 10, marginTop: 5}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#000',
                        textTransform: 'capitalize',
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{fontSize: 11, color: '#000'}}>
                      {item.content}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
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
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1',
  },
  body: {
    marginTop: 20,
    flex: 1,
    marginHorizontal: 20,
  },
  bodyTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontWeight: '500',
    color: '#000',
    marginRight: 10,
  },
  box: {
    minHeight: clickBoxHeight,
    width: '48%',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    // margin: 5
  },
  boxSubView: {
    backgroundColor: '#f7984f',
    borderRadius: 10,
    height: clickBoxHeight / 2 + 25,
    // flex: 1,
    borderRadius: 10,
    overflow:"hidden"
  },
  img: {
    // height:clickBoxHeight/2+20,
    width: '100%',
    height: '100%',
  },
});
