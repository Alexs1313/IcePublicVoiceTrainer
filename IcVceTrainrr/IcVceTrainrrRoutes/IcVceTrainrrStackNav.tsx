import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import IcVceTrainrrTabNav from './IcVceTrainrrTabNav';
import IcVceTrainrrLoader from '../IcVceTrainrrComponents/IcVceTrainrrLoader';
import IcVceTrainrrOnboarding from '../IcVceTrainrrScreens/IcVceTrainrrOnboarding';

const Stack = createStackNavigator();

const IcVceTrainrrStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="IcVceTrainrrLoader" component={IcVceTrainrrLoader} />
      <Stack.Screen name="IcVceTrainrrOnboarding" component={IcVceTrainrrOnboarding} />
      <Stack.Screen name="IcVceTrainrrTabNav" component={IcVceTrainrrTabNav} />
    </Stack.Navigator>
  );
};

export default IcVceTrainrrStackNav;
