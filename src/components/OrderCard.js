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
          key={cartItem.cartItemId}>
          <View className="flex-row justify-between">
            <View className="flex-row">
              <Image
                source={{uri: cartItem.cartItemData.productImageUrl}}
                className="rounded-sm w-20 h-20"
              />
              <View className="ml-4">
                <Text className="font-semibold text-lg text-black">
                  {cartItem.cartItemData.productName}
                </Text>
                <Text className="text-black">
                  {cartItem.cartItemData.productDescription}
                </Text>
              </View>
            </View>
            <View className="justify-between">
              <Text className="text-black font-semibold text-base self-end">
                Quantity: {cartItem.quantity}
              </Text>
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
        </View>
      ))}
    </>
  );
};

export default OrderCard;
