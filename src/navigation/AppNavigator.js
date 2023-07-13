import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Splash from '../screens/Splash';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AddProduct from '../screens/AddProduct';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="sign-up" component={SignUp} />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{headerShown: true}}
        />

        <Stack.Screen name="home" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
