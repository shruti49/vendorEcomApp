import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {OrderProvider} from './src/utils/OrderContext';
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <OrderProvider>
        <AppNavigator />
      </OrderProvider>
    </GestureHandlerRootView>
  );
};

export default App;
