import {View, Text, Image} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-eva-icons';

const ProductCard = props => {
  const {name, price, description, productImageUrl, productId} =
    props.item._data;
  return (
    <View className="w-11/12 mx-auto h-24 flex-row justify-between bg-white shadow-white shadow-2xl mt-4 rounded-lg p-2">
      <View className="flex-row">
        <Image source={{uri: productImageUrl}} className="rounded-sm w-20 h-20" />
        <View className="ml-4">
          <Text className="font-semibold text-lg text-black">{name} - ₹ {price}</Text>
          <Text className="text-black">{description}</Text>
        </View>
      </View>
      <View className="justify-between">
        <Icon
          name="edit"
          width={24}
          height={24}
          onPress={() =>
            navigation.navigate('AddProduct', {
              data: item._data,
              type: 'edit',
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
};

export default ProductCard;
