import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {
  createLibraryTextId,
  getLibraryText,
  saveLibraryText,
  type LibraryText,
} from '../../IcVceTrainrrData/IcVceTrainrrTextLibraryStore';
import type {IcVceTrainrrWorkshopStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrWorkshopTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrWorkshopStackParamList, 'IcVceTrainrrWorkshopTextEditor'>;
type Route = RouteProp<IcVceTrainrrWorkshopStackParamList, 'IcVceTrainrrWorkshopTextEditor'>;

const IcVceTrainrrWorkshopTextEditor = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryId, categoryTitle, mode, textId} = route.params;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const screenTitle = mode === 'new' ? 'New Text' : 'Edit Text';

  useEffect(() => {
    if (mode !== 'edit' || !textId) {
      return;
    }

    let active = true;
    getLibraryText(categoryId, textId).then(item => {
      if (!active || !item) {
        return;
      }
      setTitle(item.title);
      setBody(item.body);
      setIsDefault(item.isDefault);
    });

    return () => {
      active = false;
    };
  }, [categoryId, mode, textId]);

  const tipText = useMemo(
    () => (
      <Text style={icVceTrainrrStyles.icVceTrainrrTipText}>
        💡 This text will appear in{' '}
        <Text style={icVceTrainrrStyles.icVceTrainrrTipHighlight}>{categoryTitle}</Text> — both in the{' '}
        <Text style={icVceTrainrrStyles.icVceTrainrrTipHighlight}>Workshop</Text> and{' '}
        <Text style={icVceTrainrrStyles.icVceTrainrrTipHighlight}>Teleprompter</Text>
      </Text>
    ),
    [categoryTitle],
  );

  const handleSave = async () => {
    if (!canSave) {
      return;
    }

    const payload: LibraryText = {
      id: mode === 'edit' && textId ? textId : createLibraryTextId(),
      title: title.trim(),
      body: body.trim(),
      preview: '',
      isDefault: mode === 'edit' ? isDefault : false,
    };

    await saveLibraryText(categoryId, payload);
    navigation.goBack();
  };

  return (
    <View style={icVceTrainrrStyles.icVceTrainrrRoot}>
      <KeyboardAvoidingView
        style={icVceTrainrrStyles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            icVceTrainrrStyles.icVceTrainrrScrollContent,
            {
              paddingTop: Math.max(insets.top, 52),
              paddingBottom: 24 + insets.bottom,
            },
          ]}
          showsVerticalScrollIndicator={false}>
          <IcVceTrainrrPromptrStreakHeader showDivider={false} />

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
                  <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>{screenTitle}</Text>
                  <Text style={icVceTrainrrStyles.icVceTrainrrSubheading}>{categoryTitle}</Text>
                </View>
              </View>

              <Pressable
                onPress={handleSave}
                disabled={!canSave}
                style={({pressed}) => [pressed && canSave && icVceTrainrrStyles.icVceTrainrrPressed]}>
                {canSave ? (
                  <LinearGradient
                    colors={['#54C0DA', '#6CD0F7']}
                    style={icVceTrainrrStyles.icVceTrainrrSaveBtn}>
                    <Text style={icVceTrainrrStyles.icVceTrainrrSaveBtnText}>Save</Text>
                  </LinearGradient>
                ) : (
                  <View style={[icVceTrainrrStyles.icVceTrainrrSaveBtn, icVceTrainrrStyles.icVceTrainrrSaveBtnDisabled]}>
                    <Text style={icVceTrainrrStyles.icVceTrainrrSaveBtnTextDisabled}>Save</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <Text style={icVceTrainrrStyles.icVceTrainrrLabel}>Title *</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter a title for this text..."
              placeholderTextColor="#A8BEC9"
              style={icVceTrainrrStyles.icVceTrainrrTitleInput}
            />

            <Text style={icVceTrainrrStyles.icVceTrainrrLabel}>Text Content *</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Type or paste your practice text here..."
              placeholderTextColor="#A8BEC9"
              style={icVceTrainrrStyles.icVceTrainrrBodyInput}
              multiline
              textAlignVertical="top"
            />

            <View style={icVceTrainrrStyles.icVceTrainrrTip}>{tipText}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default IcVceTrainrrWorkshopTextEditor;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrRoot: {
    flex: 1,
    backgroundColor: '#DFF9FF',
  },
  flex: {
    flex: 1,
  },
  icVceTrainrrScrollContent: {
    flexGrow: 1,
  },
  icVceTrainrrBody: {
    paddingHorizontal: 20.3112,
  },
  icVceTrainrrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22.12,
    gap: 10.12,
  },
  icVceTrainrrHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icVceTrainrrBackBtn: {
    width: 35.124,
    height: 35.124,
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
    fontSize: 20.17,
    fontWeight: '700',
    marginBottom: 2,
  },
  icVceTrainrrSubheading: {
    color: '#8AA8B8',
    fontSize: 12,
    fontWeight: '500',
  },
  icVceTrainrrSaveBtn: {
    borderRadius: 14.21,
    height: 36.12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 65.021,
  },
  icVceTrainrrSaveBtnDisabled: {
    backgroundColor: '#D4DEE5',
  },
  icVceTrainrrSaveBtnText: {
    color: '#FFFFFF',
    fontSize: 15.129,
    fontWeight: '700',
  },
  icVceTrainrrSaveBtnTextDisabled: {
    color: '#FFFFFF',
    fontSize: 15.129,
    fontWeight: '700',
    opacity: 0.85,
  },
  icVceTrainrrLabel: {
    color: '#4A6A7A',
    fontSize: 13.162,
    fontWeight: '600',
    marginBottom: 8.133,
  },
  icVceTrainrrTitleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16.12,
    borderWidth: 1,
    borderColor: '#54C0DA40',
    paddingHorizontal: 16.12,
    paddingVertical: 14.162,
    fontSize: 15,
    color: icVceTrainrrPblicvcepromptrTitle,
    marginBottom: 18.12,
  },
  icVceTrainrrBodyInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16.12,
    borderWidth: 1,
    borderColor: '#54C0DA40',
    paddingHorizontal: 16.12,
    paddingVertical: 14,
    fontSize: 15,
    lineHeight: 22,
    color: icVceTrainrrPblicvcepromptrTitle,
    minHeight: 220,
    marginBottom: 18,
  },
  icVceTrainrrTip: {
    backgroundColor: '#54C0DA14',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#54C0DA26',
  },
  icVceTrainrrTipText: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 14.162,
    lineHeight: 20,
    textAlign: 'center',
  },
  icVceTrainrrTipHighlight: {
    fontWeight: '700',
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
