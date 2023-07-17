import React from 'react';
import {View, Text, Image} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';

const ProductCard = props => {
  const navigation = useNavigation();

  const {name, price, description, ImageUrl, id} = props.item._data;

  const handleRemove = itemId => {
    firestore()
      .collection('products')
      .doc(itemId)
      .delete()
      .then(() => {
        console.log('Product deleted!');
        props.setRefreshFlatList(!props.refreshFlatlist);
        props.getProducts();
      });
  };

  return (
    <View
      className="w-11/12 mx-auto h-24 flex-row justify-between bg-white mt-4 rounded-lg p-2"
      style={{elevation: 2}}>
      <View className="flex-row">
        <Image source={{uri: ImageUrl}} className="rounded-sm w-20 h-20" />
        <View className="ml-4">
          <Text className="font-semibold text-lg text-black">
            {name} - ₹ {price}
          </Text>
          <Text className="text-black">{description}</Text>
        </View>
      </View>
      <View className="justify-between">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddProduct', {
              data: props.item._data,
              type: 'edit',
            })
          }>
          <Icon name="edit" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemove(id)}>
          <Icon name="trash-2" width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
