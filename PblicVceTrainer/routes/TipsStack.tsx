import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import TipsCategoryList from '../screens/tips/TipsCategoryList';
import TipsHome from '../screens/tips/TipsHome';
import TipsRandom from '../screens/tips/TipsRandom';
import type {TipsStackParamList} from './tipsTypes';

const Stack = createStackNavigator<TipsStackParamList>();

const TipsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="TipsHome" component={TipsHome} />
      <Stack.Screen name="TipsCategoryList" component={TipsCategoryList} />
      <Stack.Screen name="TipsRandom" component={TipsRandom} />
    </Stack.Navigator>
  );
};

export default TipsStack;
