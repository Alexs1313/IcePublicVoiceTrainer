import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import IcVceTrainrrTipsCategoryList from '../IcVceTrainrrScreens/IcVceTrainrrTips/IcVceTrainrrTipsCategoryList';
import IcVceTrainrrTipsHome from '../IcVceTrainrrScreens/IcVceTrainrrTips/IcVceTrainrrTipsHome';
import IcVceTrainrrTipsRandom from '../IcVceTrainrrScreens/IcVceTrainrrTips/IcVceTrainrrTipsRandom';
import type {IcVceTrainrrTipsStackParamList} from './IcVceTrainrrTipsTypes';

const Stack = createStackNavigator<IcVceTrainrrTipsStackParamList>();

const IcVceTrainrrTipsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="IcVceTrainrrTipsHome" component={IcVceTrainrrTipsHome} />
      <Stack.Screen name="IcVceTrainrrTipsCategoryList" component={IcVceTrainrrTipsCategoryList} />
      <Stack.Screen name="IcVceTrainrrTipsRandom" component={IcVceTrainrrTipsRandom} />
    </Stack.Navigator>
  );
};

export default IcVceTrainrrTipsStack;
