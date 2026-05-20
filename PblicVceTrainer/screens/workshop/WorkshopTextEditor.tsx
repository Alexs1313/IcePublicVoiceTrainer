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

import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {
  createLibraryTextId,
  getLibraryText,
  saveLibraryText,
  type LibraryText,
} from '../../data/textLibraryStore';
import type {WorkshopStackParamList} from '../../routes/workshopTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<WorkshopStackParamList, 'WorkshopTextEditor'>;
type Route = RouteProp<WorkshopStackParamList, 'WorkshopTextEditor'>;

const WorkshopTextEditor = () => {
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
      <Text style={styles.tipText}>
        💡 This text will appear in{' '}
        <Text style={styles.tipHighlight}>{categoryTitle}</Text> — both in the{' '}
        <Text style={styles.tipHighlight}>Workshop</Text> and{' '}
        <Text style={styles.tipHighlight}>Teleprompter</Text>
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
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(insets.top, 52),
              paddingBottom: 24 + insets.bottom,
            },
          ]}
          showsVerticalScrollIndicator={false}>
          <PromptrStreakHeader showDivider={false} />

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
                  <Text style={styles.heading}>{screenTitle}</Text>
                  <Text style={styles.subheading}>{categoryTitle}</Text>
                </View>
              </View>

              <Pressable
                onPress={handleSave}
                disabled={!canSave}
                style={({pressed}) => [pressed && canSave && styles.pressed]}>
                {canSave ? (
                  <LinearGradient
                    colors={['#54C0DA', '#6CD0F7']}
                    style={styles.saveBtn}>
                    <Text style={styles.saveBtnText}>Save</Text>
                  </LinearGradient>
                ) : (
                  <View style={[styles.saveBtn, styles.saveBtnDisabled]}>
                    <Text style={styles.saveBtnTextDisabled}>Save</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <Text style={styles.label}>Title *</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter a title for this text..."
              placeholderTextColor="#A8BEC9"
              style={styles.titleInput}
            />

            <Text style={styles.label}>Text Content *</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Type or paste your practice text here..."
              placeholderTextColor="#A8BEC9"
              style={styles.bodyInput}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.tip}>{tipText}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default WorkshopTextEditor;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#DFF9FF',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    paddingHorizontal: 20.3112,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22.12,
    gap: 10.12,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 35.124,
    height: 35.124,
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
    fontSize: 20.17,
    fontWeight: '700',
    marginBottom: 2,
  },
  subheading: {
    color: '#8AA8B8',
    fontSize: 12,
    fontWeight: '500',
  },
  saveBtn: {
    borderRadius: 14.21,
    height: 36.12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 65.021,
  },
  saveBtnDisabled: {
    backgroundColor: '#D4DEE5',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15.129,
    fontWeight: '700',
  },
  saveBtnTextDisabled: {
    color: '#FFFFFF',
    fontSize: 15.129,
    fontWeight: '700',
    opacity: 0.85,
  },
  label: {
    color: '#4A6A7A',
    fontSize: 13.162,
    fontWeight: '600',
    marginBottom: 8.133,
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16.12,
    borderWidth: 1,
    borderColor: '#54C0DA40',
    paddingHorizontal: 16.12,
    paddingVertical: 14.162,
    fontSize: 15,
    color: pblicvcepromptrTitle,
    marginBottom: 18.12,
  },
  bodyInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16.12,
    borderWidth: 1,
    borderColor: '#54C0DA40',
    paddingHorizontal: 16.12,
    paddingVertical: 14,
    fontSize: 15,
    lineHeight: 22,
    color: pblicvcepromptrTitle,
    minHeight: 220,
    marginBottom: 18,
  },
  tip: {
    backgroundColor: '#54C0DA14',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#54C0DA26',
  },
  tipText: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 14.162,
    lineHeight: 20,
    textAlign: 'center',
  },
  tipHighlight: {
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.92,
  },
});
