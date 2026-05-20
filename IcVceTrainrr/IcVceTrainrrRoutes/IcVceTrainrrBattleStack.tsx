import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import IcVceTrainrrBattleEnterPlayers from '../IcVceTrainrrScreens/IcVceTrainrrBattle/IcVceTrainrrBattleEnterPlayers';
import IcVceTrainrrBattleHome from '../IcVceTrainrrScreens/IcVceTrainrrBattle/IcVceTrainrrBattleHome';
import IcVceTrainrrBattlePlayerReady from '../IcVceTrainrrScreens/IcVceTrainrrBattle/IcVceTrainrrBattlePlayerReady';
import IcVceTrainrrBattleReading from '../IcVceTrainrrScreens/IcVceTrainrrBattle/IcVceTrainrrBattleReading';
import IcVceTrainrrBattleResult from '../IcVceTrainrrScreens/IcVceTrainrrBattle/IcVceTrainrrBattleResult';
import IcVceTrainrrBattleSettings from '../IcVceTrainrrScreens/IcVceTrainrrBattle/IcVceTrainrrBattleSettings';
import IcVceTrainrrBattleVoting from '../IcVceTrainrrScreens/IcVceTrainrrBattle/IcVceTrainrrBattleVoting';
import type {IcVceTrainrrBattleStackParamList} from './IcVceTrainrrBattleTypes';

const Stack = createStackNavigator<IcVceTrainrrBattleStackParamList>();

const IcVceTrainrrBattleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="IcVceTrainrrBattleHome" component={IcVceTrainrrBattleHome} />
      <Stack.Screen name="IcVceTrainrrBattleEnterPlayers" component={IcVceTrainrrBattleEnterPlayers} />
      <Stack.Screen name="IcVceTrainrrBattleSettings" component={IcVceTrainrrBattleSettings} />
      <Stack.Screen name="IcVceTrainrrBattlePlayerReady" component={IcVceTrainrrBattlePlayerReady} />
      <Stack.Screen
        name="IcVceTrainrrBattleReading"
        component={IcVceTrainrrBattleReading}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="IcVceTrainrrBattleVoting" component={IcVceTrainrrBattleVoting} />
      <Stack.Screen
        name="IcVceTrainrrBattleResult"
        component={IcVceTrainrrBattleResult}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default IcVceTrainrrBattleStack;
