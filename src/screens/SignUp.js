import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {useNavigation} from '@react-navigation/native';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';

import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loader from '../components/Loader';

const SignUp = () => {
  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState('');

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //     setKeyboardStatus('Keyboard Shown');
  //   });
  //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardStatus('Keyboard Hidden');
  //   });

  //   return () => {
  // showSubscription.remove();
  // hideSubscription.remove();
  //   };
  // }, []);

  const inputValidation = () => {
    if (
      !displayName ||
      !email ||
      !phoneNo ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      phoneNo.length < 10
    ) {
      return false;
    }

    return true;
  };

  const registerVendor = () => {
    setIsVisible(true);
    const id = uuid.v4();
    firestore()
      .collection('vendors')
      .doc(id)
      .set({
        name: displayName,
        email: email,
        phoneNo: phoneNo,
        userId: id,
        password: password,
      })
      .then(res => {
        setIsVisible(false);
        console.log(res);
        navigation.navigate('login');
      })
      .catch(err => {
        setIsVisible(false);
        console.log(err);
      });
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('../../images/banner.jpg')}
        className="w-full h-56"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('login')}
        className="w-10 h-10 rounded-lg bg-white absolute top-5 left-5 shadow-white shadow-3xl justify-center items-center">
        <Icon name="arrow-back" width={28} height={28} color={'black'} />
      </TouchableOpacity>
      <View className="w-[94%] h-full items-center bg-white absolute top-48 shadow-2xl rounded-t-[40px]">
        <Text className="text-2xl font-medium mt-5 text-[#FF6F00] ">Sign Up</Text>
        <KeyboardAvoidingView className="w-11/12" behavior="padding">
          <ScrollView className="pb-56">
            <CustomInputText
              placeholder="Enter Name"
              value={displayName}
              handleChange={val => setDisplayName(val)}
              //   handleFocus={() => {
              //     Keyboard.addListener('keyboardDidShow', () => {
              //       setKeyboardStatus('Keyboard Shown');
              //     });
              //     Keyboard.addListener('keyboardDidHide', () => {
              //       setKeyboardStatus('Keyboard Hidden');
              //     });
              //   }}
            />
            <CustomInputText
              placeholder="Enter Email"
              value={email}
              handleChange={val => setEmail(val)}
            />
            <CustomInputText
              placeholder="Enter Phone No"
              type="numeric"
              value={phoneNo}
              handleChange={val => setPhoneNo(val)}
            />
            <CustomInputText
              placeholder="Enter Password"
              value={password}
              textType="password"
              handleChange={val => setPassword(val)}
            />
            <CustomInputText
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              textType="password"
              handleChange={val => setConfirmPassword(val)}
            />
            <CustomButton
              width="w-full"
              title="Sign Up"
              handlePress={() => {
                if (inputValidation()) registerVendor();
                else Alert.alert('Please fill the data correctly');
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Loader isVisible={isVisible} />
    </View>
  );
};

export default SignUp;
