import React, {
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
  useState,
} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import OrderCard from '../components/OrderCard';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Icon} from 'react-native-eva-icons';
import {OrderContext} from '../utils/OrderContext';

const Order = () => {
  const isFocused = useIsFocused();
  const {updateOrderStatus, fetchOrders, orderList} = useContext(OrderContext);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const orderStatusList = ['Dispatched', 'Placed', 'Cancelled', 'Rejected'];
 
  useEffect(() => {
    fetchOrders();
  }, [isFocused, refreshFlatlist]);

  if (orderList.length === 0) {
    <View>
      <Text>No orders right now</Text>
    </View>;
  }

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['30%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index = number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = () => bottomSheetModalRef.current.close();

  const renderOrderCard = item => (
    <OrderCard
      item={item}
      handleBottomSheetPress={handlePresentModalPress}
      setRefreshFlatList={setRefreshFlatList}
      refreshFlatlist={refreshFlatlist}
    />
  );
  const getKey = item => {
    const id = item.cartItems.map(e => e.itemId);
    return id;
  };

  return (
    <View className="flex-1 my-4">
      <BottomSheetModalProvider>
        <FlatList
          data={orderList}
          renderItem={({item}) => renderOrderCard(item)}
          keyExtractor={item => getKey(item)}
          setRefreshFlatList={setRefreshFlatList}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View className="flex-1">
            <TouchableOpacity
              onPress={handleClosePress}
              className="pr-4 items-end">
              <Icon name="close-outline" width={24} height={24} />
            </TouchableOpacity>
            {orderStatusList.map(status => (
              <TouchableOpacity
                className="border-b-2 p-2 border-gray-400"
                onPress={() => {
                  updateOrderStatus(status);
                  setRefreshFlatList(!refreshFlatlist);
                  handleClosePress();
                }}>
                <Text className="text-black text-bold text-md">{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Order;
