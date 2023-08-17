import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => checkAuth(), 2000);
  }, []);

  const checkAuth = async () => {
    const vendorId = await AsyncStorage.getItem('vendorId');
    if (vendorId !== null) navigation.navigate('home');
    else navigation.navigate('login');
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#FF6F00] ">
      <StatusBar className="bg-[#FF6F00] " barStyle={'light-content'} />
      <Text className="text-white text-3xl font-bold">Ecom Vendor App</Text>
    </View>
  );
};

export default Splash;
