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

import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {getBlogArticle} from '../../data/blogArticles';
import {
  isBlogFavorite,
  toggleBlogFavorite,
} from '../../data/blogFavoritesStore';
import type {BlogStackParamList} from '../../routes/blogTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<BlogStackParamList, 'BlogArticleDetail'>;
type Route = RouteProp<BlogStackParamList, 'BlogArticleDetail'>;

const BlogArticleDetail = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const article = useMemo(
    () => getBlogArticle(route.params.articleId),
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
    <View style={styles.root}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 52),
            paddingBottom: 24 + insets.bottom,
          },
        ]}>
        <PromptrStreakHeader showDivider={false} />

        <View style={styles.body}>
          <View style={styles.toolbar}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => [
                styles.toolBtn,
                pressed && styles.pressed,
                {backgroundColor: '#54C0DA1A'},
              ]}>
              <Image
                source={require('../../assets/images/pblicvcetraiback.png')}
              />
            </Pressable>

            <View style={styles.toolbarActions}>
              <Pressable
                onPress={shareArticle}
                style={({pressed}) => [
                  styles.toolBtn,
                  pressed && styles.pressed,
                ]}>
                <Image
                  source={require('../../assets/images/pblicvcetraistshr.png')}
                />
              </Pressable>
              <Pressable
                onPress={handleToggleFavorite}
                style={({pressed}) => [
                  styles.toolBtn,
                  isFavorite && styles.toolBtnFav,
                  pressed && styles.pressed,
                ]}>
                <Image
                  source={
                    isFavorite
                      ? require('../../assets/images/pblicvcetraistreliked.png')
                      : require('../../assets/images/pblicvcetraistlike.png')
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
            <Image source={require('../../assets/images/pblicvcetratim.png')} />
            <Text style={styles.meta}>
              {article.readMinutes} min read · {article.dateLabel}
            </Text>
          </View>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.lead}>{article.lead}</Text>

          <View style={styles.divider} />

          {article.body.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogArticleDetail;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#DFF9FF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    paddingHorizontal: 20,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toolbarActions: {
    flexDirection: 'row',
    gap: 10,
  },
  toolBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#0000000D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBtnFav: {
    backgroundColor: '#FFF0E0',
  },
  shareIcon: {
    color: pblicvcepromptrMuted,
    fontSize: 18,
    fontWeight: '600',
  },
  favIcon: {
    fontSize: 18,
    color: pblicvcepromptrMuted,
  },
  favIconActive: {
    color: '#F5A623',
  },
  meta: {
    color: '#8AA8B8',
    fontSize: 13,
    fontWeight: '400',
  },
  title: {
    color: pblicvcepromptrTitle,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 12,
  },
  lead: {
    color: '#54C0DA',
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#6CD0F740',
    marginBottom: 18,
  },
  paragraph: {
    color: pblicvcepromptrMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.9,
  },
});
