import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {getLibraryTexts} from '../../data/textLibraryStore';
import {
  PROMPTR_CATEGORIES,
  type PromptrCategory,
  type PromptrCategoryId,
} from '../../data/promptrTexts';
import type {WorkshopStackParamList} from '../../routes/workshopTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<WorkshopStackParamList, 'WorkshopHome'>;

const CategoryRow = ({
  item,
  count,
  onPress,
}: {
  item: PromptrCategory;
  count: number;
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
      <Text style={styles.cardDesc}>
        {count} {count === 1 ? 'text' : 'texts'}
      </Text>
    </View>
    <Image source={require('../../assets/images/pblicvcetraifarr.png')} />
  </Pressable>
);

const WorkshopHome = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [counts, setCounts] = useState<Record<PromptrCategoryId, number>>({
    'public-speaking': 0,
    diction: 0,
    storytelling: 0,
  });

  const loadCounts = useCallback(async () => {
    const next = {} as Record<PromptrCategoryId, number>;
    await Promise.all(
      PROMPTR_CATEGORIES.map(async category => {
        const texts = await getLibraryTexts(category.id);
        next[category.id] = texts.length;
      }),
    );
    setCounts(next);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCounts();
    }, [loadCounts]),
  );

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
          <Text style={styles.overline}>WORKSHOP</Text>
          <Text style={styles.heading}>Text Library</Text>
          <Text style={styles.subtitle}>
            Browse, edit, and create your own practice texts.
          </Text>

          <View style={styles.cards}>
            {PROMPTR_CATEGORIES.map(item => (
              <CategoryRow
                key={item.id}
                item={item}
                count={counts[item.id]}
                onPress={() =>
                  navigation.navigate('WorkshopTextList', {
                    categoryId: item.id,
                    categoryTitle: item.title,
                  })
                }
              />
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default WorkshopHome;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
  },
  overline: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.4,
    marginBottom: 6,
    marginTop: 14,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: pblicvcepromptrMuted,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 20,
  },
  cards: {
    gap: 12,
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
    shadowRadius: 12,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.92,
  },
  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIconText: {
    fontSize: 26,
  },
  cardBody: {
    flex: 1,
    paddingRight: 8,
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
});
