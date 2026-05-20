import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import type {IcVceTrainrrBattleStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBattleTypes';
import {
  icVceTrainrrBATTLE_ORANGE_GRADIENT,
  icVceTrainrrBATTLE_VOTE_SECONDS,
  icVceTrainrrGetPlayerColor,
} from '../../IcVceTrainrrTheme/IcVceTrainrrBattleTheme';
import {
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattleVoting'>;
type Route = RouteProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattleVoting'>;

const IcVceTrainrrBattleVoting = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {player1Name, player2Name, scrollSpeed, textSize} = route.params;

  const [secondsLeft, setSecondsLeft] = useState(icVceTrainrrBATTLE_VOTE_SECONDS);
  const [player1Votes, setPlayer1Votes] = useState(0);
  const [player2Votes, setPlayer2Votes] = useState(0);
  const finishedRef = useRef(false);

  const finishVoting = useCallback(() => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    navigation.replace('IcVceTrainrrBattleResult', {
      player1Name,
      player2Name,
      scrollSpeed,
      textSize,
      player1Votes,
      player2Votes,
    });
  }, [
    navigation,
    player1Name,
    player1Votes,
    player2Name,
    player2Votes,
    scrollSpeed,
    textSize,
  ]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      finishVoting();
      return undefined;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, finishVoting]);

  const totalVotes = player1Votes + player2Votes;

  return (
    <IcVceTrainrrLayout>
      <View
        style={[
          icVceTrainrrStyles.icVceTrainrrContent,
          {
            paddingTop: Math.max(insets.top, 52),
            paddingBottom: 24 + insets.bottom,
          },
        ]}>
        <IcVceTrainrrPromptrStreakHeader />

        <View style={icVceTrainrrStyles.icVceTrainrrBody}>
          <Text style={icVceTrainrrStyles.icVceTrainrrOverline}>AUDIENCE VOTE</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>Who was better?</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
            Each person taps their favorite speaker!
          </Text>

          <View style={icVceTrainrrStyles.icVceTrainrrTimerWrap}>
            <Text style={icVceTrainrrStyles.icVceTrainrrTimerText}>{secondsLeft}</Text>
            <Image
              source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcettomr.png')}
              style={{position: 'absolute'}}
            />
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrCardsRow}>
            <Pressable
              onPress={() => setPlayer1Votes(v => v + 1)}
              style={({pressed}) => [
                icVceTrainrrStyles.icVceTrainrrVoteCardWrap,
                pressed && icVceTrainrrStyles.icVceTrainrrPressed,
              ]}>
              <LinearGradient
                colors={['#54C0DA', '#6CD0F7']}
                style={icVceTrainrrStyles.icVceTrainrrVoteCard}>
                <View
                  style={{
                    padding: 16,
                  }}>
                  <Text style={icVceTrainrrStyles.icVceTrainrrVoteName}>🟦</Text>
                  <Text style={icVceTrainrrStyles.icVceTrainrrVoteName}>{player1Name}</Text>
                  <View style={icVceTrainrrStyles.icVceTrainrrVotePill}>
                    <Text style={icVceTrainrrStyles.icVceTrainrrVotePillText}>
                      {player1Votes} votes
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={() => setPlayer2Votes(v => v + 1)}
              style={({pressed}) => [
                icVceTrainrrStyles.icVceTrainrrVoteCardWrap,
                pressed && icVceTrainrrStyles.icVceTrainrrPressed,
              ]}>
              <LinearGradient
                colors={[...icVceTrainrrBATTLE_ORANGE_GRADIENT]}
                style={icVceTrainrrStyles.icVceTrainrrVoteCard}>
                <Text style={icVceTrainrrStyles.icVceTrainrrVoteName}>🟥</Text>
                <Text style={icVceTrainrrStyles.icVceTrainrrVoteName}>{player2Name}</Text>
                <View style={icVceTrainrrStyles.icVceTrainrrVotePill}>
                  <Text style={icVceTrainrrStyles.icVceTrainrrVotePillText}>{player2Votes} votes</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>

          <Text style={icVceTrainrrStyles.icVceTrainrrStatus}>
            {totalVotes} votes cast · Ends in {secondsLeft}s
          </Text>

          <Pressable
            onPress={finishVoting}
            style={({pressed}) => [icVceTrainrrStyles.endBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
            <Text style={icVceTrainrrStyles.endBtnText}>End Voting Early</Text>
          </Pressable>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrBattleVoting;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.12,
    alignItems: 'center',
  },
  icVceTrainrrOverline: {
    color: '#F5A623',
    fontSize: 13.162,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8.62,
    marginTop: 8.62,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 26.121,
    fontWeight: '800',
    marginBottom: 8.12,
    textAlign: 'center',
  },
  icVceTrainrrSubtitle: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 20,
  },
  icVceTrainrrTimerWrap: {
    marginBottom: 52.42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40.81,
  },
  icVceTrainrrTimerText: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 28.01,
    fontWeight: '700',
  },
  icVceTrainrrCardsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  icVceTrainrrVoteCardWrap: {
    flex: 1,
  },
  icVceTrainrrVoteCard: {
    borderRadius: 22.12,
    alignItems: 'center',
    minHeight: 190.63,
    justifyContent: 'center',
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12.11,
    elevation: 4,
  },
  icVceTrainrrVoteDot: {
    width: 20.162,
    height: 20,
    borderRadius: 6.16,
    marginBottom: 12.12,
  },
  icVceTrainrrVoteName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
    textAlign: 'center',
  },
  icVceTrainrrVotePill: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  icVceTrainrrVotePillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  icVceTrainrrStatus: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    marginBottom: 18.12,
  },
  endBtn: {
    width: 150,
    backgroundColor: '#0000000F',
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endBtnText: {
    color: '#8AA8B8',
    fontSize: 15,
    fontWeight: '600',
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
