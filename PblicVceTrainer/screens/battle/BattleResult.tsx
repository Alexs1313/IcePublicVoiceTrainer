import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import type {BattleStackParamList} from '../../routes/battleTypes';
import {BATTLE_ORANGE_GRADIENT} from '../../theme/battleTheme';
import {
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<BattleStackParamList, 'BattleResult'>;
type Route = RouteProp<BattleStackParamList, 'BattleResult'>;

const VoteBar = ({
  votes,
  totalVotes,
  isWinner,
  fillStyle,
}: {
  votes: number;
  totalVotes: number;
  isWinner: boolean;
  fillStyle: object;
}) => {
  const fillPercent =
    totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <View style={[styles.barTrack, isWinner && styles.barTrackWinner]}>
      <View
        style={[
          styles.barFill,
          fillStyle,
          {
            width: `${fillPercent}%`,
            minWidth: fillPercent > 0 ? 8 : 0,
          },
        ]}
      />
    </View>
  );
};

const BattleResult = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {player1Name, player2Name, player1Votes, player2Votes} = route.params;

  const player1Wins = player1Votes >= player2Votes;
  const winnerName = player1Wins ? player1Name : player2Name;
  const totalVotes = player1Votes + player2Votes;

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'BattleHome'}],
      }),
    );
  };

  const shareResult = useCallback(async () => {
    const message = [
      '🏆 Diction Battle Results',
      '',
      `${winnerName} wins!`,
      `${player1Name}: ${player1Votes} votes`,
      `${player2Name}: ${player2Votes} votes`,
      '',
      'Ice Public Voice Trainer',
    ].join('\n');

    try {
      await Share.share({message, title: 'Battle Results'});
    } catch {
      console.log('error sharing result');
    }
  }, [player1Name, player1Votes, player2Name, player2Votes, winnerName]);

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
          <View style={styles.hero}>
            <LinearGradient
              colors={[...BATTLE_ORANGE_GRADIENT]}
              style={styles.heroIcon}>
              <Image source={require('../../assets/images/pblicvcetck.png')} />
            </LinearGradient>
            <Text style={styles.overline}>BATTLE RESULTS</Text>
            <Text style={styles.heading}>{winnerName} Wins! 🏆</Text>
          </View>

          <View style={styles.cardsRow}>
            <View
              style={[
                styles.resultCard,
                player1Wins ? styles.resultCardWinner : styles.resultCardLoser,
              ]}>
              {player1Wins ? <Text style={styles.crown}>👑</Text> : null}
              <Text style={styles.resultNameIcon}>🟦</Text>
              <Text
                style={[
                  styles.resultName,
                  player1Wins && styles.resultNameWinner,
                ]}>
                {player1Name}
              </Text>
              <Text
                style={[
                  styles.resultScore,
                  player1Wins
                    ? styles.resultScoreWinner
                    : styles.resultScoreLoser,
                ]}>
                {player1Votes}
              </Text>
              <Text
                style={[
                  styles.resultVotesLabel,
                  player1Wins && styles.resultVotesLabelWinner,
                ]}>
                votes
              </Text>
              <VoteBar
                votes={player1Votes}
                totalVotes={totalVotes}
                isWinner={player1Wins}
                fillStyle={
                  player1Wins ? styles.barFillWinner : styles.barFillLoser1
                }
              />
            </View>

            <View
              style={[
                styles.resultCard,
                !player1Wins ? styles.resultCardWinner : styles.resultCardLoser,
              ]}>
              {!player1Wins ? <Text style={styles.crown}>👑</Text> : null}

              <Text style={styles.resultNameIcon}>🟥</Text>
              <Text style={styles.resultName}>{player2Name}</Text>

              <Text
                style={[
                  styles.resultScore,
                  !player1Wins
                    ? styles.resultScoreWinner
                    : styles.resultScoreLoser,
                ]}>
                {player2Votes}
              </Text>
              <Text
                style={[
                  styles.resultVotesLabel,
                  !player1Wins && styles.resultVotesLabelWinner,
                ]}>
                votes
              </Text>
              <VoteBar
                votes={player2Votes}
                totalVotes={totalVotes}
                isWinner={!player1Wins}
                fillStyle={
                  !player1Wins ? styles.barFillWinner : styles.barFillLoser2
                }
              />
            </View>
          </View>

          <Text style={styles.total}>{totalVotes} total votes cast</Text>

          <Pressable
            onPress={shareResult}
            style={{width: '100%', marginTop: 10}}>
            <LinearGradient
              colors={[...BATTLE_ORANGE_GRADIENT]}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>Share</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={goHome} style={styles.homeLink}>
            <Text style={styles.homeLinkText}>Go to Home</Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default BattleResult;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroEmoji: {
    fontSize: 32,
  },
  overline: {
    color: '#F5A623',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 12,
    marginTop: 10,
  },
  resultCard: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
    minHeight: 240,
    justifyContent: 'center',
  },
  resultCardWinner: {
    backgroundColor: '#54C0DA',
  },
  resultCardLoser: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  crown: {
    fontSize: 18,
    marginBottom: 6,
  },
  resultDot: {
    width: 18,
    height: 18,
    borderRadius: 6,
    marginBottom: 8,
  },
  resultName: {
    color: pblicvcepromptrTitle,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  resultNameWinner: {
    color: '#FFFFFF',
  },
  resultNameIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  resultScore: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 2,
  },
  resultScoreWinner: {
    color: '#FFFFFF',
  },
  resultScoreLoser: {
    color: '#F5A623',
  },
  resultVotesLabel: {
    color: pblicvcepromptrMuted,
    fontSize: 12,
    marginBottom: 12,
  },
  resultVotesLabelWinner: {
    color: 'rgba(255,255,255,0.8)',
  },
  barTrack: {
    alignSelf: 'stretch',
    width: '100%',
    height: 8,
    borderRadius: 5,
    backgroundColor: '#E8EEF2',
    overflow: 'hidden',
  },
  barTrackWinner: {
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  barFillWinner: {
    backgroundColor: '#FFFFFF',
  },
  barFillLoser1: {
    backgroundColor: '#54C0DA',
  },
  barFillLoser2: {
    backgroundColor: '#F07911',
  },
  total: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    marginBottom: 20,
    marginTop: 5,
  },
  shareBtn: {
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#F5A623',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  shareBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  homeLink: {
    paddingVertical: 8,
  },
  homeLinkText: {
    color: '#8AA8B8',
    fontSize: 15,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.92,
  },
});
