import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import TabNav from './TabNav';
import Loader from '../components/Loader';
import Onboarding from '../screens/Onboarding';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Loader" component={Loader} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="TabNav" component={TabNav} />
    </Stack.Navigator>
  );
};

export default StackNav;
