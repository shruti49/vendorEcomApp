import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import ProductCard from '../components/ProductCard';

const Product = () => {
  const navigation = useNavigation();
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const [productList, setProductList] = useState([]);
  const isFocused = useIsFocused();

  const getProductsByVendorId = async () => {
    const vendorId = await AsyncStorage.getItem('vendorId');
    firestore()
      .collection('products')
      .where('vendorId', '==', vendorId)
      .get()
      .then(snapshot => {
        setProductList(snapshot._docs);
      });
  };

  useEffect(() => {
    getProductsByVendorId();
  }, [isFocused]);

  if (productList.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          className="bg-[#FF6F00] rounded-md px-8 py-6"
          onPress={() => navigation.navigate('AddProduct', {type: 'new'})}
          style={{elevation: 2}}>
          <Text className="text-white font-semibold text-xl">Add Product</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderProductCard = item => (
    <ProductCard
      item={item}
      getProductsByVendorId={getProductsByVendorId}
      refreshFlatlist={refreshFlatlist}
      setRefreshFlatList={setRefreshFlatList}
    />
  );

  return (
    <View className="flex-1">
      <FlatList
        data={productList}
        renderItem={({item}) => renderProductCard(item)}
        keyExtractor={item => item._data.productId}
        extraData={refreshFlatlist}
      />
    </View>
  );
};

export default Product;
