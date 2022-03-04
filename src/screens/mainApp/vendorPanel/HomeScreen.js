import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions, useIsFocused} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";



import {API, API_USER, API_VENDOR} from '../../../../config';
import Header from './utils/header';

const {height, width} = Dimensions.get('window');
let clickBoxHeight = height / 4.5;

export default function HomeScreen({navigation}) {

  const [serviceData, setServiceData] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading1, setloading1] = useState(true);
  const [loading2, setloading2] = useState(true);
  const [loading3, setloading3] = useState(false);
  const [loading4, setloading4] = useState(true);
  const [loading5, setloading5] = useState(false);
  const [serviceAdded, setServiceAdded] = useState(false);
  const [isVisible1, setIsvisible1] = useState(false);
  const [process, setProcess] = useState('');
  // const [location, setLocation] = useState({});
  const [addNewService, setAddNewService] = useState('');
  const [url, setUrl] = useState('');
  const [vendorData, setVendorData] = useState({});

  let tempDate = new Date();
  let year = tempDate.getFullYear();
  let month = ('0' + (tempDate.getMonth()+1)).slice(-2);     // to get 0 before a single month (i.e 1 -> 01)
  let day = ('0' + tempDate.getDate()).slice(-2);             // to get 0 before a single day   (i.e 3 -> 03)
  let fDate = `${day}-${month}-${year}`;


  const isFocused = useIsFocused();

  useEffect(() => {
    getLatestProductList();
    // getLocation();
    if (isFocused) {
      getServices();
      getVendor();
    }
  }, [isFocused]);

