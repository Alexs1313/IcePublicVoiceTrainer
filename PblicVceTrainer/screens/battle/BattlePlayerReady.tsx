import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {BattleStackParamList} from '../../routes/battleTypes';
import {getPlayerColor} from '../../theme/battleTheme';

type Nav = StackNavigationProp<BattleStackParamList, 'BattlePlayerReady'>;
type Route = RouteProp<BattleStackParamList, 'BattlePlayerReady'>;

const BattlePlayerReady = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {playerIndex, player1Name, player2Name, scrollSpeed, textSize} =
    route.params;

  const playerName = playerIndex === 0 ? player1Name : player2Name;
  const playerColor = getPlayerColor(playerIndex);

  const startReading = () => {
    navigation.replace('BattleReading', {
      player1Name,
      player2Name,
      scrollSpeed,
      textSize,
      playerIndex,
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.darkPanel}>
        <View style={styles.center}>
          <View
            style={[
              styles.avatar,
              {borderColor: playerColor, backgroundColor: playerColor + '1A'},
            ]}>
            <Text style={{fontSize: 40}}>
              {playerIndex === 0 ? '🟦' : '🟥'}
            </Text>
          </View>
          <Text style={styles.name}>{playerName}</Text>
          <Text style={styles.hint}>
            {playerIndex === 0
              ? "You're up first! Read the text as expressively as possible."
              : 'Your turn! Show the audience your best delivery.'}
          </Text>

          <Pressable
            onPress={startReading}
            style={({pressed}) => [pressed && styles.pressed]}>
            <LinearGradient
              colors={['#54C0DA', '#6CD0F7']}
              style={styles.readyBtn}>
              <Text style={styles.readyBtnText}>I'm Ready!</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BattlePlayerReady;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D1B2AF2',
  },
  lightTop: {
    backgroundColor: '#DFF9FF',
  },
  darkPanel: {
    flex: 1,
    backgroundColor: '#0D1B2AF2',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  center: {
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 24,
    borderWidth: 1,
    padding: 4,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    flex: 1,
    borderRadius: 16,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  hint: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  readyBtn: {
    borderRadius: 16,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  readyBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.9,
  },
});
