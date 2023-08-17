import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrderContext = createContext();

export const OrderProvider = ({children}) => {
  const [orderStatus, setOrderStatus] = useState();
  const [orderId, setOrderId] = useState();
  const [orderList, setOrderList] = useState([]);

  const updateOrderStatus = status => {
    firestore()
      .collection('orders')
      .doc(orderId)
      .update({
        status,
      })
      .then(() => {
        setOrderStatus(status);
      })
      .catch(err => console.log(err));
  };

  const fetchOrders = async () => {
    //add indicator
    //get user id from storage
    const vendorId = await AsyncStorage.getItem('vendorId');
    firestore()
      .collection('orders')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          let orders = [];
          snapshot.docs.map(order => {
            orders.push(order._data);
          });
          let filteredOrders = [];
          for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].cartItems.length; j++) {
              if (orders[i].cartItems[j].cartItemData.vendorId === vendorId) {
                filteredOrders.push(orders[i]);
              }
            }
          }
          setOrderList(filteredOrders);
        }
      });
  };

  return (
    <OrderContext.Provider
      value={{
        orderId,
        setOrderId,
        updateOrderStatus,
        fetchOrders,
        orderList,
        orderStatus,
        setOrderStatus,
      }}>
      {children}
    </OrderContext.Provider>
  );
};
