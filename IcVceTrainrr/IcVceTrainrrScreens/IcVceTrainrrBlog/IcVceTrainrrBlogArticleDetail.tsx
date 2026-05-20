import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {icVceTrainrrGetBlogArticle} from '../../IcVceTrainrrData/IcVceTrainrrBlogArticles';
import {
  isBlogFavorite,
  toggleBlogFavorite,
} from '../../IcVceTrainrrData/IcVceTrainrrBlogFavoritesStore';
import type {IcVceTrainrrBlogStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBlogTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrBlogStackParamList, 'IcVceTrainrrBlogArticleDetail'>;
type Route = RouteProp<IcVceTrainrrBlogStackParamList, 'IcVceTrainrrBlogArticleDetail'>;

const IcVceTrainrrBlogArticleDetail = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const article = useMemo(
    () => icVceTrainrrGetBlogArticle(route.params.articleId),
    [route.params.articleId],
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const loadFavorite = useCallback(async () => {
    if (!article) {
      return;
    }
    const fav = await isBlogFavorite(article.id);
    setIsFavorite(fav);
  }, [article]);

  useFocusEffect(
    useCallback(() => {
      loadFavorite();
    }, [loadFavorite]),
  );

  if (!article) {
    return null;
  }

  const shareArticle = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.lead}\n\nIce Public Voice Trainer`,
        title: article.title,
      });
    } catch {
      console.log('Error sharing article');
    }
  };

  const handleToggleFavorite = async () => {
    const next = await toggleBlogFavorite(article.id);
    setIsFavorite(next);
  };

  return (
    <View style={icVceTrainrrStyles.icVceTrainrrRoot}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          icVceTrainrrStyles.icVceTrainrrScrollContent,
          {
            paddingTop: Math.max(insets.top, 52),
            paddingBottom: 24 + insets.bottom,
          },
        ]}>
        <IcVceTrainrrPromptrStreakHeader showDivider={false} />

        <View style={icVceTrainrrStyles.icVceTrainrrBody}>
          <View style={icVceTrainrrStyles.icVceTrainrrToolbar}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => [
                icVceTrainrrStyles.icVceTrainrrToolBtn,
                pressed && icVceTrainrrStyles.icVceTrainrrPressed,
                {backgroundColor: '#54C0DA1A'},
              ]}>
              <Image
                source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraiback.png')}
              />
            </Pressable>

            <View style={icVceTrainrrStyles.icVceTrainrrToolbarActions}>
              <Pressable
                onPress={shareArticle}
                style={({pressed}) => [
                  icVceTrainrrStyles.icVceTrainrrToolBtn,
                  pressed && icVceTrainrrStyles.icVceTrainrrPressed,
                ]}>
                <Image
                  source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistshr.png')}
                />
              </Pressable>
              <Pressable
                onPress={handleToggleFavorite}
                style={({pressed}) => [
                  icVceTrainrrStyles.icVceTrainrrToolBtn,
                  isFavorite && icVceTrainrrStyles.icVceTrainrrToolBtnFav,
                  pressed && icVceTrainrrStyles.icVceTrainrrPressed,
                ]}>
                <Image
                  source={
                    isFavorite
                      ? require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistreliked.png')
                      : require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistlike.png')
                  }
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 12,
              marginBottom: 8,
            }}>
            <Image source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetratim.png')} />
            <Text style={icVceTrainrrStyles.icVceTrainrrMeta}>
              {article.readMinutes} min read · {article.dateLabel}
            </Text>
          </View>
          <Text style={icVceTrainrrStyles.icVceTrainrrTitle}>{article.title}</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrLead}>{article.lead}</Text>

          <View style={icVceTrainrrStyles.icVceTrainrrDivider} />

          {article.body.map((paragraph, index) => (
            <Text key={index} style={icVceTrainrrStyles.icVceTrainrrParagraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default IcVceTrainrrBlogArticleDetail;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrRoot: {
    flex: 1,
    backgroundColor: '#DFF9FF',
  },
  icVceTrainrrScrollContent: {
    flexGrow: 1,
  },
  icVceTrainrrBody: {
    paddingHorizontal: 20.332,
  },
  icVceTrainrrToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16.162,
  },
  icVceTrainrrToolbarActions: {
    flexDirection: 'row',
    gap: 10,
  },
  icVceTrainrrToolBtn: {
    width: 36.612,
    height: 36.612,
    borderRadius: 14,
    backgroundColor: '#0000000D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrToolBtnFav: {
    backgroundColor: '#FFF0E0',
  },
  icVceTrainrrShareIcon: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 18.162,
    fontWeight: '600',
  },
  icVceTrainrrFavIcon: {
    fontSize: 18.332,
    color: icVceTrainrrPblicvcepromptrMuted,
  },
  icVceTrainrrFavIconActive: {
    color: '#F5A623',
  },
  icVceTrainrrMeta: {
    color: '#8AA8B8',
    fontSize: 13.162,
    fontWeight: '400',
  },
  icVceTrainrrTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 24.121,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 12.162,
  },
  icVceTrainrrLead: {
    color: '#54C0DA',
    fontSize: 15.129,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 16.55,
  },
  icVceTrainrrDivider: {
    height: 1,
    backgroundColor: '#6CD0F740',
    marginBottom: 18.12,
  },
  icVceTrainrrParagraph: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 15.129,
    lineHeight: 24,
    marginBottom: 16.128,
  },
  icVceTrainrrPressed: {
    opacity: 0.9,
  },
});
