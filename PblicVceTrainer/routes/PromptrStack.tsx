import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import PromptrDifficulty from '../screens/promptr/PromptrDifficulty';
import PromptrHome from '../screens/promptr/PromptrHome';
import PromptrReading from '../screens/promptr/PromptrReading';
import PromptrSessionComplete from '../screens/promptr/PromptrSessionComplete';
import PromptrTextList from '../screens/promptr/PromptrTextList';
import type {PromptrStackParamList} from './promptrTypes';

const Stack = createStackNavigator<PromptrStackParamList>();

const PromptrStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="PromptrHome" component={PromptrHome} />
      <Stack.Screen name="PromptrTextList" component={PromptrTextList} />
      <Stack.Screen name="PromptrDifficulty" component={PromptrDifficulty} />
      <Stack.Screen
        name="PromptrReading"
        component={PromptrReading}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="PromptrSessionComplete"
        component={PromptrSessionComplete}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default PromptrStack;
