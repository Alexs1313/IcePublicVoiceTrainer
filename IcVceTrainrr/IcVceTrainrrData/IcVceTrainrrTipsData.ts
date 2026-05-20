export type TipCategoryId = 'confidence' | 'breathing' | 'clarity';

export type SpeakingTip = {
  id: string;
  number: number;
  title: string;
  body: string;
};

export type TipCategory = {
  id: TipCategoryId;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  badgeColor: string;
  tips: SpeakingTip[];
};

export const icVceTrainrrTIP_CATEGORIES: TipCategory[] = [
  {
    id: 'confidence',
    title: 'Confidence',
    description: 'Tips for a powerful voice and commanding delivery',
    icon: '💪',
    iconBg: '#E3F4FC',
    badgeColor: '#54C0DA',
    tips: [
      {
        id: 'conf-1',
        number: 1,
        title: 'Calm Beginning',
        body: 'Before speaking, take a slow deep breath and pause for a second before your first sentence. A calm beginning helps your voice sound more confident and controlled from the very start. Many people begin speaking too quickly because of nervousness, which can make speech harder to understand. Starting slowly gives your brain time to focus and helps listeners pay attention to your words more naturally.',
      },
      {
        id: 'conf-2',
        number: 2,
        title: 'Strong Posture',
        body: 'Stand straight and keep your shoulders relaxed while speaking. Good posture improves breathing, voice projection, and makes you appear more confident to listeners. When your posture is stable, your voice usually sounds stronger and clearer. Poor posture can create tension in the neck and chest, making speech less comfortable and less expressive during long conversations or presentations.',
      },
      {
        id: 'conf-3',
        number: 3,
        title: 'Speak Slower',
        body: 'Do not rush through sentences when you feel nervous. Slower speech sounds clearer, more professional, and gives you more time to control your thoughts. Speaking too quickly often causes pronunciation mistakes and weakens communication. A calm pace allows listeners to understand your ideas better and helps you maintain stronger control over your voice and breathing.',
      },
      {
        id: 'conf-4',
        number: 4,
        title: 'Eye Contact',
        body: 'Try to maintain natural eye contact with people while speaking. Looking at your audience helps create connection, trust, and stronger communication. Eye contact also makes speakers appear more confident and engaged in the conversation. You do not need to stare constantly at one person. Simply moving your attention naturally between listeners helps conversations feel more comfortable and professional.',
      },
      {
        id: 'conf-5',
        number: 5,
        title: 'Practice Daily',
        body: 'Even five or ten minutes of speaking practice every day can improve confidence over time. Regular repetition helps reduce fear and builds speaking comfort. Reading aloud, practicing difficult words, or recording your voice are simple exercises that strengthen communication skills. Consistent practice is much more effective than practicing only occasionally for long periods of time.',
      },
      {
        id: 'conf-6',
        number: 6,
        title: 'Accept Mistakes',
        body: 'Small mistakes are normal during conversations and presentations. Instead of panicking, continue speaking calmly and focus on your message rather than perfection. Most listeners pay more attention to your confidence and energy than to tiny errors. Accepting mistakes as part of learning helps reduce stress and makes public speaking feel much less intimidating over time.',
      },
    ],
  },
  {
    id: 'breathing',
    title: 'Breathing',
    description: 'Tips for proper breath control while speaking',
    icon: '🌬️',
    iconBg: '#E3F4FC',
    badgeColor: '#54C0DA',
    tips: [
      {
        id: 'br-1',
        number: 1,
        title: 'Deep Breaths',
        body: 'Breathe deeply using your diaphragm instead of taking short chest breaths. Deep breathing creates a calmer voice and improves sentence control. Shallow breathing often causes tension and makes speech sound rushed or unstable. Practicing slow and controlled breathing before speaking can help your voice feel stronger and more relaxed during presentations or conversations.',
      },
      {
        id: 'br-2',
        number: 2,
        title: 'Pause Naturally',
        body: 'Use short pauses between important ideas while speaking. Pauses help you breathe properly and make speech easier for listeners to understand. Many inexperienced speakers try to avoid pauses and accidentally rush through sentences. Natural pauses improve rhythm, reduce stress, and make communication sound more professional and confident.',
      },
      {
        id: 'br-3',
        number: 3,
        title: 'Relax Your Shoulders',
        body: 'Tension in the shoulders and neck can affect breathing and voice quality. Before speaking, relax your body and take several slow breaths to release stress. A relaxed posture allows air to flow more naturally and helps create smoother speech. Physical relaxation also reduces nervousness and improves overall speaking comfort.',
      },
      {
        id: 'br-4',
        number: 4,
        title: 'Control Your Exhale',
        body: 'Try to release air slowly while speaking instead of pushing words out too quickly. Controlled exhaling helps maintain a stable and clear voice during longer sentences. Good breath control improves pronunciation, reduces vocal strain, and helps speakers sound calmer even during stressful situations or public presentations.',
      },
      {
        id: 'br-5',
        number: 5,
        title: 'Practice Silent Breathing',
        body: 'Spend a few minutes practicing silent breathing exercises every day. Quiet and controlled breathing trains better lung control and helps reduce anxiety before speaking. This habit is especially useful for people who often feel nervous during presentations or conversations in front of groups.',
      },
      {
        id: 'br-6',
        number: 6,
        title: 'Breathe Before Answers',
        body: 'Before answering a difficult question or starting a new topic, take one calm breath first. This small habit gives your brain a moment to organize thoughts and prevents rushed speech. A short pause with controlled breathing can make answers sound more thoughtful, confident, and easier to understand.',
      },
    ],
  },
  {
    id: 'clarity',
    title: 'Clarity',
    description: 'Tips for clear pronunciation and crisp diction',
    icon: '✨',
    iconBg: '#FFE8DC',
    badgeColor: '#F5A623',
    tips: [
      {
        id: 'clr-1',
        number: 1,
        title: 'Open Your Mouth',
        body: 'Many pronunciation problems happen because people speak without opening their mouths enough. Clear articulation requires visible and active mouth movement. Speaking with better mouth control improves sound clarity and helps listeners understand every word more easily during conversations or presentations.',
      },
      {
        id: 'clr-2',
        number: 2,
        title: 'Focus On Endings',
        body: 'Pay attention to the endings of words when you speak. Many people naturally shorten or skip final sounds, especially while speaking quickly. Pronouncing full words clearly makes speech sound cleaner, more professional, and easier for others to follow during longer discussions.',
      },
      {
        id: 'clr-3',
        number: 3,
        title: 'Train Difficult Sounds',
        body: 'Practice words and phrases that contain sounds you personally find difficult to pronounce. Repeating challenging combinations slowly helps improve articulation and builds stronger speech habits over time. Consistent practice makes difficult sounds feel more natural and easier to pronounce clearly.',
      },
      {
        id: 'clr-4',
        number: 4,
        title: 'Read Aloud Daily',
        body: 'Reading aloud is one of the best exercises for improving diction and clarity. It trains pronunciation, rhythm, breathing, and voice control at the same time. Even short daily reading sessions can noticeably improve speech quality and help speakers become more comfortable with expressive communication.',
      },
      {
        id: 'clr-5',
        number: 5,
        title: 'Avoid Rushing',
        body: 'Fast speech often causes unclear pronunciation and weak articulation. Slowing down slightly allows your mouth and tongue to form sounds more accurately. Clear speech is usually more important than fast speech, especially during presentations, interviews, or important conversations.',
      },
      {
        id: 'clr-6',
        number: 6,
        title: 'Record Yourself',
        body: 'Try recording your voice while reading or practicing speeches. Listening to recordings helps identify unclear sounds, weak pronunciation, and speaking habits that are difficult to notice in real time. Self-analysis is a powerful tool for improving communication and developing clearer, more confident speech.',
      },
    ],
  },
];

export const icVceTrainrrGetTipCategory = (id: TipCategoryId) =>
  icVceTrainrrTIP_CATEGORIES.find(category => category.id === id);

export const getAllTips = () =>
  icVceTrainrrTIP_CATEGORIES.flatMap(category =>
    category.tips.map(tip => ({...tip, category})),
  );

export const icVceTrainrrGetRandomTip = () => {
  const all = getAllTips();
  return all[Math.floor(Math.random() * all.length)];
};
