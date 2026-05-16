import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import BattleEnterPlayers from '../screens/battle/BattleEnterPlayers';
import BattleHome from '../screens/battle/BattleHome';
import BattlePlayerReady from '../screens/battle/BattlePlayerReady';
import BattleReading from '../screens/battle/BattleReading';
import BattleResult from '../screens/battle/BattleResult';
import BattleSettings from '../screens/battle/BattleSettings';
import BattleVoting from '../screens/battle/BattleVoting';
import type {BattleStackParamList} from './battleTypes';

const Stack = createStackNavigator<BattleStackParamList>();

const BattleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="BattleHome" component={BattleHome} />
      <Stack.Screen name="BattleEnterPlayers" component={BattleEnterPlayers} />
      <Stack.Screen name="BattleSettings" component={BattleSettings} />
      <Stack.Screen name="BattlePlayerReady" component={BattlePlayerReady} />
      <Stack.Screen
        name="BattleReading"
        component={BattleReading}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="BattleVoting" component={BattleVoting} />
      <Stack.Screen
        name="BattleResult"
        component={BattleResult}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default BattleStack;
