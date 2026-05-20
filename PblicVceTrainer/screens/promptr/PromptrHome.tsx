import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {
  PROMPTR_CATEGORIES,
  type PromptrCategory,
} from '../../data/promptrTexts';
import type {PromptrStackParamList} from '../../routes/promptrTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<PromptrStackParamList, 'PromptrHome'>;

const CategoryRow = ({
  item,
  onPress,
}: {
  item: PromptrCategory;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
    <View style={[styles.cardIcon, {backgroundColor: item.iconBg}]}>
      <Text style={styles.cardIconText}>{item.icon}</Text>
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
    </View>
    <Image source={require('../../assets/images/pblicvcetraifarr.png')} />
  </Pressable>
);

const PromptrHome = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

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
          <Text style={styles.overline}>TELEPROMPTER</Text>
          <Text style={styles.heading}>Choose Category</Text>
          <Text style={styles.subtitle}>
            Select a text type to begin your practice session.
          </Text>

          <View style={styles.cards}>
            {PROMPTR_CATEGORIES.map(item => (
              <CategoryRow
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.navigate('PromptrTextList', {
                    categoryId: item.id,
                    categoryTitle: item.title,
                  })
                }
              />
            ))}
          </View>

          <View style={styles.tip}>
            <Text style={styles.tipText}>
              💡 Tip: Start with{' '}
              <Text style={styles.tipHighlight}>Diction Practice</Text> to warm
              up your articulation
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default PromptrHome;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20.332,
  },
  overline: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 13.162,
    fontWeight: '600',
    letterSpacing: 1.4,
    marginBottom: 6.12,
    marginTop: 14,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 28.01,
    fontWeight: '800',
    marginBottom: 8.133,
  },
  subtitle: {
    color: pblicvcepromptrMuted,
    fontSize: 15.229,
    lineHeight: 21,
    marginBottom: 20.12,
  },
  cards: {
    gap: 12.021,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.12,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.92,
  },
  cardIcon: {
    width: 64.021,
    height: 64.021,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14.021,
  },
  cardIconText: {
    fontSize: 26.213,
  },
  cardBody: {
    flex: 1,
    paddingRight: 8.021,
  },
  cardTitle: {
    color: pblicvcepromptrTitle,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  tip: {
    marginTop: 18,
    backgroundColor: '#54C0DA14',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#54C0DA26',
  },
  tipText: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  tipHighlight: {
    fontWeight: '700',
  },
});
