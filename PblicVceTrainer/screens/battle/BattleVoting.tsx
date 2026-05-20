import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import type {BattleStackParamList} from '../../routes/battleTypes';
import {
  BATTLE_ORANGE_GRADIENT,
  BATTLE_VOTE_SECONDS,
  getPlayerColor,
} from '../../theme/battleTheme';
import {
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<BattleStackParamList, 'BattleVoting'>;
type Route = RouteProp<BattleStackParamList, 'BattleVoting'>;

const BattleVoting = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {player1Name, player2Name, scrollSpeed, textSize} = route.params;

  const [secondsLeft, setSecondsLeft] = useState(BATTLE_VOTE_SECONDS);
  const [player1Votes, setPlayer1Votes] = useState(0);
  const [player2Votes, setPlayer2Votes] = useState(0);
  const finishedRef = useRef(false);

  const finishVoting = useCallback(() => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    navigation.replace('BattleResult', {
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
    <Layout>
      <View
        style={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 52),
            paddingBottom: 24 + insets.bottom,
          },
        ]}>
        <PromptrStreakHeader />

        <View style={styles.body}>
          <Text style={styles.overline}>AUDIENCE VOTE</Text>
          <Text style={styles.heading}>Who was better?</Text>
          <Text style={styles.subtitle}>
            Each person taps their favorite speaker!
          </Text>

          <View style={styles.timerWrap}>
            <Text style={styles.timerText}>{secondsLeft}</Text>
            <Image
              source={require('../../assets/images/pblicvcettomr.png')}
              style={{position: 'absolute'}}
            />
          </View>

          <View style={styles.cardsRow}>
            <Pressable
              onPress={() => setPlayer1Votes(v => v + 1)}
              style={({pressed}) => [
                styles.voteCardWrap,
                pressed && styles.pressed,
              ]}>
              <LinearGradient
                colors={['#54C0DA', '#6CD0F7']}
                style={styles.voteCard}>
                <View
                  style={{
                    padding: 16,
                  }}>
                  <Text style={styles.voteName}>🟦</Text>
                  <Text style={styles.voteName}>{player1Name}</Text>
                  <View style={styles.votePill}>
                    <Text style={styles.votePillText}>
                      {player1Votes} votes
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={() => setPlayer2Votes(v => v + 1)}
              style={({pressed}) => [
                styles.voteCardWrap,
                pressed && styles.pressed,
              ]}>
              <LinearGradient
                colors={[...BATTLE_ORANGE_GRADIENT]}
                style={styles.voteCard}>
                <Text style={styles.voteName}>🟥</Text>
                <Text style={styles.voteName}>{player2Name}</Text>
                <View style={styles.votePill}>
                  <Text style={styles.votePillText}>{player2Votes} votes</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>

          <Text style={styles.status}>
            {totalVotes} votes cast · Ends in {secondsLeft}s
          </Text>

          <Pressable
            onPress={finishVoting}
            style={({pressed}) => [styles.endBtn, pressed && styles.pressed]}>
            <Text style={styles.endBtnText}>End Voting Early</Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default BattleVoting;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20.12,
    alignItems: 'center',
  },
  overline: {
    color: '#F5A623',
    fontSize: 13.162,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8.62,
    marginTop: 8.62,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 26.121,
    fontWeight: '800',
    marginBottom: 8.12,
    textAlign: 'center',
  },
  subtitle: {
    color: pblicvcepromptrMuted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 20,
  },
  timerWrap: {
    marginBottom: 52.42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40.81,
  },
  timerText: {
    color: pblicvcepromptrTitle,
    fontSize: 28.01,
    fontWeight: '700',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  voteCardWrap: {
    flex: 1,
  },
  voteCard: {
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
  voteDot: {
    width: 20.162,
    height: 20,
    borderRadius: 6.16,
    marginBottom: 12.12,
  },
  voteName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
    textAlign: 'center',
  },
  votePill: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  votePillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  status: {
    color: pblicvcepromptrMuted,
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
  pressed: {
    opacity: 0.92,
  },
});
