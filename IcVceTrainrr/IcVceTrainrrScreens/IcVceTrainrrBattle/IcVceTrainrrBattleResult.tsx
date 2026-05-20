import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import type {IcVceTrainrrBattleStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBattleTypes';
import {icVceTrainrrBATTLE_ORANGE_GRADIENT} from '../../IcVceTrainrrTheme/IcVceTrainrrBattleTheme';
import {
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattleResult'>;
type Route = RouteProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattleResult'>;

const IcVceTrainrrVoteBar = ({
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
    <View style={[icVceTrainrrStyles.icVceTrainrrBarTrack, isWinner && icVceTrainrrStyles.icVceTrainrrBarTrackWinner]}>
      <View
        style={[
          icVceTrainrrStyles.icVceTrainrrBarFill,
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

const IcVceTrainrrBattleResult = () => {
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
        routes: [{name: 'IcVceTrainrrBattleHome'}],
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
          <View style={icVceTrainrrStyles.icVceTrainrrHero}>
            <LinearGradient
              colors={[...icVceTrainrrBATTLE_ORANGE_GRADIENT]}
              style={icVceTrainrrStyles.icVceTrainrrHeroIcon}>
              <Image source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetck.png')} />
            </LinearGradient>
            <Text style={icVceTrainrrStyles.icVceTrainrrOverline}>BATTLE RESULTS</Text>
            <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>{winnerName} Wins! 🏆</Text>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrCardsRow}>
            <View
              style={[
                icVceTrainrrStyles.icVceTrainrrResultCard,
                player1Wins ? icVceTrainrrStyles.icVceTrainrrResultCardWinner : icVceTrainrrStyles.icVceTrainrrResultCardLoser,
              ]}>
              {player1Wins ? <Text style={icVceTrainrrStyles.icVceTrainrrCrown}>👑</Text> : null}
              <Text style={icVceTrainrrStyles.icVceTrainrrResultNameIcon}>🟦</Text>
              <Text
                style={[
                  icVceTrainrrStyles.icVceTrainrrResultName,
                  player1Wins && icVceTrainrrStyles.icVceTrainrrResultNameWinner,
                ]}>
                {player1Name}
              </Text>
              <Text
                style={[
                  icVceTrainrrStyles.icVceTrainrrResultScore,
                  player1Wins
                    ? icVceTrainrrStyles.icVceTrainrrResultScoreWinner
                    : icVceTrainrrStyles.icVceTrainrrResultScoreLoser,
                ]}>
                {player1Votes}
              </Text>
              <Text
                style={[
                  icVceTrainrrStyles.icVceTrainrrResultVotesLabel,
                  player1Wins && icVceTrainrrStyles.icVceTrainrrResultVotesLabelWinner,
                ]}>
                votes
              </Text>
              <IcVceTrainrrVoteBar
                votes={player1Votes}
                totalVotes={totalVotes}
                isWinner={player1Wins}
                fillStyle={
                  player1Wins ? icVceTrainrrStyles.icVceTrainrrBarFillWinner : icVceTrainrrStyles.icVceTrainrrBarFillLoser1
                }
              />
            </View>

            <View
              style={[
                icVceTrainrrStyles.icVceTrainrrResultCard,
                !player1Wins ? icVceTrainrrStyles.icVceTrainrrResultCardWinner : icVceTrainrrStyles.icVceTrainrrResultCardLoser,
              ]}>
              {!player1Wins ? <Text style={icVceTrainrrStyles.icVceTrainrrCrown}>👑</Text> : null}

              <Text style={icVceTrainrrStyles.icVceTrainrrResultNameIcon}>🟥</Text>
              <Text style={icVceTrainrrStyles.icVceTrainrrResultName}>{player2Name}</Text>

              <Text
                style={[
                  icVceTrainrrStyles.icVceTrainrrResultScore,
                  !player1Wins
                    ? icVceTrainrrStyles.icVceTrainrrResultScoreWinner
                    : icVceTrainrrStyles.icVceTrainrrResultScoreLoser,
                ]}>
                {player2Votes}
              </Text>
              <Text
                style={[
                  icVceTrainrrStyles.icVceTrainrrResultVotesLabel,
                  !player1Wins && icVceTrainrrStyles.icVceTrainrrResultVotesLabelWinner,
                ]}>
                votes
              </Text>
              <IcVceTrainrrVoteBar
                votes={player2Votes}
                totalVotes={totalVotes}
                isWinner={!player1Wins}
                fillStyle={
                  !player1Wins ? icVceTrainrrStyles.icVceTrainrrBarFillWinner : icVceTrainrrStyles.icVceTrainrrBarFillLoser2
                }
              />
            </View>
          </View>

          <Text style={icVceTrainrrStyles.icVceTrainrrTotal}>{totalVotes} total votes cast</Text>

          <Pressable
            onPress={shareResult}
            style={{width: '100%', marginTop: 10}}>
            <LinearGradient
              colors={[...icVceTrainrrBATTLE_ORANGE_GRADIENT]}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={icVceTrainrrStyles.icVceTrainrrShareBtn}>
              <Text style={icVceTrainrrStyles.icVceTrainrrShareBtnText}>Share</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={goHome} style={icVceTrainrrStyles.icVceTrainrrHomeLink}>
            <Text style={icVceTrainrrStyles.icVceTrainrrHomeLinkText}>Go to Home</Text>
          </Pressable>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrBattleResult;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.12,
    alignItems: 'center',
  },
  icVceTrainrrHero: {
    alignItems: 'center',
    marginBottom: 20.12,
  },
  icVceTrainrrHeroIcon: {
    width: 72.12,
    height: 72.12,
    borderRadius: 20.162,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12.162,
  },
  icVceTrainrrHeroEmoji: {
    fontSize: 32.162,
  },
  icVceTrainrrOverline: {
    color: '#F5A623',
    fontSize: 13.162,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 6.162,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 26.121,
    fontWeight: '800',
    textAlign: 'center',
  },
  icVceTrainrrCardsRow: {
    flexDirection: 'row',
    gap: 12.162,
    width: '100%',
    marginBottom: 12.162,
    marginTop: 10,
  },
  icVceTrainrrResultCard: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
    minHeight: 240,
    justifyContent: 'center',
  },
  icVceTrainrrResultCardWinner: {
    backgroundColor: '#54C0DA',
  },
  icVceTrainrrResultCardLoser: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.162,
    elevation: 3,
  },
  icVceTrainrrCrown: {
    fontSize: 18.162,
    marginBottom: 6.162,
  },
  icVceTrainrrResultDot: {
    width: 18.162,
    height: 18.162,
    borderRadius: 6.162,
    marginBottom: 8,
  },
  icVceTrainrrResultName: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 15.162,
    fontWeight: '700',
    marginBottom: 6.52,
    textAlign: 'center',
  },
  icVceTrainrrResultNameWinner: {
    color: '#FFFFFF',
  },
  icVceTrainrrResultNameIcon: {
    fontSize: 24.14,
    marginBottom: 6.22,
  },
  icVceTrainrrResultScore: {
    fontSize: 36.12,
    fontWeight: '800',
    marginBottom: 2,
  },
  icVceTrainrrResultScoreWinner: {
    color: '#FFFFFF',
  },
  icVceTrainrrResultScoreLoser: {
    color: '#F5A623',
  },
  icVceTrainrrResultVotesLabel: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 12,
    marginBottom: 12,
  },
  icVceTrainrrResultVotesLabelWinner: {
    color: 'rgba(255,255,255,0.8)',
  },
  icVceTrainrrBarTrack: {
    alignSelf: 'stretch',
    width: '100%',
    height: 8,
    borderRadius: 5.09,
    backgroundColor: '#E8EEF2',
    overflow: 'hidden',
  },
  icVceTrainrrBarTrackWinner: {
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  icVceTrainrrBarFill: {
    height: '100%',
    borderRadius: 5.04,
  },
  icVceTrainrrBarFillWinner: {
    backgroundColor: '#FFFFFF',
  },
  icVceTrainrrBarFillLoser1: {
    backgroundColor: '#54C0DA',
  },
  icVceTrainrrBarFillLoser2: {
    backgroundColor: '#F07911',
  },
  icVceTrainrrTotal: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    marginBottom: 20.162,
    marginTop: 5,
  },
  icVceTrainrrShareBtn: {
    borderRadius: 16.17,
    height: 56.14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14.162,
    shadowColor: '#F5A623',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 12.16,
    elevation: 4,
  },
  icVceTrainrrShareBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  icVceTrainrrHomeLink: {
    paddingVertical: 8,
  },
  icVceTrainrrHomeLinkText: {
    color: '#8AA8B8',
    fontSize: 15,
    fontWeight: '500',
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
