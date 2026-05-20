import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BlogArticleCard from '../../components/blog/BlogArticleCard';
import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {BLOG_ARTICLES, type BlogArticle} from '../../data/blogArticles';
import {
  loadBlogFavorites,
  toggleBlogFavorite,
} from '../../data/blogFavoritesStore';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

const BlogHome = () => {
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
    () => BLOG_ARTICLES.filter(article => favorites.includes(article.id)),
    [favorites],
  );

  const otherArticles = useMemo(
    () => BLOG_ARTICLES.filter(article => !favorites.includes(article.id)),
    [favorites],
  );

  const handleToggleFavorite = async (articleId: string) => {
    await toggleBlogFavorite(articleId);
    await loadFavorites();
  };

  const renderCard = (article: BlogArticle) => (
    <BlogArticleCard
      key={article.id}
      article={article}
      isFavorite={favorites.includes(article.id)}
      onToggleFavorite={() => handleToggleFavorite(article.id)}
    />
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
          <Text style={styles.overline}>BLOG</Text>
          <Text style={styles.heading}>Oratory Insights</Text>
          <Text style={styles.subtitle}>
            Expert articles to level up your speaking skills.
          </Text>

          {favoriteArticles.length > 0 ? (
            <View style={styles.section}>
              <View style={styles.favoritesLabelRow}>
                <Text style={styles.favoritesIcon}>♥</Text>
                <Text style={styles.favoritesLabel}>Favorites</Text>
              </View>
              <View style={styles.cards}>
                {favoriteArticles.map(renderCard)}
              </View>
            </View>
          ) : null}

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>All Articles</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.cards}>
            {(favoriteArticles.length > 0 ? otherArticles : BLOG_ARTICLES).map(
              renderCard,
            )}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default BlogHome;

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
    marginTop: 14.162,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 28.01,
    fontWeight: '800',
    marginBottom: 8.12,
  },
  subtitle: {
    color: pblicvcepromptrMuted,
    fontSize: 15.129,
    lineHeight: 21,
    marginBottom: 20.162,
  },
  section: {
    marginBottom: 8.128,
  },
  favoritesLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6.12,
    marginBottom: 12.162,
  },
  favoritesIcon: {
    color: '#F07911',
    fontSize: 16.12,
  },
  favoritesLabel: {
    color: '#F07911',
    fontSize: 15.129,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16.162,
    marginTop: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#6CD0F740',
  },
  dividerText: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  cards: {
    gap: 12,
    marginBottom: 12,
  },
});
