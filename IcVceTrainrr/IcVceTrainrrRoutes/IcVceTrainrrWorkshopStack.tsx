import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import IcVceTrainrrWorkshopHome from '../IcVceTrainrrScreens/IcVceTrainrrWorkshop/IcVceTrainrrWorkshopHome';
import IcVceTrainrrWorkshopTextEditor from '../IcVceTrainrrScreens/IcVceTrainrrWorkshop/IcVceTrainrrWorkshopTextEditor';
import IcVceTrainrrWorkshopTextList from '../IcVceTrainrrScreens/IcVceTrainrrWorkshop/IcVceTrainrrWorkshopTextList';
import type {IcVceTrainrrWorkshopStackParamList} from './IcVceTrainrrWorkshopTypes';

const Stack = createStackNavigator<IcVceTrainrrWorkshopStackParamList>();

const IcVceTrainrrWorkshopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="IcVceTrainrrWorkshopHome" component={IcVceTrainrrWorkshopHome} />
      <Stack.Screen name="IcVceTrainrrWorkshopTextList" component={IcVceTrainrrWorkshopTextList} />
      <Stack.Screen name="IcVceTrainrrWorkshopTextEditor" component={IcVceTrainrrWorkshopTextEditor} />
    </Stack.Navigator>
  );
};

export default IcVceTrainrrWorkshopStack;
