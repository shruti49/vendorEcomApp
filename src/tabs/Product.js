import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Icon} from 'react-native-eva-icons';

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
          className=" bg-primary rounded-md shadow-2xl px-8 py-6"
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
        renderItem={({item, index}) => {
          const {name, description, price, productId, productImageUrl} =
            item._data;
          return (
            <View className="h-24 flex-row ">
              <Image source={{uri: productImageUrl}} className=" w-20 h-20" />
              <View className="ml-4">
                <Text className="font-semibold text-lg">{name}</Text>
                <Text>{description}</Text>
                <Text className="bg-green">INR {price}</Text>
              </View>
              <View>
                <Icon
                  name="edit"
                  width={24}
                  height={24}
                  onPress={() =>
                    navigation.navigate('AddProduct', {
                      data: item._data,
                      type: "edit",
                    })
                  }
                />
                <Icon
                  name="trash-2"
                  width={24}
                  height={24}
                  onPress={() => handleRemove(productId)}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Product;
