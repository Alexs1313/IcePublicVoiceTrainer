import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {TIP_CATEGORIES, type TipCategory} from '../../data/tipsData';
import type {TipsStackParamList} from '../../routes/tipsTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<TipsStackParamList, 'TipsHome'>;

const CategoryRow = ({
  item,
  onPress,
}: {
  item: TipCategory;
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
      <Text style={styles.cardCount}>
        {item.tips.length} {item.tips.length === 1 ? 'tip' : 'tips'}
      </Text>
    </View>
    <Image source={require('../../assets/images/pblicvcetraifarr.png')} />
  </Pressable>
);

const TipsHome = () => {
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
          <Text style={styles.overline}>TIPS</Text>
          <Text style={styles.heading}>Speaking Tips</Text>
          <Text style={styles.subtitle}>
            Curated advice to sharpen your oratory skills.
          </Text>

          <Pressable
            onPress={() => navigation.navigate('TipsRandom')}
            style={({pressed}) => [pressed && styles.cardPressed]}>
            <LinearGradient
              colors={['#E4AD1B', '#F07911']}
              style={styles.randomBtn}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: 16,
                }}>
                <View style={styles.randomIconWrap}>
                  <Image
                    source={require('../../assets/images/pblicvcetrrand.png')}
                  />
                </View>
                <View style={styles.randomTextWrap}>
                  <Text style={styles.randomTitle}>Random Tip</Text>
                  <Text style={styles.randomSubtitle}>
                    Get surprised by a random insight
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>

          <Text style={styles.sectionLabel}>Browse by Category</Text>

          <View style={styles.cards}>
            {TIP_CATEGORIES.map(item => (
              <CategoryRow
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.navigate('TipsCategoryList', {
                    categoryId: item.id,
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

export default TipsHome;

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
    marginTop: 14.161,
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
  randomBtn: {
    borderRadius: 22.12,
    minHeight: 90,
    marginBottom: 22.12,
    shadowColor: '#F5A623',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 12.12,
    elevation: 4,

    justifyContent: 'center',
  },
  randomIconWrap: {
    width: 55.131,
    height: 55.137,
    borderRadius: 16.12,
    backgroundColor: '#FFFFFF33',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14.162,
  },
  randomIcon: {
    color: '#FFFFFF',
    fontSize: 22.191,
    fontWeight: '700',
  },
  randomTextWrap: {
    flex: 1,
  },
  randomTitle: {
    color: '#FFFFFF',
    fontSize: 18.129,
    fontWeight: '800',
    marginBottom: 4.12,
  },
  randomSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13.15,
    lineHeight: 18,
  },
  sectionLabel: {
    color: pblicvcepromptrMuted,
    fontSize: 15.129,
    fontWeight: '600',
    marginBottom: 14.162,
  },
  cards: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22.12,
    padding: 16.12,
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
    borderRadius: 16.022,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14.52,
  },
  cardIconText: {
    fontSize: 26.213,
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
    marginBottom: 4,
  },
  cardCount: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 13,
    fontWeight: '600',
  },
});
