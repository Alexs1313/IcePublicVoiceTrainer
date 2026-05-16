import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {getTipCategory, type SpeakingTip} from '../../data/tipsData';
import type {TipsStackParamList} from '../../routes/tipsTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<TipsStackParamList, 'TipsCategoryList'>;
type Route = RouteProp<TipsStackParamList, 'TipsCategoryList'>;

const TipCard = ({
  tip,
  categoryTitle,
}: {
  tip: SpeakingTip;
  categoryTitle: string;
}) => {
  const shareTip = async () => {
    try {
      await Share.share({
        message: `${tip.title}\n\n${tip.body}\n\n— ${categoryTitle} · Ice Public Voice Trainer`,
        title: tip.title,
      });
    } catch {
      console.log('Error sharing tip');
    }
  };

  return (
    <View style={styles.tipCard}>
      <View style={styles.tipTop}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View style={styles.tipBadge}>
            <Text style={styles.tipBadgeText}>#{tip.number}</Text>
          </View>

          <Text style={styles.tipTitle}>{tip.title}</Text>
        </View>
        <Pressable
          onPress={shareTip}
          style={({pressed}) => [styles.shareBtn, pressed && styles.pressed]}>
          <Image
            source={require('../../assets/images/pblicvcetraistshr.png')}
            style={{width: 13, height: 13}}
          />
        </Pressable>
      </View>

      <Text style={styles.tipBody}>{tip.body}</Text>
    </View>
  );
};

const TipsCategoryList = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const category = useMemo(
    () => getTipCategory(route.params.categoryId),
    [route.params.categoryId],
  );

  if (!category) {
    return null;
  }

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
            <View style={styles.headerTitles}>
              <View style={styles.titleRow}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.heading}>{category.title}</Text>
              </View>
              <Text style={styles.count}>
                {category.tips.length}{' '}
                {category.tips.length === 1 ? 'tip' : 'tips'}
              </Text>
            </View>
          </View>

          <View style={styles.list}>
            {category.tips.map(tip => (
              <TipCard key={tip.id} tip={tip} categoryTitle={category.title} />
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default TipsCategoryList;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  backBtn: {
    width: 35,
    height: 35,
    borderRadius: 14,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  categoryIcon: {
    fontSize: 22,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 20,
    fontWeight: '700',
  },
  count: {
    color: '#8AA8B8',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  list: {
    gap: 12,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  tipTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tipBadge: {
    backgroundColor: '#E8F7FB',
    borderRadius: 14,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipBadgeText: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 12,
    fontWeight: '700',
  },
  shareBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(107, 138, 158, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: pblicvcepromptrMuted,
    fontSize: 18,
    fontWeight: '600',
  },
  tipTitle: {
    color: pblicvcepromptrTitle,
    fontSize: 17,
    fontWeight: '700',
  },
  tipBody: {
    color: pblicvcepromptrMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.92,
  },
});
