import React, {useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  const defaultFields = {
    email: '',
    password: '',
  };

  const [formFields, setFormFields] = useState(defaultFields);

  const {email, password} = formFields;

  const handleInput = (inputValue, inputName) => {
    setFormFields({...formFields, [inputName]: inputValue});
  };

  const inputValidation = () => {
    if (!email || !password) {
      return false;
    }

    return true;
  };

  const loginUser = () => {
    firestore()
      .collection('vendors')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        if (snapshot._docs !== []) {
          console.log(snapshot._docs[0]._data, 'login');
          const userObj = snapshot._docs[0]._data;
          if (userObj.password === password) {
            goToNextScreen(userObj);
          }
        }
      });
  };

  const goToNextScreen = async data => {
    await AsyncStorage.setItem('name', data.name);
    await AsyncStorage.setItem('vendorId', data.vendorId);
    navigation.navigate('home');
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('../../images/banner.jpg')}
        className="w-full h-56"
      />
      <View
        className="w-[95%] h-full items-center bg-white absolute top-48 rounded-t-[40px]"
        style={{elevation: 2}}>
        <Text className="text-2xl font-medium mt-5 text-[#FF6F00] ">Login</Text>
        <CustomInputText
          placeholder="Enter Email"
          width="w-11/12"
          value={email}
          handleChange={val => handleInput(val, 'email')}
        />
        <CustomInputText
          placeholder="Enter Password"
          width="w-11/12"
          value={password}
          textType="password"
          handleChange={val => handleInput(val, 'password')}
        />
        <CustomButton
          title="Login"
          handlePress={() => {
            if (inputValidation()) loginUser();
            else Alert.alert('Please fill the data correctly');
          }}
          width="w-11/12"
        />
        <View className="items-center mt-10 flex-row">
          <Text className="text-black">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('sign-up')}>
            <Text className="text-[#FF6F00]  font-bold focus:text-xl">
              {'  '}Create One
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
