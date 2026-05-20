import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import type {IcVceTrainrrBattleStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBattleTypes';
import {icVceTrainrrBATTLE_ORANGE_GRADIENT} from '../../IcVceTrainrrTheme/IcVceTrainrrBattleTheme';
import {icVceTrainrrPblicvcepromptrTitle} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<
  IcVceTrainrrBattleStackParamList,
  'IcVceTrainrrBattleEnterPlayers'
>;

const IcVceTrainrrBattleEnterPlayers = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const canContinue = useMemo(() => {
    const a = player1.trim();
    const b = player2.trim();
    return a.length > 0 && b.length > 0 && a.toLowerCase() !== b.toLowerCase();
  }, [player1, player2]);

  const continueToSettings = () => {
    if (!canContinue) {
      return;
    }
    navigation.navigate('IcVceTrainrrBattleSettings', {
      player1Name: player1.trim(),
      player2Name: player2.trim(),
    });
  };

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
          <View style={icVceTrainrrStyles.icVceTrainrrHeaderRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => [
                icVceTrainrrStyles.icVceTrainrrBackBtn,
                pressed && icVceTrainrrStyles.icVceTrainrrPressed,
              ]}>
              <Image
                source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraiback.png')}
              />
            </Pressable>
            <View>
              <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>
                Enter Speakers
              </Text>
              <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
                Two unique speaker names required
              </Text>
            </View>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrField}>
            <View style={icVceTrainrrStyles.icVceTrainrrLabelRow}>
              <Text style={icVceTrainrrStyles.icVceTrainrrLabel}>
                🟦{`  `}Speaker 1
              </Text>
            </View>
            <TextInput
              value={player1}
              onChangeText={setPlayer1}
              placeholder="Speaker 1 name..."
              placeholderTextColor="#A8BEC9"
              style={icVceTrainrrStyles.icVceTrainrrInput}
            />
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrField}>
            <View style={icVceTrainrrStyles.icVceTrainrrLabelRow}>
              <Text style={icVceTrainrrStyles.icVceTrainrrLabel}>
                🟥{`  `}Speaker 2
              </Text>
            </View>
            <TextInput
              value={player2}
              onChangeText={setPlayer2}
              placeholder="Speaker 2 name..."
              placeholderTextColor="#A8BEC9"
              style={icVceTrainrrStyles.icVceTrainrrInput}
            />
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrInfoBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
              }}>
              <Image
                source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrlg.png')}
              />
              <Text style={icVceTrainrrStyles.icVceTrainrrInfoTitle}>
                How it works
              </Text>
            </View>
            <Text style={icVceTrainrrStyles.icVceTrainrrInfoText}>
              Each speaker will read the same text aloud. After both finish, the
              audience votes for their favorite speaker. The player with the
              most votes wins!
            </Text>
          </View>

          <Pressable
            onPress={continueToSettings}
            disabled={!canContinue}
            style={({pressed}) => [
              pressed && canContinue && icVceTrainrrStyles.icVceTrainrrPressed,
            ]}>
            {canContinue ? (
              <LinearGradient
                colors={[...icVceTrainrrBATTLE_ORANGE_GRADIENT]}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={icVceTrainrrStyles.icVceTrainrrCta}>
                <Text style={icVceTrainrrStyles.icVceTrainrrCtaText}>
                  Continue →
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={[
                  icVceTrainrrStyles.icVceTrainrrCta,
                  icVceTrainrrStyles.icVceTrainrrCtaDisabled,
                ]}>
                <Text style={icVceTrainrrStyles.icVceTrainrrCtaTextDisabled}>
                  Continue →
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrBattleEnterPlayers;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.12,
  },
  icVceTrainrrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22.52,
  },
  icVceTrainrrBackBtn: {
    width: 35.12,
    height: 35.12,
    borderRadius: 14,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 20.12,
    fontWeight: '700',
    marginBottom: 2,
  },
  icVceTrainrrSubtitle: {
    color: '#8AA8B8',
    fontSize: 12.12,
    fontWeight: '400',
  },
  icVceTrainrrField: {
    marginBottom: 16.12,
  },
  icVceTrainrrLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  colorDot: {
    width: 12.1112,
    height: 12.1112,
    borderRadius: 4,
  },
  icVceTrainrrLabel: {
    color: '#4A6A7A',
    fontSize: 14.12,
    fontWeight: '600',
  },
  icVceTrainrrInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#54C0DA40',
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: icVceTrainrrPblicvcepromptrTitle,
  },
  icVceTrainrrInfoBox: {
    backgroundColor: '#E4AD1B14',
    borderRadius: 16.12,
    padding: 16.12,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E4AD1B33',
  },
  icVceTrainrrInfoTitle: {
    color: '#C98A00',
    fontSize: 14.12,
    fontWeight: '700',
  },
  icVceTrainrrInfoText: {
    color: '#8A6A2A',
    fontSize: 13.15,
    lineHeight: 20,
  },
  icVceTrainrrCta: {
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrCtaDisabled: {
    backgroundColor: '#D4DEE5',
  },
  icVceTrainrrCtaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  icVceTrainrrCtaTextDisabled: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    opacity: 0.85,
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
