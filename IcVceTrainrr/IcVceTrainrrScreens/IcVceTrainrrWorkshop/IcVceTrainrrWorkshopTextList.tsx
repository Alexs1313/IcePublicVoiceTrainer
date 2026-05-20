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

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {
  deleteLibraryText,
  icVceTrainrrGetLibraryTexts,
  type LibraryText,
} from '../../IcVceTrainrrData/IcVceTrainrrTextLibraryStore';
import type {IcVceTrainrrWorkshopStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrWorkshopTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrWorkshopStackParamList, 'IcVceTrainrrWorkshopTextList'>;
type Route = RouteProp<IcVceTrainrrWorkshopStackParamList, 'IcVceTrainrrWorkshopTextList'>;

const IcVceTrainrrWorkshopTextList = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryId, categoryTitle} = route.params;
  const [texts, setTexts] = useState<LibraryText[]>([]);

  const loadTexts = useCallback(async () => {
    const items = await icVceTrainrrGetLibraryTexts(categoryId);
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
            <View style={icVceTrainrrStyles.icVceTrainrrHeaderLeft}>
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
              <View style={icVceTrainrrStyles.icVceTrainrrHeaderTitles}>
                <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>{categoryTitle}</Text>
                <Text style={icVceTrainrrStyles.icVceTrainrrCount}>
                  {texts.length} {texts.length === 1 ? 'text' : 'texts'}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate('IcVceTrainrrWorkshopTextEditor', {
                  categoryId,
                  categoryTitle,
                  mode: 'new',
                })
              }
              style={({pressed}) => [pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
              <LinearGradient
                colors={['#54C0DA', '#6CD0F7']}
                style={icVceTrainrrStyles.icVceTrainrrAddBtn}>
                <Text style={icVceTrainrrStyles.icVceTrainrrAddBtnText}>+ Add</Text>
              </LinearGradient>
            </Pressable>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrList}>
            {texts.map(item => (
              <View key={item.id} style={icVceTrainrrStyles.icVceTrainrrCard}>
                <View
                  style={[
                    icVceTrainrrStyles.icVceTrainrrCardTop,
                    !item.isDefault && icVceTrainrrStyles.icVceTrainrrCardTopCompact,
                  ]}>
                  {item.isDefault ? (
                    <View style={icVceTrainrrStyles.icVceTrainrrBadge}>
                      <Text style={icVceTrainrrStyles.icVceTrainrrBadgeText}>Default</Text>
                    </View>
                  ) : (
                    <Text style={icVceTrainrrStyles.icVceTrainrrCardTitleInline} numberOfLines={1}>
                      {item.title}
                    </Text>
                  )}
                  <View style={icVceTrainrrStyles.icVceTrainrrCardActions}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('IcVceTrainrrWorkshopTextEditor', {
                          categoryId,
                          categoryTitle,
                          mode: 'edit',
                          textId: item.id,
                        })
                      }
                      style={({pressed}) => [
                        icVceTrainrrStyles.icVceTrainrrActionBtn,
                        icVceTrainrrStyles.icVceTrainrrEditBtn,
                        pressed && icVceTrainrrStyles.icVceTrainrrPressed,
                      ]}>
                      <Image
                        source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistredit.png')}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => confirmDelete(item)}
                      style={({pressed}) => [
                        icVceTrainrrStyles.icVceTrainrrActionBtn,
                        icVceTrainrrStyles.icVceTrainrrDeleteBtn,
                        pressed && icVceTrainrrStyles.icVceTrainrrPressed,
                      ]}>
                      <Image
                        source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistrdel.png')}
                      />
                    </Pressable>
                  </View>
                </View>
                {item.isDefault ? (
                  <Text style={icVceTrainrrStyles.icVceTrainrrCardTitle}>{item.title}</Text>
                ) : null}
                <Text style={icVceTrainrrStyles.icVceTrainrrCardPreview} numberOfLines={2}>
                  {item.preview}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrWorkshopTextList;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20,
  },
  icVceTrainrrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 10,
  },
  icVceTrainrrHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icVceTrainrrBackBtn: {
    width: 35,
    height: 35,
    borderRadius: 14,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrHeaderTitles: {
    flex: 1,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  icVceTrainrrCount: {
    color: '#8AA8B8',
    fontSize: 12.162,
    fontWeight: '500',
  },
  icVceTrainrrAddBtn: {
    borderRadius: 14,
    width: 80.021,
    height: 36.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrAddBtnText: {
    color: '#FFFFFF',
    fontSize: 15.129,
    fontWeight: '700',
  },
  icVceTrainrrList: {
    gap: 12,
  },
  icVceTrainrrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22.12,
    padding: 18.13,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.12,
    elevation: 3,
  },
  icVceTrainrrCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10.188,
  },
  icVceTrainrrCardTopCompact: {
    marginBottom: 6.12,
  },
  icVceTrainrrBadge: {
    backgroundColor: '#E8F7FB',
    borderRadius: 10.12,
    paddingHorizontal: 10.12,
    paddingVertical: 4.12,
  },
  icVceTrainrrBadgeText: {
    color: '#54C0DA',
    fontSize: 11.162,
    fontWeight: '700',
  },
  icVceTrainrrCardActions: {
    flexDirection: 'row',
    gap: 8.12,
  },
  icVceTrainrrActionBtn: {
    width: 36.12,
    height: 36,
    borderRadius: 12.162,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrEditBtn: {
    backgroundColor: '#E8F7FB',
  },
  icVceTrainrrDeleteBtn: {
    backgroundColor: 'rgba(107, 138, 158, 0.12)',
  },
  icVceTrainrrEditIcon: {
    color: '#54C0DA',
    fontSize: 16.12,
    fontWeight: '600',
  },
  icVceTrainrrDeleteIcon: {
    fontSize: 16.12,
  },
  icVceTrainrrCardTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 17.17,
    fontWeight: '700',
    marginBottom: 6.12,
  },
  icVceTrainrrCardTitleInline: {
    flex: 1,
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 17.17,
    fontWeight: '700',
    marginRight: 10.12,
  },
  icVceTrainrrCardPreview: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13.162,
    lineHeight: 18,
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
