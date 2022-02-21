import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  PermissionsAndroid,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddProduct_Header from './utils/addProductHeader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {height, width} from './ChatScreen';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import {API} from '../../../../config';
import Header from './utils/header';

export default function AddProduct({navigation}) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [cost, setCost] = useState('');
  const [content, setContent] = useState('');
  const [isVisible1, setIsVisible1] = useState(false);

  const [isVisible2, setIsVisible2] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory_ID, setSelectedCategory_ID] = useState('');
  const [selectedCategory_name, setSelectedCategory_name] = useState('');
  const [loading1, setLoading1] = useState(false);

  const [isVisible3, setIsVisible3] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [selectedService_ID, setSelectedService_ID] = useState('');
  const [selectedService_name, setSelectedService_name] = useState('');
  const [loading2, setLoading2] = useState(false);

  const [imgURL, setImgURL] = useState('');
  const [process, setProcess] = useState('');
  const [indicator1, setIndicator1] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const [error1, setError1] = useState(false);

  useEffect(() => {
    getCategories();
    getServices();
  }, []);

  // console.log("Path: ", file.uri);
  // // console.log("Base64: ", file.base64);
  // console.log("Name: ", file.fileName);
  // console.log("Type: ", file.type);

  // const requestCameraPermission=async()=>{
  //     if(Platform.OS === 'android'){
  //         try{
  //             const granted = await PermissionsAndroid.request(
  //                 PermissionsAndroid.PERMISSIONS.CAMERA,{
  //                     title: "Camera Permission",
  //                     message: "App needs camera permission"
  //                 }
  //             );
  //             return granted === PermissionsAndroid.RESULTS.GRANTED;
  //         }
  //         catch(err){
  //             console.log(err);
  //             return false;
  //         }
  //     }
  //     else return true;
  // };

  // const requestLibraryPermission=async()=>{
  //     if(Platform.OS === 'android'){
  //         try{
  //             const granted = await PermissionsAndroid.request(
  //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
  //                     title: "Files Permission",
  //                     message: "App needs storage permission"
  //                 }
  //             );
  //             return granted === PermissionsAndroid.RESULTS.GRANTED;
  //         }
  //         catch(err){
  //             console.log(err);
  //             alert("Storage permission error", err)
  //         }
  //         return false;
  //     }
  //     else return true;
  // };

  const openCamera = async () => {
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
    launchCamera(options, resp => {
      if (resp.didCancel) {
        console.log('Canceled');
        setIsVisible1(false);
      } else if (resp.error) {
        console.log('Error: ', resp.error);
        setIsVisible1(false);
      } else {
        const imgData = resp.assets[0];
        console.log(imgData.fileName);
        try {
          const task = storage()
            .ref('VENDOR/product/img' + imgData.fileName)
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
                setImgURL(url);
              });
            },
          );
          task.then(() => {
            console.log('PDF uploaded to the bucket!');
          });
        } catch (e) {
          console.log(e);
        }
        setIsVisible1(false);
      }
    });
    // }
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
        setIsVisible1(false);
      } else if (resp.error) {
        console.log('Error: ', resp.error);
        setIsVisible1(false);
      } else {
        const imgData = resp.assets[0];
        try {
          const task = storage()
            .ref('VENDOR/product/img' + imgData.fileName)
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
                setImgURL(url);
              });
            },
          );
          task.then(() => {
            console.log('PDF uploaded to the bucket!');
          });
        } catch (e) {
          console.log(e);
        }
        setIsVisible1(false);
      }
    });
    // }
  };

  const upload = () => (
    <View style={styles.absAlert}>
      <View style={styles.alertBox}>
        <Text style={styles.select}>Select Photo...</Text>
        <View style={styles.line} />
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity style={styles.content} onPress={openCamera}>
            <Text style={{color: '#fff'}}>launch camera</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 8}} />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.content} onPress={openLibrary}>
            <Text style={{color: '#fff'}}>select from storage</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lastView}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => setIsVisible1(false)}>
            <Text style={{color: '#fff'}}>cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const getCategories = () => {
    axios
      .get(`${API}/category`)
      .then(resp => {
        setCategoriesData(resp.data);
        setLoading1(false);
      })
      .catch(err => {
        console.log('server error: ', err);
      });
  };

  const getServices = () => {
    axios
      .get(`${API}/service`)
      .then(resp => {
        setServiceData(resp.data);
        setLoading2(false);
      })
      .catch(err => {
        console.log('server error: ', err);
      });
  };

  const showModalToSelect = () => (
    <View style={styles.absCat}>
      <View style={styles.catContainer}>
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
            marginVertical: 10,
            fontWeight: '700',
          }}>{`Select ${isVisible2 ? 'Category' : 'Service'}`}</Text>
        <View
          style={{
            width: '80%',
            backgroundColor: 'gray',
            borderWidth: 1,
            alignSelf: 'center',
          }}
        />
        <ScrollView
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}>
          {isVisible2 ? (
            loading1 ? (
              <ActivityIndicator size={30} style={{marginTop: 40}} />
            ) : (
              categoriesData.map((item, index) => {
                let SL_NO = index + 1;
                return (
                  <TouchableOpacity
                    style={styles.catContents}
                    key={item._id}
                    onPress={() => {
                      setSelectedCategory_ID(item._id);
                      setSelectedCategory_name(item.name);
                      setIsVisible2(false);
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        textTransform: 'capitalize',
                        marginVertical: 10,
                      }}>
                      {SL_NO}. {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )
          ) : loading2 ? (
            <ActivityIndicator size={30} style={{marginTop: 40}} />
          ) : (
            serviceData.map((item, index) => {
              let SL_NO = index + 1;
              return (
                <TouchableOpacity
                  style={styles.catContents}
                  key={item._id}
                  onPress={() => {
                    setSelectedService_ID(item._id);
                    setSelectedService_name(item.name);
                    setIsVisible3(false);
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      textTransform: 'capitalize',
                      marginVertical: 10,
                    }}>
                    {SL_NO}. {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
        <Button
          title="Cancel"
          color="#ff1493"
          onPress={() => {
            setIsVisible2(false);
            setIsVisible3(false);
          }}
        />
      </View>
    </View>
  );

  let postData = {
    title: name,
    price: Number(cost),
    description: desc,
    content: content,
    images: imgURL,
    category: selectedCategory_ID,
    service: selectedService_ID,
  };

  const createProduct = () => {
      setIndicator1(true);
    axios
      .post(`${API}/products`, postData)
      .then(resp => {
        // console.log(resp.data);
        setError1(false);
        setIndicator1(false);
        setProductAdded(true);
      })
      .catch(err => {
        console.log('server error: ', err);
        setIndicator1(false);
        setProductAdded(false);
        setError1(true);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          isBack={true}
          back={() => navigation.goBack()}
          title="Add Product"
          notify={() => navigation.navigate('AlertScreen')}
          profile={() => navigation.navigate('ProfileScreen')}
          bellColor="#000"
        />
        <ScrollView
          contentContainerStyle={{marginTop: 60}}
          style={{marginBottom: 80}}>
          <TouchableOpacity
            style={styles.input1}
            activeOpacity={0.6}
            onPress={() => setIsVisible2(true)}>
            <View style={styles.cat}>
              <Text style={{color: 'gray', textTransform: 'capitalize'}}>
                {!selectedCategory_name ? 'Category' : selectedCategory_name}
              </Text>
              <AntDesign name="down" size={18} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.input1]}
            activeOpacity={0.6}
            onPress={() => setIsVisible3(true)}>
            <View style={styles.cat}>
              <Text style={{color: 'gray', textTransform: 'capitalize'}}>
                {!selectedService_name ? 'service' : selectedService_name}
              </Text>
              <AntDesign name="down" size={18} color="#000" />
            </View>
          </TouchableOpacity>
          <View style={[styles.textInput1]}>
            <TextInput
              style={styles.Name}
              placeholder="Name of Product"
              placeholderTextColor="gray"
              value={name}
              onChangeText={val => setName(val)}
            />
          </View>
          <View style={styles.Content}>
            <TextInput
              style={[
                styles.Name,
                {
                  height: '100%',
                  textAlignVertical: 'top',
                },
              ]}
              placeholder="Content (upto 22 letters)"
              placeholderTextColor="gray"
              // multiline={true}
              value={content}
              onChangeText={val => setContent(val)}
              maxLength={22}
            />
          </View>
          <View style={styles.desc}>
            <TextInput
              style={[
                styles.Name,
                {
                  height: '100%',
                  textAlignVertical: 'top',
                },
              ]}
              placeholder="Description"
              placeholderTextColor="gray"
              multiline={true}
              value={desc}
              onChangeText={val => setDesc(val)}
            />
          </View>
          <TouchableOpacity
            style={[styles.textInput1, styles.image]}
            activeOpacity={0.8}
            onPress={() => setIsVisible1(true)}>
            <Text style={{color: 'gray'}}>Images</Text>
            {
                !process ? <Feather name="upload" color="#000" size={18} /> : 
                process == "100%" ? <MaterialIcons name='done' color="green" size={20} /> :
                <Text style={{color:"gray",fontSize:12}}>{process}</Text>
            }
          </TouchableOpacity>
          <View style={styles.textInput1}>
            <TextInput
              style={styles.Name}
              placeholder="Costs"
              placeholderTextColor="gray"
              value={cost}
              onChangeText={val => setCost(val)}
              keyboardType="numeric"
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 40}}>
              {
                  productAdded ? 
                  <Text style={{color:"green",fontSize:12,marginBottom:10}}>Product is added</Text> :
                  error1 ? 
                    <>
                        <Text style={{color:"red",fontSize:12}}>Cannot add product at this moment !</Text>
                        <Text style={{color:"red",fontSize:11,marginBottom:10}}>please, try again later...</Text>
                    </>
                  : null
              }
            <TouchableOpacity style={styles.btn} onPress={createProduct}>
              {
                  !indicator1 ? 
                  <Text style={{color: '#fff', fontWeight: '600'}}>
                Add Product
              </Text>:
              <ActivityIndicator color="#fff" />
              }
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {isVisible1 && upload()}
      {isVisible2 && showModalToSelect()}
      {isVisible3 && showModalToSelect()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1',
  },
  textInput1: {
    height: 45,
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  input1: {
    height: 45,
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Name: {
    paddingLeft: 20,
    borderRadius: 10,
    color: '#000',
  },
  desc: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
  },
  Content: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    height: 70,
  },
  image: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#ff1493',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 200,
  },
  absAlert: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
  },
  alertBox: {
    height: '40%',
    width: '90%',
    backgroundColor: '#fff',
    top: 100,
    borderRadius: 10,
  },
  cancel: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  content: {
    backgroundColor: '#42b349',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  select: {
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 10,
    color: '#000',
    fontSize: 16,
  },
  lastView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 15,
  },
  line: {
    width: '80%',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
  },
  cat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  absCat: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
  },
  catContainer: {
    backgroundColor: '#fff',
    height: '80%',
    width: '80%',
    marginTop: 20,
    borderRadius: 5,
  },
  catContents: {
    marginLeft: 20,
    borderBottomWidth: 0.5,
  },
});
