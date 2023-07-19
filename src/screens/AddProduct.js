import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';

import {Icon} from 'react-native-eva-icons';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loader from '../components/Loader';
import storage from '@react-native-firebase/storage';

import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddProduct = () => {
  const navigation = useNavigation();

  const route = useRoute();

  let productId = '';
  let type = '';
  if (route.params !== undefined) {
    if (route.params.productId !== undefined) {
      productId = route.params.productId;
    }
    if (route.params.type !== undefined) {
      type = route.params.type;
    }
  }

  const defaultFormFields = {
    name: '',
    description: '',
    price: '',
  };

  const [productData, setProductData] = useState(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {name, description, price} = formFields;

  const [isVisible, setIsVisible] = useState(false);

  const [imageUrl, setImageUrl] = useState();
  const [inStock, setInStock] = useState(true);
  const [imageData, setImageData] = useState({
    assets: [
      {
        uri: '',
      },
    ],
  });

  //old image uri
  const imageUri = imageData.assets[0].uri;

  const getProductById = productId => {
    firestore()
      .collection('products')
      .where('id', '==', productId)
      .get()
      .then(snapshot => {
        setProductData(snapshot._docs[0]._data);
      });
  };

  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
  }, [productId]);

  const clearInputFields = () => {
    setFormFields({
      name: '',
      description: '',
      price: '',
    });
    setInStock(false);
    setImageData({assets: [{uri: ''}]});
  };

  useEffect(() => {
    console.log(type);
    if (productData !== null && type === 'edit') {
      setFormFields({
        name: productData.name,
        description: productData.description,
        price: productData.price,
      });
      setInStock(productData.inStock);
      setImageData({assets: [{uri: productData.imageUrl}]});
    } else {
      clearInputFields();
    }
  }, [productData, type]);

  const handleFormFields = (inputValue, inputName) => {
    setFormFields({...formFields, [inputName]: inputValue});
  };

  const toggleSwitch = () => setInStock(previousState => !previousState);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const response = await launchImageLibrary({mediaType: 'photo'});
    if (!response.didCancel) {
      setImageData(response);
      generateImageUrl(response.assets[0]);
    }
  };

  const generateImageUrl = async data => {
    // create bucket storage reference to not yet existing image
    const reference = storage().ref(data.fileName);
    const pathToFile = data.uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage().ref(data.fileName).getDownloadURL();
    setImageUrl(url);
  };

  const saveProduct = async () => {
    setIsVisible(true);
    const userId = await AsyncStorage.getItem('userId');
    const userName = await AsyncStorage.getItem('name');
    const id = uuid.v4();
    firestore()
      .collection('products')
      .doc(type === 'edit' ? productId : id)
      .set({
        id: type === 'edit' ? productId : id,
        userId: userId,
        userName: userName,
        name: name,
        description: description,
        price: price,
        inStock: inStock,
        imageUrl: type === 'edit' ? imageUri : imageUrl,
      })
      .then(res => {
        setIsVisible(false);
       // clearInputFields();
        navigation.goBack();
      })
      .catch(err => {
        setIsVisible(false);
        console.log(err);
      });
  };

  return (
    <View className="flex-1 items-center">
      <KeyboardAvoidingView
        className="w-11/12 mb-4"
        behavior="height"
        keyboardVerticalOffset={100}>
        <ScrollView>
          <TouchableOpacity
            className="h-48 border-2 mt-7 rounded-lg justify-center items-center"
            onPress={requestCameraPermission}>
            {imageUri === '' ? (
              <Icon name="camera" width={56} height={56} />
            ) : (
              <Image source={{uri: imageUri}} className="w-full h-full" />
            )}
          </TouchableOpacity>

          <CustomInputText
            placeholder="Product Name"
            value={name}
            handleChange={val => handleFormFields(val, 'name')}
          />
          <CustomInputText
            placeholder="Product Description"
            value={description}
            handleChange={val => handleFormFields(val, 'description')}
          />
          <CustomInputText
            placeholder="Price"
            type="numeric"
            value={price}
            handleChange={val => handleFormFields(val, 'price')}
          />
          <View className="flex-row mt-8 justify-between">
            <Text className="font-semibold text-base text-black">In Stock</Text>
            <Switch onValueChange={toggleSwitch} value={inStock} />
          </View>
          <CustomButton
            width="w-full"
            title="Save Product"
            handlePress={saveProduct}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Loader isVisible={isVisible} />
    </View>
  );
};

export default AddProduct;
