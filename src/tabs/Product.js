import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import ProductCard from '../components/ProductCard';

const Product = () => {
  const navigation = useNavigation();

  const [productList, setProductList] = useState([]);
  const isFocused = useIsFocused();

  const getProducts = async () => {
    const userId = await AsyncStorage.getItem('userId');
    firestore()
      .collection('products')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (snapshot._docs.length > 0) {
          setProductList(snapshot._docs);
        }
      });
  };

  useEffect(() => {
    getProducts();
  }, [isFocused]);

  const handleRemove = itemId => {
    firestore()
      .collection('products')
      .doc(itemId)
      .delete()
      .then(() => {
        console.log('Product deleted!');
        getProducts();
      });
  };

  if (productList.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          className="bg-[#FF6F00]  rounded-md shadow-2xl px-8 py-6"
          onPress={() => navigation.navigate('AddProduct', {type: 'new'})}>
          <Text className="text-white font-semibold text-xl">Add Product</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={productList}
        renderItem={({item}) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Product;