//   const getLocation=async()=>{
//     try{
//         const JSON_OBJ = await AsyncStorage.getItem('location');
//         const Parsed = JSON.parse(JSON_OBJ);
//         Parsed !== null ? setLocation(Parsed) : setLocation({});
//     }
//     catch(err){
//         console.log("err",err);
//     }
// };

  const getVendor=async()=>{
    const json_Val = await AsyncStorage.getItem("jwt");
    const parsed = JSON.parse(json_Val);
    let axiosConfig = {
        headers:{
            Authorization: parsed.token
        }
    };
    axios.get(`${API_VENDOR}/vendordetail`,axiosConfig)
    .then(async res=>{
      setVendorData(res.data);
      setloading4(false);
    })
    .catch(err=>{
      setloading4(false);
      console.log(err);
    })
  };

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

  if(serviceAdded){
    setTimeout(()=>{
      setServiceAdded(false);
    },3000)
  };

  const createService=async()=>{
    const json_Val = await AsyncStorage.getItem("jwt");
    const parsed = JSON.parse(json_Val);
    let axiosConfig = {
        headers:{
            Authorization: parsed.token
        }
    };
    if(addNewService !== ""){
      setloading3(true);
      if(serviceData.length > 0){
        setloading3(false);
        Alert.alert("You cann't add more than One Service");
      }
      else{
        axios.patch(`${API}/service`,{name: addNewService,imgUrl: url},axiosConfig)
        .then(resp=>{
          setloading3(false);
          setServiceAdded(true);
        })
        .catch(err=>{
          console.log("err add Service: ",err);
          setloading3(false);
        })
      }
    }
    else{
      null;
    }
  };

  const openLibrary = async () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    // let isCameraPermitted = await requestCameraPermission();
    // let isStoragePermitted = await requestLibraryPermission();

    // if(isCameraPermitted && isStoragePermitted){
    launchImageLibrary(options, resp => {
      if (resp.didCancel) {
        console.log('Canceled');
      } else if (resp.error) {
        console.log('Error: ', resp.error);
      } else {
        const imgData = resp.assets[0];
        try {
          const task = storage()
            .ref('VENDOR/service/img' + imgData.fileName)
            .putString(imgData.base64, 'base64');
          task.on(
            'state_changed',
            function (snapshot) {
              const rate = Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              );
              setProcess(`${rate}%`);
              console.log(rate);
            },
            function (err) {
              console.log(err);
            },
            function () {
              task.snapshot.ref.getDownloadURL().then(function (url) {
                setUrl(url);
              });
            },
          );
          task.then(() => {
            console.log('PDF uploaded to the bucket!');
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
    // }
  };

  const addService=()=>(
    <View style={styles.absService}>
      <View style={styles.addServiceModal}>
        <View style={{alignItems:"center"}}>
          <Text style={{color:"gray",fontSize:12,marginVertical:10}}>** Only 1 service can be added **</Text>
          <TextInput 
            style={styles.serviceInput}
            placeholder="add your service here..."
            placeholderTextColor="gray"
            value={addNewService}
            onChangeText={(val)=>setAddNewService(val)}
          />
          <TouchableOpacity
              style={[styles.textInput1, styles.image]}
              activeOpacity={0.8}
              onPress={openLibrary}>
              <Text style={{color: 'gray'}}>Images</Text>
              {
                  !process ? <Feather name="upload" color="#000" size={18} /> : 
                  process == "100%" ? <MaterialIcons name='done' color="green" size={20} /> :
                  <Text style={{color:"gray",fontSize:12}}>{process}</Text>
              }
          </TouchableOpacity>
        </View>
        {
          loading3 ? 
          <View style={{marginVertical:25}}>
            <ActivityIndicator size={30} />
          </View>
          :
          <View style={styles.btnView}>
            <TouchableOpacity style={styles.serviceBtn}
              activeOpacity={0.6}
              onPress={createService}
              disabled={loading3 ? true : false}
            >
              <Text style={{color:"#fff",fontWeight:"600"}}>+Add Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn}
              activeOpacity={0.6}
              onPress={()=>{
                setAddNewService('');
                setIsvisible1(false);
              }}
            >
            <Text style={{color:"#fff",fontWeight:"600"}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        }
        {
          serviceAdded ? <Text style={{color:"green",textAlign:"center",marginBottom:10,fontSize:12}}>service added</Text> : null
        }
      </View>
    </View>
  );

  const switchUser=async()=>{
    setloading5(true);
    const json_Val = await AsyncStorage.getItem("jwt");
    const parsed = JSON.parse(json_Val);
    let axiosConfig = {
        headers:{
            Authorization: parsed.token
        }
    };
    axios.get(`${API_VENDOR}/logout`,axiosConfig)
    .then(resp=>{
        console.log(resp.data);
        axios.post(`${API_USER}/switch/register`,{phoneNo:vendorData.phoneNo},axiosConfig)
        .then( async resp => {
            try{
              const jsonValue = JSON.stringify(resp.data);
              await AsyncStorage.setItem("jwt",jsonValue);
              setloading5(false);
              await AsyncStorage.setItem("userRole","0");
              navigation.dispatch(
                StackActions.replace("UserPanel")
              )
            }
            catch(e){
              console.log(e);
              setloading5(false);
            }
        })
        .catch(err=>{
            console.log("error switching user: ",err);
            setloading5(false);
        })
    })
    .catch(err=>{
        console.log("error logging out: ",err);
        setloading5(false);
    })
  };

  return (
    <View style={styles.container}>
      <Header
        title={vendorData.name ? `Hi, ${vendorData.name}` : `Hi, Vendor`}
        notify={() => navigation.navigate('AlertScreen')}
        profile={() => navigation.navigate('ProfileScreen')}
        bellColor="#000"
        date={fDate}
        isLoading={loading4}
      />
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginRight:20}}>
          <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
            This Month
          </Text>
          <TouchableOpacity 
            style={styles.user}
            onPress={switchUser}
          >
              <View style={{flexDirection:"row",alignItems:"flex-end"}}>
                <MaterialCommunityIcons name='account-switch-outline' color="#fff" size={18} />
                {
                  loading5 ? <ActivityIndicator color="#fff" size={20} style={{marginHorizontal:5,marginVertical:2}} />
                  :
                  <Text style={{fontWeight:"500",color:"#fff",marginLeft:5}}>User</Text>
                }
              </View>
          </TouchableOpacity>
        </View>
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
                    <Image
                      style={styles.img}
                      source={{uri: item.images[0]}}
                      resizeMode="stretch"
                    />
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
              All Services
            </Text>
            <TouchableOpacity onPress={() => setIsvisible1(true)} style={{alignItems:"center"}}>
              <Text style={{color: '#000', fontSize: 12}}>+Add Service</Text>
              <View
                style={{width: "105%", borderWidth: 0.5, borderColor: '#000'}}
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
                  style={{borderBottomWidth: 1}}
                  onPress={()=>navigation.navigate("VendorProducts",item)}
                >
                  <View style={styles.subView}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      {
                        item.imgUrl ?
                        <Image style={styles.bgCircle} source={{uri:item.imgUrl}} />
                        :
                        <View style={styles.bgCircle} />
                      }
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
      {
        isVisible1 && addService()
      }
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
    backgroundColor: '#d95448',
    marginRight: 10,
    borderWidth: 0.2,
    borderColor:"#aaa"
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
  absService: {
    position:"absolute",
    right:0,
    left:0,
    bottom:0,
    top:0,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems:"center",
    justifyContent:"center"
  },
  addServiceModal: {
    borderRadius:5,
    backgroundColor: "#fff",
    width: "80%",
  },
  serviceInput: {
    borderRadius: 5,
    color: "#000",
    paddingLeft: 10,
    backgroundColor:"#ffe4e1",
    // marginTop:20,
    width:"80%"
  },
  serviceBtn: {
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal:10,
    borderRadius:5,
  },
  cancelBtn: {
    backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    paddingVertical: 8,
    paddingHorizontal:10,
    borderRadius:5,
  },
  btnView: {
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:30,
    marginBottom:10
  },
  textInput1: {
    marginTop: 15,
    height: 45,
    width: "80%",
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  user: {
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#d95448",
    marginVertical:10,
    paddingVertical:2,
    paddingHorizontal:8,
    borderRadius:4
}
});
