import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import IcVceTrainrrPromptrDifficulty from '../IcVceTrainrrScreens/IcVceTrainrrPromptr/IcVceTrainrrPromptrDifficulty';
import IcVceTrainrrPromptrHome from '../IcVceTrainrrScreens/IcVceTrainrrPromptr/IcVceTrainrrPromptrHome';
import IcVceTrainrrPromptrReading from '../IcVceTrainrrScreens/IcVceTrainrrPromptr/IcVceTrainrrPromptrReading';
import IcVceTrainrrPromptrSessionComplete from '../IcVceTrainrrScreens/IcVceTrainrrPromptr/IcVceTrainrrPromptrSessionComplete';
import IcVceTrainrrPromptrTextList from '../IcVceTrainrrScreens/IcVceTrainrrPromptr/IcVceTrainrrPromptrTextList';
import type {IcVceTrainrrPromptrStackParamList} from './IcVceTrainrrPromptrTypes';

const Stack = createStackNavigator<IcVceTrainrrPromptrStackParamList>();

const IcVceTrainrrPromptrStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="IcVceTrainrrPromptrHome" component={IcVceTrainrrPromptrHome} />
      <Stack.Screen name="IcVceTrainrrPromptrTextList" component={IcVceTrainrrPromptrTextList} />
      <Stack.Screen name="IcVceTrainrrPromptrDifficulty" component={IcVceTrainrrPromptrDifficulty} />
      <Stack.Screen
        name="IcVceTrainrrPromptrReading"
        component={IcVceTrainrrPromptrReading}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="IcVceTrainrrPromptrSessionComplete"
        component={IcVceTrainrrPromptrSessionComplete}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default IcVceTrainrrPromptrStack;
