import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Product = () => {
  const navigation = useNavigation();

  const [productList, setProductList] = useState();
  const iseFocused = useIsFocused();

  const getProducts = async () => {
    const userId = await AsyncStorage.getItem('userId');
    firestore
      .collection('vendors')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        console.log(JSON.stringify(snapshot.docs[0].data));
        if (snapshot.docChanges.length > 0) {
          setProductList(snapshot.docs);
        }
      });
  };

  useEffect(() => {
    getProducts();
  }, [iseFocused]);

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

  return (
    <View className="flex-1">
      <FlatList
        data={productList}
        renderItem={({item, index}) => {
          return (
            <View className="w-screen h-24 flex-row">
              <Image
                source={{uri: item?._data?.productImage}}
                className=" w-20 h-20"
              />
              <View className="ml-4">
                <Text className="font-semibold text-lg">{item._data.name}</Text>
                <Text>{item._data.description}</Text>
                <Text className="bg-green">INR {item._data.price}</Text>
              </View>
              <View>
                <Icon
                  name="edit"
                  width={24}
                  height={24}
                  onPress={() =>
                    navigation.navigate('AddProduct', {data: item, type: edit})
                  }
                />
                <Icon
                  name="trash-2"
                  width={24}
                  height={24}
                  onPress={() => handleRemove(item._data.productId)}
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
