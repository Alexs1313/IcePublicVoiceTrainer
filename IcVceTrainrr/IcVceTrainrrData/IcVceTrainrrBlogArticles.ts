export type BlogArticle = {
  id: string;
  title: string;
  lead: string;
  excerpt: string;
  body: string[];
  readMinutes: number;
  dateLabel: string;
};

const icVceTrainrrWordCount = (text: string) =>
  text.split(/\s+/).filter(Boolean).length;

const icVceTrainrrEstimateReadMinutes = (paragraphs: string[]) => {
  const words = icVceTrainrrWordCount(paragraphs.join(' '));
  return Math.max(4, Math.round(words / 200));
};

const icVceTrainrrMakeArticle = (
  id: string,
  title: string,
  lead: string,
  body: string[],
  dateLabel: string,
): BlogArticle => ({
  id,
  title,
  lead,
  body,
  dateLabel,
  readMinutes: icVceTrainrrEstimateReadMinutes(body),
  excerpt:
    body[0].length > 120 ? `${body[0].slice(0, 120).trim()}…` : body[0],
});

export const icVceTrainrrBLOG_ARTICLES: BlogArticle[] = [
  icVceTrainrrMakeArticle(
    'blog-1',
    'How To Sound More Confident While Speaking',
    'Confidence grows through practice — not by pretending nerves never exist.',
    [
      `Confidence in speaking is not something people are simply born with. It is a skill that develops through practice, repetition, and experience. Many people believe confident speakers never feel nervous, but in reality even experienced presenters often feel stress before speaking in front of others. The difference is that they know how to control that nervous energy and continue speaking calmly despite discomfort.`,
      `One of the most effective ways to sound more confident is to slow down your speech. Nervous people often rush through sentences because they want to finish quickly. Unfortunately, fast speech usually creates pronunciation mistakes and makes communication harder to follow. Speaking at a calm pace helps listeners understand ideas more clearly and gives the speaker better control over breathing and voice.`,
      `Body language also has a strong effect on communication. Standing straight, relaxing the shoulders, and maintaining natural eye contact helps speakers appear more comfortable and professional. People often trust speakers who look calm and focused. Even small posture improvements can noticeably change how a voice sounds during conversations or presentations.`,
      `Preparation is another important factor. Confidence grows when speakers understand their material well. Reading texts aloud, practicing presentations several times, and improving diction all help reduce anxiety before speaking. Over time, regular speaking practice slowly transforms fear into confidence and helps communication feel more natural and enjoyable.`,
    ],
    'May 10, 2026',
  ),
  icVceTrainrrMakeArticle(
    'blog-2',
    'Why Breathing Matters In Public Speaking',
    'Controlled breathing is the foundation of a calm, powerful voice.',
    [
      `Breathing is one of the most important elements of strong communication, yet many people completely ignore it while speaking. When a person becomes nervous, breathing usually becomes faster and shallower. This creates tension in the body and often causes speech to sound rushed or unstable. Learning how to control breathing can dramatically improve both voice quality and confidence.`,
      `Professional speakers and actors often train breathing separately because it affects volume, clarity, rhythm, and emotional control. Deep breathing helps the voice sound stronger and calmer. It also gives speakers better control over long sentences and reduces the chances of running out of air while talking.`,
      `One useful technique is diaphragmatic breathing. Instead of lifting the chest while inhaling, speakers should focus on expanding the stomach area slightly. This method allows the lungs to fill more effectively and creates steadier airflow during speech. At first, this may feel unusual, but regular practice makes breathing more natural and controlled.`,
      `Pauses are also connected to breathing. Many inexperienced speakers avoid pauses because they fear silence, but pauses are actually very important. They allow speakers to breathe properly, organize thoughts, and help listeners process information. Calm breathing combined with natural pauses creates smoother and more professional communication that feels easier to follow.`,
    ],
    'May 8, 2026',
  ),
  icVceTrainrrMakeArticle(
    'blog-3',
    'Common Mistakes During Public Speaking',
    'Spot the habits that quietly weaken your delivery — then fix them.',
    [
      `Public speaking can feel stressful, especially for beginners. Because of nervousness, many speakers develop habits that reduce the quality of their communication without even realizing it. Understanding these common mistakes is the first step toward improving speaking skills and becoming more comfortable in front of others.`,
      `One of the biggest mistakes is speaking too quickly. Fast speech often happens because speakers feel anxious and want to finish as soon as possible. Unfortunately, rushing makes pronunciation less clear and causes listeners to lose important information. Slowing down slightly improves clarity and gives speakers more control over their delivery.`,
      `Another common issue is avoiding eye contact. Some people look only at the floor, their notes, or a single point in the room. Natural eye contact helps build connection and trust with listeners. It also makes presentations feel more engaging and personal.`,
      `Many speakers also overuse filler words such as "um," "uh," or "like." While occasional filler words are normal, using them too frequently can make speech sound less confident. Learning to pause silently instead of filling every moment with sound creates calmer and cleaner communication.`,
      `Fear of mistakes is another major problem. Speakers sometimes panic after making a small error and lose focus completely. In reality, audiences rarely notice tiny mistakes. Staying calm and continuing naturally is usually far more effective than apologizing repeatedly or stopping suddenly.`,
    ],
    'May 6, 2026',
  ),
  icVceTrainrrMakeArticle(
    'blog-4',
    'The Importance Of Clear Diction',
    'Clear pronunciation helps listeners focus on your message, not your words.',
    [
      `Clear diction is an essential part of effective communication. People who pronounce words clearly are easier to understand and often appear more confident and professional. Good diction helps listeners focus on the message instead of struggling to understand unclear speech.`,
      `Many pronunciation problems happen because speakers move their mouths too little while talking. Clear articulation requires active movement of the lips, tongue, and jaw. Reading aloud slowly and practicing difficult phrases can help improve mouth control and speech clarity over time.`,
      `Breathing also affects diction. When speakers rush or do not breathe properly, words often become shorter and less distinct. Controlled breathing helps create smoother pronunciation and better rhythm during conversations or presentations.`,
      `Tongue twisters are popular diction exercises because they train difficult sound combinations and improve articulation speed. At first, these exercises may feel uncomfortable, but regular repetition strengthens speech muscles and improves coordination. Over time, pronunciation becomes more natural and precise.`,
      `Clear diction is especially important during presentations, interviews, podcasts, and public performances. Strong pronunciation helps speakers sound more organized, calm, and expressive. Even small daily practice sessions can create noticeable improvements in communication quality.`,
    ],
    'May 4, 2026',
  ),
  icVceTrainrrMakeArticle(
    'blog-5',
    'How Storytelling Improves Communication',
    'Stories create emotion and memory — facts alone rarely do.',
    [
      `Storytelling is one of the oldest and most powerful forms of communication. People naturally connect with stories because stories create emotions, images, and memories. A good story can make information easier to understand and much more memorable than simple facts alone.`,
      `Strong storytelling requires more than reading words correctly. Speakers must learn how to control tone, pauses, pacing, and emotion. Different moments in a story require different energy levels. Calm moments may need softer delivery, while exciting scenes often require stronger expression and rhythm.`,
      `Storytelling also helps speakers sound more natural. Many people struggle with robotic or monotone speech during presentations. Reading emotional stories aloud trains voice flexibility and encourages more expressive communication. This makes conversations and presentations feel more engaging for listeners.`,
      `Another benefit of storytelling is confidence development. When speakers focus on sharing emotions and ideas instead of worrying about perfection, communication often becomes smoother and more authentic. Audiences usually respond better to sincerity and emotion than to perfectly memorized sentences.`,
      `Practicing storytelling regularly can improve imagination, voice control, pronunciation, and public speaking skills at the same time. It is one of the most enjoyable and effective ways to become a stronger communicator.`,
    ],
    'May 2, 2026',
  ),
  icVceTrainrrMakeArticle(
    'blog-6',
    'Building Better Speaking Habits',
    'Small daily habits compound into lasting speaking skill.',
    [
      `Strong communication skills are built through small daily habits. Many people expect rapid improvement after only a few practice sessions, but speaking skills develop gradually over time. Consistency is far more important than perfection when training diction and public speaking abilities.`,
      `One useful habit is reading aloud every day. Reading trains pronunciation, rhythm, breathing, and articulation simultaneously. Even ten minutes of daily reading practice can improve clarity and speaking comfort after several weeks.`,
      `Recording your own voice is another powerful habit. Many speakers are surprised when they hear how they actually sound during recordings. Listening carefully helps identify unclear pronunciation, speaking speed problems, or nervous habits that may not be noticeable in normal conversations.`,
      `Warm-up exercises are also valuable before important presentations or speaking practice. Simple breathing exercises, articulation drills, and tongue twisters help prepare the voice and improve speech control. Athletes warm up before sports, and speakers benefit from preparing their voices in the same way.`,
      `Patience is extremely important during communication training. Progress may feel slow at first, but regular practice gradually builds confidence, clarity, and stronger speaking habits that become natural over time.`,
    ],
    'Apr 30, 2026',
  ),
  icVceTrainrrMakeArticle(
    'blog-7',
    'Overcoming Fear Of Public Speaking',
    'Fear shrinks with preparation, breathing, and repeated experience.',
    [
      `Fear of public speaking affects millions of people around the world. Even confident individuals sometimes feel nervous before speaking in front of groups. Fear usually comes from worrying about mistakes, judgment, or forgetting important information during presentations.`,
      `One of the best ways to reduce fear is through preparation. Practicing speeches several times helps speakers feel more familiar with their material and reduces uncertainty. Reading aloud and improving diction also helps communication feel smoother and more controlled.`,
      `Another useful strategy is focusing on the message instead of the audience. Nervous speakers often think constantly about how they look or sound. Shifting attention toward helping listeners understand useful information can reduce anxiety and improve concentration.`,
      `Breathing techniques are also extremely effective for calming nerves. Slow breathing reduces physical tension and helps control voice stability. Taking a deep breath before beginning a presentation can immediately make speech sound calmer and more confident.`,
      `Fear should not be viewed as failure. Nervousness simply means something feels important. Most experienced speakers still feel some level of stress before presentations, but they continue speaking despite discomfort. With enough practice and experience, fear gradually becomes smaller and communication becomes more natural, enjoyable, and rewarding.`,
    ],
    'Apr 28, 2026',
  ),
];

export const icVceTrainrrGetBlogArticle = (id: string) =>
  icVceTrainrrBLOG_ARTICLES.find(article => article.id === id);

export const icVceTrainrrDEFAULT_FAVORITE_ARTICLE_ID = 'blog-1';
