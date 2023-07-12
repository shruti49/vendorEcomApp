import {View, Text, Image} from 'react-native';
import React from 'react';
import CustomInputText from '../components/CustomInputText';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Login = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('../../images/banner.jpg')}
        className="w-full h-56"
      />
      <View className="w-[95%] h-full items-center bg-white absolute top-48 shadow-2xl rounded-t-[40px]">
        <Text className="text-2xl font-medium mt-5 text-primary">Login</Text>
        <CustomInputText placeholder="Enter Email" width="w-11/12"/>
        <CustomInputText placeholder="Enter Password" width="w-11/12" />
        <CustomButton title="Login" handlePress={() => console.log('hey')} width="w-11/12"/>
        <View className="items-center mt-10 flex-row">
          <Text className="text-black">Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('sign-up')}>
            <Text className="text-primary font-bold focus:text-xl">{'  '}Create One</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
