import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {
  deleteLibraryText,
  getLibraryTexts,
  type LibraryText,
} from '../../data/textLibraryStore';
import type {WorkshopStackParamList} from '../../routes/workshopTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<WorkshopStackParamList, 'WorkshopTextList'>;
type Route = RouteProp<WorkshopStackParamList, 'WorkshopTextList'>;

const WorkshopTextList = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryId, categoryTitle} = route.params;
  const [texts, setTexts] = useState<LibraryText[]>([]);

  const loadTexts = useCallback(async () => {
    const items = await getLibraryTexts(categoryId);
    setTexts(items);
  }, [categoryId]);

  useFocusEffect(
    useCallback(() => {
      loadTexts();
    }, [loadTexts]),
  );

  const confirmDelete = (item: LibraryText) => {
    Alert.alert('Delete text', `Remove "${item.title}" from your library?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteLibraryText(categoryId, item.id);
          loadTexts();
        },
      },
    ]);
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
            <View style={styles.headerLeft}>
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
                <Text style={styles.heading}>{categoryTitle}</Text>
                <Text style={styles.count}>
                  {texts.length} {texts.length === 1 ? 'text' : 'texts'}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate('WorkshopTextEditor', {
                  categoryId,
                  categoryTitle,
                  mode: 'new',
                })
              }
              style={({pressed}) => [pressed && styles.pressed]}>
              <LinearGradient
                colors={['#54C0DA', '#6CD0F7']}
                style={styles.addBtn}>
                <Text style={styles.addBtnText}>+ Add</Text>
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.list}>
            {texts.map(item => (
              <View key={item.id} style={styles.card}>
                <View
                  style={[
                    styles.cardTop,
                    !item.isDefault && styles.cardTopCompact,
                  ]}>
                  {item.isDefault ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>Default</Text>
                    </View>
                  ) : (
                    <Text style={styles.cardTitleInline} numberOfLines={1}>
                      {item.title}
                    </Text>
                  )}
                  <View style={styles.cardActions}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('WorkshopTextEditor', {
                          categoryId,
                          categoryTitle,
                          mode: 'edit',
                          textId: item.id,
                        })
                      }
                      style={({pressed}) => [
                        styles.actionBtn,
                        styles.editBtn,
                        pressed && styles.pressed,
                      ]}>
                      <Image
                        source={require('../../assets/images/pblicvcetraistredit.png')}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => confirmDelete(item)}
                      style={({pressed}) => [
                        styles.actionBtn,
                        styles.deleteBtn,
                        pressed && styles.pressed,
                      ]}>
                      <Image
                        source={require('../../assets/images/pblicvcetraistrdel.png')}
                      />
                    </Pressable>
                  </View>
                </View>
                {item.isDefault ? (
                  <Text style={styles.cardTitle}>{item.title}</Text>
                ) : null}
                <Text style={styles.cardPreview} numberOfLines={2}>
                  {item.preview}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default WorkshopTextList;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 10,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  count: {
    color: '#8AA8B8',
    fontSize: 12,
    fontWeight: '500',
  },
  addBtn: {
    borderRadius: 14,
    width: 80,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTopCompact: {
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#E8F7FB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#54C0DA',
    fontSize: 11,
    fontWeight: '700',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    backgroundColor: '#E8F7FB',
  },
  deleteBtn: {
    backgroundColor: 'rgba(107, 138, 158, 0.12)',
  },
  editIcon: {
    color: '#54C0DA',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteIcon: {
    fontSize: 16,
  },
  cardTitle: {
    color: pblicvcepromptrTitle,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardTitleInline: {
    flex: 1,
    color: pblicvcepromptrTitle,
    fontSize: 17,
    fontWeight: '700',
    marginRight: 10,
  },
  cardPreview: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.92,
  },
});
