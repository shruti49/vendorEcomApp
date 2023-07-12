import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate('sign-up'), 2000);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      {/* <StatusBar className="bg-primary" barStyle={'light-content'} /> */}
      <Text className="text-white text-3xl font-bold">Ecom Vendor App</Text>
    </View>
  );
};

export default Splash;
