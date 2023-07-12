import React, {useState} from 'react';
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

import {firebase} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loader from '../components/Loader';
import storage from '@react-native-firebase/storage';

import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';

const AddProduct = () => {
  const defaultFormFields = {
    name: '',
    description: '',
    price: '',
    discountPrice: '',
  };

  const [isVisible, setIsVisible] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [inStock, setInStock] = useState(false);
  const [imageData, setImageData] = useState({
    assets: [
      {
        uri: '',
      },
    ],
  });

  const {name, description, price, discountPrice} = formFields;

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
      setImageData(res);
    }
  };

  const saveProduct = async () => {
    setIsVisible(true);
    const userId = await AsyncStorage.getItem('userId');
    const userName = await AsyncStorage.getItem('name');
    const id = uuid.v4();

    // create bucket storage reference to not yet existing image
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);

    const firestoreForDefaultApp = firebase.firestore();
    firestoreForDefaultApp
      .collection('products')
      .add({
        productId: id,
        userId: userId,
        userName: userName,
        name: name,
        description: description,
        price: price,
        discountPrice: discountPrice,
        inStock: inStock,
        productImageUrl: url,
      })
      .then(res => {
        setIsVisible(false);
        console.log(res);
      })
      .catch(err => {
        setIsVisible(false);
        console.log(err);
      });
  };

  return (
    <View className="flex-1 items-center">
      <KeyboardAvoidingView className="w-11/12" behavior="padding">
        <ScrollView>
          <TouchableOpacity
            className="h-48 border-2 mt-7 rounded-lg justify-center items-center"
            onPress={requestCameraPermission}>
            {imageData.uri === '' ? (
              <Icon name="camera" width={56} height={56} />
            ) : (
              <Image
                source={{uri: imageData.assets[0].uri}}
                className="w-full h-full"
              />
            )}
          </TouchableOpacity>

          <CustomInputText
            placeholder="Product Name"
            value={name}
            handleChange={val => handleFormFields(val, name)}
          />
          <CustomInputText
            placeholder="Product Description"
            value={description}
            handleChange={val => handleFormFields(val, description)}
          />
          <CustomInputText
            placeholder="Price"
            type="numeric"
            value={price}
            handleChange={val => handleFormFields(val, price)}
          />
          <CustomInputText
            placeholder="Discount Price"
            type="numeric"
            value={discountPrice}
            handleChange={val => handleFormFields(val, discountPrice)}
          />
          <View className="flex-row mt-8 justify-between">
            <Text className="font-semibold text-base">In Stock</Text>
            <Switch onValueChange={toggleSwitch} value={inStock} />
          </View>
          <CustomButton
            width="w-full"
            title="Save Product"
            handlePress={() => {}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Loader isVisible={isVisible} />
    </View>
  );
};

export default AddProduct;
