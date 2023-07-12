// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {Icon} from 'react-native-eva-icons';

// import Home from '../tabs/Home';
// import Cart from '../tabs/Cart';
// import Search from '../tabs/Search';
// import User from '../tabs/User';
// import Wishlist from '../tabs/Wishlist';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarStyle: {
//           paddingBottom: 5,
//           paddingTop: 5,
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           height: 50,
//         },
//         headerShown: false,
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Search') {
//             iconName = focused ? 'search' : 'search-outline';
//           } else if (route.name === 'Cart') {
//             iconName = focused ? 'shopping-cart' : 'shopping-cart-outline';
//           } else if (route.name === 'Wishlist') {
//             iconName = focused ? 'heart' : 'heart-outline';
//           } else if (route.name === 'User') {
//             iconName = focused ? 'person' : 'person-outline';
//           }

//           // You can return any component that you like here!
//           return (
//             <Icon name={iconName} width={size} height={size} fill={color} />
//           );
//         },
//         tabBarActiveTintColor: '#61dafb',
//         tabBarInactiveTintColor: '#000000',
//       })}>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Search" component={Search} />
//       <Tab.Screen name="Cart" component={Cart} />
//       <Tab.Screen name="Wishlist" component={Wishlist} />
//       <Tab.Screen name="User" component={User} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;
