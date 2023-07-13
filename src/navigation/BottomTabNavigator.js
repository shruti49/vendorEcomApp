import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from 'react-native-eva-icons';
import AddProduct from '../screens/AddProduct';
import Product from '../tabs/Product';
import Order from '../tabs/Order';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 80,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => {
          let imageName;
          let color;
          let size;

          if (route.name === 'Products') {
            color = focused ? '#FF6F00' : 'black';
            imageName = require('../../images/product.png');
          } else if (route.name === 'AddProduct') {
            imageName = require('../../images/plus.png');
            size = 'w-16 h-16';
          } else if (route.name === 'Orders') {
            color = focused ? '#FF6F00' : 'black';
            imageName = require('../../images/order.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={imageName}
              className={size ? size : 'w-10 h-10'}
              tintColor={color}
            />
          );
        },
      })}>
      <Tab.Screen name="Products" component={Product} />
      <Tab.Screen name="AddProduct" component={AddProduct} />
      <Tab.Screen name="Orders" component={Order} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
