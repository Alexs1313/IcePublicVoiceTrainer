import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';

import type {BlogArticle} from '../../data/blogArticles';
import type {BlogStackParamList} from '../../routes/blogTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<BlogStackParamList>;

type BlogArticleCardProps = {
  article: BlogArticle;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const BlogArticleCard = ({
  article,
  isFavorite,
  onToggleFavorite,
}: BlogArticleCardProps) => {
  const navigation = useNavigation<Nav>();

  const shareArticle = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.excerpt}\n\nIce Public Voice Trainer`,
        title: article.title,
      });
    } catch {
      // dismissed
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.meta}>
          🕒 {article.readMinutes} min read · {article.dateLabel}
        </Text>
        <Pressable
          onPress={onToggleFavorite}
          style={({pressed}) => [
            styles.favBtn,
            isFavorite && styles.favBtnActive,
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

      <Text style={styles.cardTitle}>{article.title}</Text>
      <Text style={styles.cardExcerpt} numberOfLines={2}>
        {article.excerpt}
      </Text>

      <View style={styles.cardFooter}>
        <Pressable
          onPress={() =>
            navigation.navigate('BlogArticleDetail', {articleId: article.id})
          }
          style={({pressed}) => [styles.readBtn, pressed && styles.pressed]}>
          <Text style={styles.readBtnText}>Read article</Text>
          <Image source={require('../../assets/images/pblicvcetrainxt.png')} />
        </Pressable>

        <Pressable
          onPress={shareArticle}
          style={({pressed}) => [styles.shareBtn, pressed && styles.pressed]}>
          <Image
            source={require('../../assets/images/pblicvcetraistshr.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default BlogArticleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22.12,
    padding: 18.13,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.12,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10.188,
  },
  meta: {
    flex: 1,
    color: pblicvcepromptrMuted,
    fontSize: 12.162,
    fontWeight: '500',
    paddingRight: 8,
  },
  favBtn: {
    width: 36.12,
    height: 36.12,
    borderRadius: 14.21,
    backgroundColor: 'rgba(107, 138, 158, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnActive: {
    backgroundColor: '#F079111A',
  },
  favIcon: {
    fontSize: 18,
    color: pblicvcepromptrMuted,
  },
  favIconActive: {
    color: '#F5A623',
  },
  cardTitle: {
    color: pblicvcepromptrTitle,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardExcerpt: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  readBtn: {
    backgroundColor: '#54C0DA1A',
    borderRadius: 14,
    height: 36,
    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  readBtnText: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 14,
    fontWeight: '700',
  },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#0000000A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: pblicvcepromptrMuted,
    fontSize: 20,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.9,
  },
});
