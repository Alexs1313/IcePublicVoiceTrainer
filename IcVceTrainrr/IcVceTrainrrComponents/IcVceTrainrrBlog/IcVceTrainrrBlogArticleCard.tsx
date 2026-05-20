import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';

import type {BlogArticle} from '../../IcVceTrainrrData/IcVceTrainrrBlogArticles';
import type {IcVceTrainrrBlogStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBlogTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrBlogStackParamList>;

type BlogArticleCardProps = {
  article: BlogArticle;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const IcVceTrainrrBlogArticleCard = ({
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
    <View style={icVceTrainrrStyles.icVceTrainrrCard}>
      <View style={icVceTrainrrStyles.icVceTrainrrCardTop}>
        <Text style={icVceTrainrrStyles.icVceTrainrrMeta}>
          🕒 {article.readMinutes} min read · {article.dateLabel}
        </Text>
        <Pressable
          onPress={onToggleFavorite}
          style={({pressed}) => [
            icVceTrainrrStyles.icVceTrainrrFavBtn,
            isFavorite && icVceTrainrrStyles.icVceTrainrrFavBtnActive,
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

      <Text style={icVceTrainrrStyles.icVceTrainrrCardTitle}>{article.title}</Text>
      <Text style={icVceTrainrrStyles.icVceTrainrrCardExcerpt} numberOfLines={2}>
        {article.excerpt}
      </Text>

      <View style={icVceTrainrrStyles.icVceTrainrrCardFooter}>
        <Pressable
          onPress={() =>
            navigation.navigate('IcVceTrainrrBlogArticleDetail', {articleId: article.id})
          }
          style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrReadBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
          <Text style={icVceTrainrrStyles.icVceTrainrrReadBtnText}>Read article</Text>
          <Image source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrainxt.png')} />
        </Pressable>

        <Pressable
          onPress={shareArticle}
          style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrShareBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
          <Image
            source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistshr.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default IcVceTrainrrBlogArticleCard;

const icVceTrainrrStyles = StyleSheet.create({
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
  icVceTrainrrMeta: {
    flex: 1,
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 12.162,
    fontWeight: '500',
    paddingRight: 8,
  },
  icVceTrainrrFavBtn: {
    width: 36.12,
    height: 36.12,
    borderRadius: 14.21,
    backgroundColor: 'rgba(107, 138, 158, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrFavBtnActive: {
    backgroundColor: '#F079111A',
  },
  icVceTrainrrFavIcon: {
    fontSize: 18,
    color: icVceTrainrrPblicvcepromptrMuted,
  },
  icVceTrainrrFavIconActive: {
    color: '#F5A623',
  },
  icVceTrainrrCardTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  icVceTrainrrCardExcerpt: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  icVceTrainrrCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  icVceTrainrrReadBtn: {
    backgroundColor: '#54C0DA1A',
    borderRadius: 14,
    height: 36,
    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icVceTrainrrReadBtnText: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 14,
    fontWeight: '700',
  },
  icVceTrainrrShareBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#0000000A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrShareIcon: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 20,
    fontWeight: '600',
  },
  icVceTrainrrPressed: {
    opacity: 0.9,
  },
});
