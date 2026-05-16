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

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import type {BattleStackParamList} from '../../routes/battleTypes';
import {BATTLE_ORANGE_GRADIENT} from '../../theme/battleTheme';
import {pblicvcepromptrTitle} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<BattleStackParamList, 'BattleEnterPlayers'>;

const BattleEnterPlayers = () => {
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
    navigation.navigate('BattleSettings', {
      player1Name: player1.trim(),
      player2Name: player2.trim(),
    });
  };

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
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => [
                styles.backBtn,
                pressed && styles.pressed,
              ]}>
              <Image
                source={require('../../assets/images/pblicvcetraiback.png')}
              />
            </Pressable>
            <View>
              <Text style={styles.heading}>Enter Players</Text>
              <Text style={styles.subtitle}>
                Two unique player names required
              </Text>
            </View>
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>🟦{`  `}Player 1</Text>
            </View>
            <TextInput
              value={player1}
              onChangeText={setPlayer1}
              placeholder="Player 1 name..."
              placeholderTextColor="#A8BEC9"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>🟥{`  `}Player 2</Text>
            </View>
            <TextInput
              value={player2}
              onChangeText={setPlayer2}
              placeholder="Player 2 name..."
              placeholderTextColor="#A8BEC9"
              style={styles.input}
            />
          </View>

          <View style={styles.infoBox}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
              }}>
              <Image source={require('../../assets/images/pblicvcetrlg.png')} />
              <Text style={styles.infoTitle}>How it works</Text>
            </View>
            <Text style={styles.infoText}>
              Each player will read the same text aloud. After both finish, the
              audience votes for their favorite speaker. The player with the
              most votes wins!
            </Text>
          </View>

          <Pressable
            onPress={continueToSettings}
            disabled={!canContinue}
            style={({pressed}) => [pressed && canContinue && styles.pressed]}>
            {canContinue ? (
              <LinearGradient
                colors={[...BATTLE_ORANGE_GRADIENT]}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.cta}>
                <Text style={styles.ctaText}>Continue →</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.cta, styles.ctaDisabled]}>
                <Text style={styles.ctaTextDisabled}>Continue →</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default BattleEnterPlayers;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
  },
  backBtn: {
    width: 35,
    height: 35,
    borderRadius: 14,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    color: '#8AA8B8',
    fontSize: 12,
    fontWeight: '400',
  },
  field: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
  },
  label: {
    color: '#4A6A7A',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#54C0DA40',
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 15,
    color: pblicvcepromptrTitle,
  },
  infoBox: {
    backgroundColor: '#E4AD1B14',
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E4AD1B33',
  },
  infoTitle: {
    color: '#C98A00',
    fontSize: 14,
    fontWeight: '700',
  },
  infoText: {
    color: '#8A6A2A',
    fontSize: 13,
    lineHeight: 20,
  },
  cta: {
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDisabled: {
    backgroundColor: '#D4DEE5',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  ctaTextDisabled: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    opacity: 0.85,
  },
  pressed: {
    opacity: 0.92,
  },
});
