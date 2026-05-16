import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {getLibraryTexts} from '../../data/textLibraryStore';
import type {PromptrText} from '../../data/promptrTexts';
import type {PromptrStackParamList} from '../../routes/promptrTypes';
import {
  pblicvcepromptrAccent,
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';
import LinearGradient from 'react-native-linear-gradient';

type Nav = StackNavigationProp<PromptrStackParamList, 'PromptrTextList'>;
type Route = RouteProp<PromptrStackParamList, 'PromptrTextList'>;

const PromptrTextList = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryId, categoryTitle} = route.params;
  const [texts, setTexts] = useState<PromptrText[]>([]);

  const loadTexts = useCallback(async () => {
    const items = await getLibraryTexts(categoryId);
    setTexts(items);
  }, [categoryId]);

  useFocusEffect(
    useCallback(() => {
      loadTexts();
    }, [loadTexts]),
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
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
              <Text style={styles.heading}>{categoryTitle}</Text>
              <Text style={styles.count}>{texts.length} texts available</Text>
            </View>
          </View>

          <View style={styles.list}>
            {texts.map(item => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate('PromptrDifficulty', {
                    categoryId,
                    categoryTitle,
                    textId: item.id,
                    textTitle: item.title,
                    textBody: item.body,
                  })
                }
                style={({pressed}) => [styles.card, pressed && styles.pressed]}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Default</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardPreview} numberOfLines={2}>
                  {item.preview}
                </Text>
                <LinearGradient
                  colors={['#54C0DA', '#54C0DA99']}
                  style={styles.playBtn}>
                  <Image
                    source={require('../../assets/images/pblicvcetraistrt.png')}
                  />
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default PromptrTextList;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 35,
    height: 35,
    borderRadius: 14,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  backIcon: {
    color: pblicvcepromptrTitle,
    fontSize: 28,
    fontWeight: '600',
    marginTop: -2,
    marginLeft: -2,
  },
  heading: {
    color: '#1C2B3A',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  count: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 18,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    paddingRight: 64,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F7FB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    color: '#54C0DA',
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: {
    color: pblicvcepromptrTitle,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardPreview: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  playBtn: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -22,
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: pblicvcepromptrAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 3,
  },
  pressed: {
    opacity: 0.92,
  },
});
