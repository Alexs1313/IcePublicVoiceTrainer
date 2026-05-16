export type PromptrCategoryId = 'public-speaking' | 'diction' | 'storytelling';

export type PromptrText = {
  id: string;
  title: string;
  body: string;
  preview: string;
};

export type PromptrCategory = {
  id: PromptrCategoryId;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
};

const preview = (body: string) =>
  body.length > 96 ? `${body.slice(0, 96).trim()}…` : body;

export const PROMPTR_CATEGORIES: PromptrCategory[] = [
  {
    id: 'public-speaking',
    title: 'Public Speaking',
    description:
      'Speeches, presentations & business addresses. Build clarity, intonation and confidence.',
    icon: '🎤',
    iconBg: '#E3F4FC',
  },
  {
    id: 'diction',
    title: 'Diction Practice',
    description:
      'Tongue twisters, rhythmic phrases & complex sounds for sharper articulation.',
    icon: '🗣️',
    iconBg: '#FFF5D6',
  },
  {
    id: 'storytelling',
    title: 'Storytelling',
    description:
      'Emotional stories to practice natural pacing, pauses and voice control.',
    icon: '📖',
    iconBg: '#FFE8DC',
  },
];

export const PROMPTR_TEXTS: Record<PromptrCategoryId, PromptrText[]> = {
  'public-speaking': [
    {
      id: 'ps-1',
      title: 'The Power of Small Steps',
      body: `Success is rarely built in a single moment. Most achievements begin with small and consistent actions repeated every day. When people focus only on large goals, they often become discouraged by slow progress. However, those who continue moving forward, even with tiny steps, usually become the ones who reach their destination. Confidence also grows this way. Every presentation, every conversation, and every attempt to speak in front of others helps build stronger communication skills. The important thing is not perfection, but persistence. A person who continues practicing will eventually sound more natural, more confident, and more inspiring to the people around them.

Many people wait for the perfect moment before they begin improving their speaking skills, but progress starts only through action. Reading aloud, practicing difficult words, and learning how to control pauses can slowly transform the way a person communicates. Strong communication is useful in school, business, friendships, and everyday life. A calm and expressive voice helps people listen more carefully and understand ideas more clearly. Small daily practice sessions may seem simple, but over time they create powerful results that are impossible to ignore.`,
      preview: '',
    },
    {
      id: 'ps-2',
      title: 'Speaking With Confidence',
      body: `Confidence does not mean speaking loudly or pretending to know everything. Real confidence comes from calmness, preparation, and clear communication. Before every presentation, it is important to organize your thoughts and understand the main message you want to share. A confident speaker maintains eye contact, controls breathing, and speaks at a comfortable pace. Mistakes are normal, and audiences usually care more about honesty and energy than perfection. Every great speaker once felt nervous. What separates successful communicators is their willingness to continue speaking despite fear.

Preparation is one of the strongest tools for reducing anxiety. When speakers know their material well, they feel more relaxed and focused during conversations or presentations. It is also important to avoid rushing through sentences. Slow and controlled speech sounds more professional and gives listeners time to understand information. Confident communication is not only about words. Facial expressions, posture, pauses, and tone of voice all influence how messages are received. Over time, regular speaking practice helps transform nervous energy into calm confidence and stronger stage presence.`,
      preview: '',
    },
    {
      id: 'ps-3',
      title: 'A Strong First Impression',
      body: `The first few seconds of communication can completely shape how people see a speaker. A clear introduction, good posture, and a calm tone create trust and attention. People often remember how a speaker made them feel more than the exact words that were said. This is why energy and delivery are extremely important during presentations or conversations. A person who speaks clearly and naturally appears more professional and believable. Even simple greetings can sound powerful when they are spoken with confidence and positive energy.

A strong first impression also depends on preparation and focus. Before speaking, it helps to take a deep breath and mentally organize your thoughts. Nervousness can cause people to speak too quickly or forget important details, but slowing down helps maintain control. Listeners appreciate speakers who sound calm and sincere rather than overly dramatic. Communication becomes stronger when speakers use pauses correctly and avoid unnecessary filler words. The beginning of a presentation is an opportunity to capture attention and create a connection that lasts until the very end.`,
      preview: '',
    },
    {
      id: 'ps-4',
      title: 'The Art of Clear Communication',
      body: `Clear communication is one of the most valuable skills in both personal and professional life. People who speak clearly are easier to understand, easier to trust, and often more successful in teamwork and leadership. Communication becomes effective when ideas are simple, organized, and delivered with purpose. Long and confusing explanations can make listeners lose attention, while direct and expressive speech keeps people engaged. A good speaker focuses not only on speaking, but also on helping the audience understand the message.

Voice control also plays an important role in communication. Changing tone, volume, and rhythm helps make speech more dynamic and interesting. Monotone speech can quickly become boring, even if the information is important. Speakers should also pay attention to pronunciation and breathing. Deep breathing helps create a calmer voice and improves sentence control. Communication is not about speaking as much as possible. It is about expressing ideas in a way that feels natural, memorable, and easy for people to follow.`,
      preview: '',
    },
    {
      id: 'ps-5',
      title: 'Overcoming The Fear Of Speaking',
      body: `Fear of public speaking is one of the most common fears in the world. Many people worry about making mistakes, forgetting words, or being judged by others. However, fear becomes smaller with experience and practice. Every time a person speaks in front of others, the brain slowly becomes more comfortable with the situation. Confidence is built through repetition, patience, and self-improvement. Even professional speakers continue practicing because communication skills can always become stronger.

One useful method for reducing fear is focusing on the message instead of the audience. When speakers concentrate on helping listeners understand something valuable, they often feel less nervous. Positive body language also helps create confidence. Standing straight, breathing slowly, and speaking clearly can improve both performance and mindset. Mistakes should not be viewed as failures. They are part of the learning process and help speakers grow stronger over time. With enough practice, public speaking can transform from a stressful challenge into an enjoyable and rewarding experience.`,
      preview: '',
    },
  ],
  diction: [
    {
      id: 'dic-1',
      title: 'Sharp Sounds Training',
      body: `Peter proudly prepared perfect purple posters for the public performance on Friday evening. While practicing pronunciation, he repeated every phrase slowly and carefully to improve clarity and control. The purpose of diction training is not only to speak quickly, but also to pronounce every sound correctly and naturally. Strong diction helps listeners understand words clearly without effort. Many people speak too fast during conversations and accidentally blur important sounds together. Slowing down and focusing on articulation creates cleaner and more professional speech.

Clear pronunciation requires patience and repetition. Some sounds are naturally more difficult than others, especially combinations of letters that force the mouth and tongue to move quickly. Reading difficult phrases aloud trains muscles involved in speech and improves vocal coordination. Speakers should practice opening their mouths properly, controlling breathing, and maintaining steady rhythm while reading. Good diction improves confidence because speakers no longer worry about sounding unclear. Over time, regular practice creates smoother speech patterns and stronger voice control during conversations or presentations.`,
      preview: '',
    },
    {
      id: 'dic-2',
      title: 'Rolling Rhythm Exercise',
      body: `Bright blue birds bravely balanced between broken branches beside the busy bridge during the windy morning storm. Sentences with repeated sounds are excellent for developing rhythm, focus, and pronunciation accuracy. When people repeat challenging phrases, the brain learns how to organize speech movements more efficiently. At first, difficult combinations may feel uncomfortable or unnatural, but steady practice slowly improves fluency and precision. The goal is not speed alone. The real goal is maintaining clarity while speaking at different tempos.

Breathing also plays a major role in diction exercises. Shallow breathing often causes tension in the throat and makes speech less stable. Deep and controlled breathing helps create stronger voice projection and smoother sentence flow. Many professional speakers warm up their voices before presentations by repeating rhythmic phrases and tongue exercises. These simple habits prepare the mouth and vocal cords for long speaking sessions. Diction training may seem repetitive at times, but consistent repetition is exactly what creates lasting improvement in pronunciation and speech quality.`,
      preview: '',
    },
    {
      id: 'dic-3',
      title: 'Clear Voice Control',
      body: `Six silent snakes slowly slid beside seven silver stones near the sunny seaside station. Difficult sound combinations force speakers to pay attention to every letter and syllable. This type of exercise strengthens articulation and improves awareness of speech habits. Some people naturally skip sounds or shorten words without realizing it. Reading carefully structured practice texts helps correct these habits and develops more controlled communication skills. Clear speech becomes especially important during presentations, interviews, and public conversations.

Voice control is closely connected to confidence and expression. Speakers who control their pace and pronunciation sound calmer and more professional. Rushing through sentences often creates mistakes and makes speech harder to understand. Pauses are also important because they give listeners time to process information. A well-controlled voice sounds stronger and more pleasant to hear. Over time, regular diction exercises improve not only pronunciation, but also overall speaking comfort. Strong articulation allows speakers to express ideas more naturally and effectively.`,
      preview: '',
    },
    {
      id: 'dic-4',
      title: 'Difficult Words Challenge',
      body: `Thirty thoughtful thinkers thoroughly discussed theoretical themes throughout the thrilling Thursday training session. Long and complex phrases are useful for training concentration and pronunciation accuracy. These exercises challenge the tongue, lips, and breathing system at the same time. At first, some words may feel difficult to pronounce smoothly, but repeating them slowly helps build muscle memory. Once the movements become familiar, speakers can gradually increase speed without losing clarity or control.

Diction improvement does not happen instantly. It develops through regular training and careful listening to your own speech. Recording practice sessions can help speakers notice unclear sounds and pronunciation mistakes. Many people are surprised when they hear how different their voice sounds during recordings. This awareness helps identify areas that need improvement. Strong diction creates more understandable communication and improves overall confidence during conversations. Even short daily practice sessions can produce noticeable progress after several weeks of consistent training.`,
      preview: '',
    },
    {
      id: 'dic-5',
      title: 'Smooth Speaking Practice',
      body: `Friendly farmers frequently found fresh fruit near the forest during freezing February mornings. Reading rhythmic and alliterative sentences trains smooth speech transitions and improves vocal flexibility. Difficult phrases encourage speakers to slow down and focus on pronunciation details. Many articulation mistakes happen because the mouth moves too quickly between sounds. Controlled practice teaches speakers how to maintain precision even during longer or faster sentences. Smooth communication sounds more natural and keeps listeners engaged for longer periods of time.

Good speaking habits are built through repetition and patience. Diction exercises are similar to physical training because they strengthen specific muscles involved in speech production. The tongue, lips, jaw, and breathing system all work together during communication. Practicing regularly improves coordination between these elements and creates clearer pronunciation. Over time, speakers begin to notice stronger control over difficult words and better confidence during conversations. Clear and expressive speech is a valuable skill that can improve communication in every area of life.`,
      preview: '',
    },
  ],
  storytelling: [
    {
      id: 'st-1',
      title: 'The Light In The Window',
      body: `During a cold autumn evening, a young traveler walked through a quiet village surrounded by forests and empty roads. The wind moved slowly through the trees, and the sound of distant rain echoed across the dark hills. Almost every house looked empty, except for one small home at the end of the street where a warm golden light shined through the window. Curious and tired after a long journey, the traveler carefully approached the house and knocked on the wooden door.

An elderly woman opened the door with a calm smile and invited the traveler inside. The room smelled of fresh tea and burning wood from the fireplace. While sitting near the fire, the traveler shared stories about distant cities, difficult roads, and dreams of finding a better future. The woman listened quietly and then explained that many people spend their lives searching for happiness in faraway places while forgetting to appreciate the warmth and kindness already around them. That simple conversation stayed in the traveler's memory for many years and slowly changed the way he viewed life and people.`,
      preview: '',
    },
    {
      id: 'st-2',
      title: 'The Old Clock Tower',
      body: `In the center of a small town stood an ancient clock tower that had not worked properly for decades. Most people ignored it because they believed it was simply too old to repair. However, a young boy named Daniel became fascinated by the tower and spent hours watching its giant motionless clock hands every afternoon after school. He imagined the stories hidden inside the old building and dreamed about hearing the clock ring again one day.

One rainy evening, Daniel finally gathered enough courage to enter the tower. Dust covered the stairs, and the sound of creaking wood echoed through the empty structure. At the top, he discovered a huge mechanical system filled with rusted gears and broken pieces. Although the task seemed impossible, he continued visiting the tower every day and slowly learned how the mechanism worked. Months later, after endless effort and patience, the clock suddenly began moving again. When the bell rang across the town for the first time in years, people stopped in surprise and smiled proudly. Daniel realized that determination and curiosity could bring forgotten things back to life.`,
      preview: '',
    },
    {
      id: 'st-3',
      title: 'The Voice By The Lake',
      body: `A young musician often visited a quiet lake outside the city whenever he felt tired or confused. Early every morning, he sat near the water with his guitar and played soft melodies while watching the sunrise reflect across the surface of the lake. The peaceful atmosphere helped him escape the noise and pressure of daily life. Although he loved music deeply, he secretly feared performing in front of large audiences because he worried people would judge him or dislike his songs.

One morning, while practicing near the lake, he noticed a small group of strangers quietly listening nearby. Nervous at first, he considered stopping immediately, but instead he continued playing. When the song ended, the listeners applauded warmly and thanked him for sharing his music. That simple moment changed something inside him. He understood that fear often prevents people from sharing their talents with the world. From that day forward, he slowly began performing publicly and discovered that his voice could inspire emotions and memories in others far beyond what he had imagined.`,
      preview: '',
    },
    {
      id: 'st-4',
      title: 'The Forgotten Letter',
      body: `While cleaning an old family attic, a young woman discovered a small wooden box hidden behind several dusty books. Inside the box was a carefully folded letter written more than fifty years earlier by her grandfather. Curious and emotional, she slowly opened the paper and began reading the faded handwriting. The letter described dreams, fears, and hopes from a difficult period of his life that nobody in the family had ever discussed before.

As she continued reading, she realized how much courage and sacrifice her grandfather had shown throughout his life. He wrote about never giving up during difficult times and always protecting the people he loved. The letter also contained advice about appreciating simple moments and staying kind even when life becomes unfair. After finishing the final sentence, the woman sat silently for several minutes thinking about how strongly words can connect people across generations. That forgotten letter became one of the most valuable things she had ever found because it reminded her that stories and memories never truly disappear.`,
      preview: '',
    },
    {
      id: 'st-5',
      title: 'The Train At Midnight',
      body: `Late one winter night, a nearly empty train moved slowly through the snowy countryside under a dark sky filled with clouds. Most passengers were asleep, exhausted after long journeys and stressful days. A young man sitting near the window quietly watched the snow fall outside while thinking about an important decision that could completely change his future. He felt uncertain, nervous, and afraid of making the wrong choice.

Across from him sat an older passenger reading a small book under the dim train light. After noticing the young man's worried expression, the stranger started a calm conversation about life, risks, and missed opportunities. He explained that people often regret the chances they never took far more than the mistakes they made while trying something new. The conversation lasted only a short time, but it deeply affected the young man's thoughts. When the train finally reached its destination, he stepped onto the platform feeling calmer and more confident about moving forward into the unknown future ahead of him.`,
      preview: '',
    },
  ],
};

Object.values(PROMPTR_TEXTS).forEach(texts => {
  texts.forEach(item => {
    item.preview = preview(item.body);
  });
});

export const getPromptrCategory = (id: PromptrCategoryId) =>
  PROMPTR_CATEGORIES.find(c => c.id === id);

/** @deprecated Use getLibraryTexts from textLibraryStore */
export const getPromptrTexts = (id: PromptrCategoryId) => PROMPTR_TEXTS[id];
