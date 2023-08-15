import React, {useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {OrderContext} from '../utils/OrderContext';

const OrderCard = ({
  item,
  handleBottomSheetPress,
  setRefreshFlatList,
  refreshFlatlist,
}) => {
  const {status, cartItems, orderId} = item;

  const {setOrderId, setOrderStatus, orderStatus} = useContext(OrderContext);
  useEffect(() => {
    setOrderStatus(status);
  }, [status]);

  return (
    <>
      <View>
        <Text className="text-black text-center mb-4 font-bold">
          ORDER ID : {orderId}
        </Text>
      </View>
      {cartItems.map(cartItem => (
        <View
          className="w-11/12 mx-auto mb-4 bg-white rounded-lg p-2"
          style={{elevation: 5}}
          key={cartItem.itemId}>
          <View className="flex-row justify-between items-end">
            <View className="flex-row">
              <Image
                source={{uri: cartItem.itemData.productImageUrl}}
                className="rounded-sm w-20 h-20"
              />
              <View className="ml-4">
                <Text className="font-semibold text-lg text-black">
                  {cartItem.itemData.productName}
                </Text>
                <Text className="text-black">
                  {cartItem.itemData.productDescription}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOrderId(orderId);
                handleBottomSheetPress();
              }}>
              <Text className="bg-[#FF6F00] text-bold text-md text-white p-2 rounded-md">
                Order {status}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
};

export default OrderCard;
