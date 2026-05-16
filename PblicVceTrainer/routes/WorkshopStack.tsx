import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import WorkshopHome from '../screens/workshop/WorkshopHome';
import WorkshopTextEditor from '../screens/workshop/WorkshopTextEditor';
import WorkshopTextList from '../screens/workshop/WorkshopTextList';
import type {WorkshopStackParamList} from './workshopTypes';

const Stack = createStackNavigator<WorkshopStackParamList>();

const WorkshopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="WorkshopHome" component={WorkshopHome} />
      <Stack.Screen name="WorkshopTextList" component={WorkshopTextList} />
      <Stack.Screen name="WorkshopTextEditor" component={WorkshopTextEditor} />
    </Stack.Navigator>
  );
};

export default WorkshopStack;
