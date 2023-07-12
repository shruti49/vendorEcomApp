import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Product from '../tabs/Product';
import Order from '../tabs/Order';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [slectedTab, setSelectedTab] = useState(0);

  const navigation = useNavigation();

  return (
    <View className="flex-1">
      {slectedTab === 0 ? <Product /> : <Order />}
      <View className="flex-row justify-evenly items-center bg-white absolute bottom-0 w-full h-20 shadow-white shadow-2xl rounded-t-3xl">
        <TouchableOpacity onPress={() => setSelectedTab(0)}>
          <Image
            source={require('../../images/product.png')}
            className="w-12 h-12"
            tintColor={slectedTab === 0 ? '#FF6F00' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
          <Image
            source={require('../../images/plus.png')}
            className="w-16 h-16"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab(1)}>
          <Image
            source={require('../../images/order.png')}
            className="w-12 h-12"
            tintColor={slectedTab === 1 ? '#FF6F00' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
