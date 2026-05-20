import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {IcVceTrainrrBattleStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBattleTypes';
import {icVceTrainrrGetPlayerColor} from '../../IcVceTrainrrTheme/IcVceTrainrrBattleTheme';

type Nav = StackNavigationProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattlePlayerReady'>;
type Route = RouteProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattlePlayerReady'>;

const IcVceTrainrrBattlePlayerReady = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {playerIndex, player1Name, player2Name, scrollSpeed, textSize} =
    route.params;

  const playerName = playerIndex === 0 ? player1Name : player2Name;
  const playerColor = icVceTrainrrGetPlayerColor(playerIndex);

  const startReading = () => {
    navigation.replace('IcVceTrainrrBattleReading', {
      player1Name,
      player2Name,
      scrollSpeed,
      textSize,
      playerIndex,
    });
  };

  return (
    <View style={icVceTrainrrStyles.icVceTrainrrRoot}>
      <View style={icVceTrainrrStyles.icVceTrainrrDarkPanel}>
        <View style={icVceTrainrrStyles.icVceTrainrrCenter}>
          <View
            style={[
              icVceTrainrrStyles.icVceTrainrrAvatar,
              {borderColor: playerColor, backgroundColor: playerColor + '1A'},
            ]}>
            <Text style={{fontSize: 40}}>
              {playerIndex === 0 ? '🟦' : '🟥'}
            </Text>
          </View>
          <Text style={icVceTrainrrStyles.icVceTrainrrName}>{playerName}</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrHint}>
            {playerIndex === 0
              ? "You're up first! Read the text as expressively as possible."
              : 'Your turn! Show the audience your best delivery.'}
          </Text>

          <Pressable
            onPress={startReading}
            style={({pressed}) => [pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
            <LinearGradient
              colors={['#54C0DA', '#6CD0F7']}
              style={icVceTrainrrStyles.icVceTrainrrReadyBtn}>
              <Text style={icVceTrainrrStyles.icVceTrainrrReadyBtnText}>I'm Ready!</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default IcVceTrainrrBattlePlayerReady;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrRoot: {
    flex: 1,
    backgroundColor: '#0D1B2AF2',
  },
  icVceTrainrrLightTop: {
    backgroundColor: '#DFF9FF',
  },
  icVceTrainrrDarkPanel: {
    flex: 1,
    backgroundColor: '#0D1B2AF2',
    justifyContent: 'center',
    paddingHorizontal: 28.162,
  },
  icVceTrainrrCenter: {
    alignItems: 'center',
  },
  icVceTrainrrAvatar: {
    width: 96.12,
    height: 96.12,
    borderRadius: 24.162,
    borderWidth: 1,
    padding: 4,
    marginBottom: 18.162,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrAvatarInner: {
    flex: 1,
    borderRadius: 16,
  },
  icVceTrainrrName: {
    color: '#FFFFFF',
    fontSize: 24.2,
    fontWeight: '800',
    marginBottom: 12.162,
    textAlign: 'center',
  },
  icVceTrainrrHint: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15.3,
    lineHeight: 22.45,
    textAlign: 'center',
    marginBottom: 32.162,
    paddingHorizontal: 12,
  },
  icVceTrainrrReadyBtn: {
    borderRadius: 16,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  icVceTrainrrReadyBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  icVceTrainrrPressed: {
    opacity: 0.9,
  },
});
