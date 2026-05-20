import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrBlogArticleCard from '../../IcVceTrainrrComponents/IcVceTrainrrBlog/IcVceTrainrrBlogArticleCard';
import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {icVceTrainrrBLOG_ARTICLES, type BlogArticle} from '../../IcVceTrainrrData/IcVceTrainrrBlogArticles';
import {
  loadBlogFavorites,
  toggleBlogFavorite,
} from '../../IcVceTrainrrData/IcVceTrainrrBlogFavoritesStore';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

const IcVceTrainrrBlogHome = () => {
  const insets = useSafeAreaInsets();
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = useCallback(async () => {
    const ids = await loadBlogFavorites();
    setFavorites(ids);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const favoriteArticles = useMemo(
    () => icVceTrainrrBLOG_ARTICLES.filter(article => favorites.includes(article.id)),
    [favorites],
  );

  const otherArticles = useMemo(
    () => icVceTrainrrBLOG_ARTICLES.filter(article => !favorites.includes(article.id)),
    [favorites],
  );

  const handleToggleFavorite = async (articleId: string) => {
    await toggleBlogFavorite(articleId);
    await loadFavorites();
  };

  const renderCard = (article: BlogArticle) => (
    <IcVceTrainrrBlogArticleCard
      key={article.id}
      article={article}
      isFavorite={favorites.includes(article.id)}
      onToggleFavorite={() => handleToggleFavorite(article.id)}
    />
  );

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
          <Text style={icVceTrainrrStyles.icVceTrainrrOverline}>BLOG</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>Oratory Insights</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
            Expert articles to level up your speaking skills.
          </Text>

          {favoriteArticles.length > 0 ? (
            <View style={icVceTrainrrStyles.icVceTrainrrSection}>
              <View style={icVceTrainrrStyles.icVceTrainrrFavoritesLabelRow}>
                <Text style={icVceTrainrrStyles.icVceTrainrrFavoritesIcon}>♥</Text>
                <Text style={icVceTrainrrStyles.icVceTrainrrFavoritesLabel}>Favorites</Text>
              </View>
              <View style={icVceTrainrrStyles.icVceTrainrrCards}>
                {favoriteArticles.map(renderCard)}
              </View>
            </View>
          ) : null}

          <View style={icVceTrainrrStyles.icVceTrainrrDividerRow}>
            <View style={icVceTrainrrStyles.icVceTrainrrDividerLine} />
            <Text style={icVceTrainrrStyles.icVceTrainrrDividerText}>All Articles</Text>
            <View style={icVceTrainrrStyles.icVceTrainrrDividerLine} />
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrCards}>
            {(favoriteArticles.length > 0 ? otherArticles : icVceTrainrrBLOG_ARTICLES).map(
              renderCard,
            )}
          </View>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrBlogHome;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.332,
  },
  icVceTrainrrOverline: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 13.162,
    fontWeight: '600',
    letterSpacing: 1.4,
    marginBottom: 6.12,
    marginTop: 14.162,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 28.01,
    fontWeight: '800',
    marginBottom: 8.12,
  },
  icVceTrainrrSubtitle: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 15.129,
    lineHeight: 21,
    marginBottom: 20.162,
  },
  icVceTrainrrSection: {
    marginBottom: 8.128,
  },
  icVceTrainrrFavoritesLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6.12,
    marginBottom: 12.162,
  },
  icVceTrainrrFavoritesIcon: {
    color: '#F07911',
    fontSize: 16.12,
  },
  icVceTrainrrFavoritesLabel: {
    color: '#F07911',
    fontSize: 15.129,
    fontWeight: '700',
  },
  icVceTrainrrDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16.162,
    marginTop: 4,
  },
  icVceTrainrrDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#6CD0F740',
  },
  icVceTrainrrDividerText: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  icVceTrainrrCards: {
    gap: 12,
    marginBottom: 12,
  },
});
