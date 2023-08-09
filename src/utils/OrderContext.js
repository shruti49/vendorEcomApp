import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

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

  const fetchOrders = () => {
    firestore()
      .collection('orders')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          let cartItems = [];
          snapshot.docs.map(item => {
            cartItems.push(item._data);
          });
          if (cartItems.length > 0) {
            setOrderList(cartItems);
          }
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
