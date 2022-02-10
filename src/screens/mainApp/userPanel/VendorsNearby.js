import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {API_VENDOR} from '../../../../config';

export default function VendorsNearby({vendorProfile}) {
  const [vendors, setVendors] = useState([]);
  const [indicator, setIndicator] = useState(true);

  useEffect(() => {
    getVendors();
  }, [vendors]);

  const getVendors = () => {
    axios
      .get(`${API_VENDOR}/allvendors`)
      .then(resp => {
        setVendors(resp.data);
        setIndicator(false);
      })
      .catch(err => {
        console.log('Server error: ', err);
      });
  };
  return (
    <>
      <View style={{marginTop: 10, marginLeft: 20}}>
        <Text style={styles.heading}>Top Vendors Near you</Text>
        {indicator ? (
          <ActivityIndicator style={{left: -10, marginTop: 20}} size={30} />
        ) : (
          <FlatList
            horizontal={true}
            data={vendors}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View key={index} style={{alignItems: 'center', marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => vendorProfile(item)}
                  style={styles.circle}
                  activeOpacity={0.6}>
                  {item.profileImg ? (
                    <Image
                      style={styles.circle}
                      source={{uri: item.profileImg}}
                    />
                  ) : (
                    <Image
                      style={styles.circle}
                      source={require('../../../assets/profile.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    marginVertical: 30,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
  name: {
    color: '#000',
    fontSize: 10,
    marginTop: 5,
    textTransform: 'capitalize',
  },
  heading: {
    fontWeight: 'bold',
    color: '#000',
    // marginLeft:20,
    fontSize: 16,
    marginBottom: 10,
  },
});
