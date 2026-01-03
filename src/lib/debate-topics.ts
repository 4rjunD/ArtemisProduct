export interface Argument {
  id: string;
  point: string;
  explanation: string;
}

export interface CounterArgument {
  id: string;
  triggerKeywords: string[];
  challenge: string;
  followUp: string;
}

export interface DebateSide {
  position: "for" | "against";
  label: string;
  description: string;
  starterPrompt: string;
  sampleArguments: Argument[];
  counterArguments: CounterArgument[];
  commonWeaknesses: string[];
}

export interface DebateTopic {
  id: string;
  title: string;
  question: string;
  description: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  ageRange: string;
  estimatedTime: string;
  category: string;
  forSide: DebateSide;
  againstSide: DebateSide;
  reflectionQuestions: string[];
  keyInsight: string;
  isLocked?: boolean;
}

export const debateTopics: DebateTopic[] = [
  {
    id: "smartphones-for-kids",
    title: "Smartphones for Kids",
    question: "Should kids under 13 have their own smartphones?",
    description: "A hot topic in many families. There are real benefits AND real risks. Can you argue both sides?",
    icon: "📱",
    difficulty: "beginner",
    ageRange: "8-14",
    estimatedTime: "10-15 min",
    category: "Technology",
    forSide: {
      position: "for",
      label: "YES - Kids should have smartphones",
      description: "Argue why smartphones are good for kids under 13",
      starterPrompt: "Think about safety, learning, staying connected with family, and preparing for the future.",
      sampleArguments: [
        {
          id: "safety",
          point: "Safety and emergencies",
          explanation: "Kids can call parents or 911 in an emergency. Parents can track their location."
        },
        {
          id: "education",
          point: "Educational apps and resources",
          explanation: "Phones have learning apps, educational videos, and tools for homework."
        },
        {
          id: "connection",
          point: "Staying connected with family",
          explanation: "Kids can text parents, video call grandparents, and stay in touch when apart."
        },
        {
          id: "responsibility",
          point: "Learning responsibility early",
          explanation: "Managing a phone teaches kids about taking care of expensive things and managing time."
        },
        {
          id: "future-prep",
          point: "Preparing for a digital world",
          explanation: "Technology is everywhere. Learning to use it responsibly early is important."
        }
      ],
      counterArguments: [
        {
          id: "safety-counter",
          triggerKeywords: ["safety", "emergency", "911", "call", "track", "location"],
          challenge: "But couldn't a basic flip phone handle emergencies without all the distractions of a smartphone?",
          followUp: "What makes a SMART phone specifically necessary for safety?"
        },
        {
          id: "education-counter",
          triggerKeywords: ["education", "learning", "apps", "homework", "school"],
          challenge: "Studies show most kids use phones for games and social media, not education. How would you make sure it's actually used for learning?",
          followUp: "Is a tablet or computer better for education since it's harder to hide and easier for parents to monitor?"
        },
        {
          id: "connection-counter",
          triggerKeywords: ["connect", "family", "text", "call", "grandparents"],
          challenge: "Kids stayed connected with family for thousands of years without smartphones. Are we solving a real problem or creating new ones?",
          followUp: "Could too much digital connection actually reduce quality face-to-face time?"
        },
        {
          id: "responsibility-counter",
          triggerKeywords: ["responsibility", "manage", "learn", "mature"],
          challenge: "But if a kid isn't responsible enough to have a bedtime without being told, are they ready for unlimited internet access?",
          followUp: "What age IS the right age to learn this responsibility?"
        }
      ],
      commonWeaknesses: [
        "Not addressing screen addiction risks",
        "Ignoring cyberbullying dangers",
        "Assuming kids will use phones responsibly without guidance",
        "Not considering alternatives like basic phones or tablets"
      ]
    },
    againstSide: {
      position: "against",
      label: "NO - Kids should NOT have smartphones",
      description: "Argue why smartphones are harmful for kids under 13",
      starterPrompt: "Think about screen time, mental health, distraction from school, and online dangers.",
      sampleArguments: [
        {
          id: "mental-health",
          point: "Mental health concerns",
          explanation: "Studies link smartphone use to anxiety, depression, and low self-esteem in kids."
        },
        {
          id: "addiction",
          point: "Addictive by design",
          explanation: "Apps are designed to be addictive. Kids' brains are especially vulnerable to this."
        },
        {
          id: "cyberbullying",
          point: "Cyberbullying and online dangers",
          explanation: "Smartphones open doors to bullying, predators, and inappropriate content."
        },
        {
          id: "sleep",
          point: "Ruins sleep",
          explanation: "Screen time before bed hurts sleep quality. Many kids use phones late at night."
        },
        {
          id: "social-skills",
          point: "Hurts face-to-face social skills",
          explanation: "Kids need to learn to talk to people in person, not just through screens."
        }
      ],
      counterArguments: [
        {
          id: "mental-health-counter",
          triggerKeywords: ["mental health", "anxiety", "depression", "self-esteem", "sad"],
          challenge: "But correlation isn't causation. Maybe anxious kids use phones more, not the other way around?",
          followUp: "How do we know phones CAUSE mental health issues versus just being associated with them?"
        },
        {
          id: "addiction-counter",
          triggerKeywords: ["addict", "design", "hook", "brain", "dopamine"],
          challenge: "Books, TV, and video games were all called 'addictive' too. Isn't this just the latest moral panic?",
          followUp: "What makes smartphone addiction different from past technology concerns?"
        },
        {
          id: "danger-counter",
          triggerKeywords: ["danger", "bully", "predator", "inappropriate", "content"],
          challenge: "Parents can use parental controls and monitoring. Isn't it better to teach kids to navigate these risks with guidance?",
          followUp: "If we protect kids from everything, how will they learn to handle the real world?"
        },
        {
          id: "social-counter",
          triggerKeywords: ["social", "face-to-face", "talk", "person", "friends"],
          challenge: "But kids today DO socialize through phones. Isn't that just how friendship works now?",
          followUp: "Are you sure in-person skills are more important than digital communication skills?"
        }
      ],
      commonWeaknesses: [
        "Ignoring legitimate safety benefits",
        "Not offering alternatives",
        "Assuming all phone use is bad",
        "Being unrealistic about the modern world"
      ]
    },
    reflectionQuestions: [
      "Which side was harder to argue? Why?",
      "Did arguing the other side change your personal opinion at all?",
      "What's ONE good point from the side you disagree with?",
      "Is there a middle ground solution that addresses both sides' concerns?"
    ],
    keyInsight: "Most real-world debates aren't about one side being completely right. The best solutions often combine good ideas from both perspectives."
  },
  {
    id: "homework-ban",
    title: "Ban Homework",
    question: "Should homework be banned for elementary and middle school students?",
    description: "Students spend hours on homework. Is it helping them learn, or just stressing everyone out?",
    icon: "📚",
    difficulty: "beginner",
    ageRange: "8-14",
    estimatedTime: "10-15 min",
    category: "Education",
    forSide: {
      position: "for",
      label: "YES - Ban homework",
      description: "Argue why homework should be eliminated",
      starterPrompt: "Think about stress, family time, sleep, and whether homework actually helps learning.",
      sampleArguments: [
        {
          id: "stress",
          point: "Reduces stress and burnout",
          explanation: "Kids are already in school 6-7 hours. They need time to decompress, not more work."
        },
        {
          id: "family-time",
          point: "More family time",
          explanation: "Evenings should be for family dinners, activities, and bonding - not homework battles."
        },
        {
          id: "no-evidence",
          point: "Research shows limited benefits",
          explanation: "Studies show homework has little academic benefit for younger students."
        },
        {
          id: "inequality",
          point: "Creates inequality",
          explanation: "Kids with educated parents and quiet homes have advantages. Homework widens the gap."
        },
        {
          id: "creativity",
          point: "Kills creativity and curiosity",
          explanation: "Free time lets kids explore interests, play, and develop creativity."
        }
      ],
      counterArguments: [
        {
          id: "stress-counter",
          triggerKeywords: ["stress", "burnout", "pressure", "anxious", "tired"],
          challenge: "But some stress is good - it builds resilience. Shouldn't kids learn to handle deadlines?",
          followUp: "How will kids handle college or work if they never learned to manage homework?"
        },
        {
          id: "research-counter",
          triggerKeywords: ["research", "studies", "evidence", "benefit", "learn"],
          challenge: "The same research shows homework DOES help in high school. Shouldn't we build those habits early?",
          followUp: "If we wait until high school to introduce homework, won't the adjustment be even harder?"
        },
        {
          id: "practice-counter",
          triggerKeywords: ["practice", "skill", "repeat", "master"],
          challenge: "Musicians practice at home. Athletes train at home. Why shouldn't students study at home?",
          followUp: "Isn't repetition necessary to truly learn something?"
        }
      ],
      commonWeaknesses: [
        "Not addressing the need for practice and reinforcement",
        "Ignoring that some homework can be meaningful",
        "Assuming all homework is busywork",
        "Not offering alternatives for skill-building"
      ]
    },
    againstSide: {
      position: "against",
      label: "NO - Keep homework",
      description: "Argue why homework is valuable and should continue",
      starterPrompt: "Think about practice, responsibility, parent involvement, and preparation for future.",
      sampleArguments: [
        {
          id: "practice",
          point: "Practice makes perfect",
          explanation: "You can't master math or reading without practice. Class time isn't enough."
        },
        {
          id: "responsibility",
          point: "Builds responsibility",
          explanation: "Managing homework teaches time management and accountability."
        },
        {
          id: "parent-involvement",
          point: "Keeps parents involved",
          explanation: "Homework lets parents see what kids are learning and help when needed."
        },
        {
          id: "review",
          point: "Reinforces classroom learning",
          explanation: "Reviewing material at home helps move knowledge to long-term memory."
        },
        {
          id: "preparation",
          point: "Prepares for higher education",
          explanation: "High school, college, and careers all require independent work. Start building habits now."
        }
      ],
      counterArguments: [
        {
          id: "practice-counter",
          triggerKeywords: ["practice", "master", "skill", "repetition"],
          challenge: "But practicing the WRONG way reinforces bad habits. Without a teacher, how do you know you're practicing correctly?",
          followUp: "Is it better to do less practice with feedback than more practice alone?"
        },
        {
          id: "responsibility-counter",
          triggerKeywords: ["responsibility", "manage", "time", "accountab"],
          challenge: "Kids can learn responsibility through chores, sports, and hobbies. Why does it have to be homework?",
          followUp: "Are there better ways to teach responsibility that don't add academic stress?"
        },
        {
          id: "parent-counter",
          triggerKeywords: ["parent", "involved", "help", "family"],
          challenge: "What about kids whose parents work late, don't speak English, or didn't finish school themselves?",
          followUp: "Does homework actually help those families or hurt them?"
        },
        {
          id: "prep-counter",
          triggerKeywords: ["college", "future", "career", "prepare", "high school"],
          challenge: "Finland has almost no homework and their students outperform Americans. Maybe less is more?",
          followUp: "What if the key to success isn't more work, but better work during school hours?"
        }
      ],
      commonWeaknesses: [
        "Ignoring the stress homework causes",
        "Assuming all families can help equally",
        "Not distinguishing between good and bad homework",
        "Overlooking research on diminishing returns"
      ]
    },
    reflectionQuestions: [
      "What kind of homework is actually useful? What kind is just busywork?",
      "How much homework is too much?",
      "Could there be a better system than traditional homework?",
      "Did you learn anything from arguing the side you disagreed with?"
    ],
    keyInsight: "The debate isn't really 'homework vs. no homework' - it's about what KIND of homework, how MUCH, and whether there are better alternatives for learning outside school."
  },
  {
    id: "lie-protect-feelings",
    title: "White Lies",
    question: "Is it okay to lie to protect someone's feelings?",
    description: "Your friend asks if you like their haircut. You don't. Do you tell the truth or spare their feelings?",
    icon: "🤥",
    difficulty: "intermediate",
    ageRange: "10-14",
    estimatedTime: "12-18 min",
    category: "Ethics",
    forSide: {
      position: "for",
      label: "YES - White lies are okay",
      description: "Argue why small lies to protect feelings are acceptable",
      starterPrompt: "Think about kindness, relationships, harmless situations, and social harmony.",
      sampleArguments: [
        {
          id: "kindness",
          point: "Kindness matters more than brutal honesty",
          explanation: "Sometimes being kind is more important than being technically truthful."
        },
        {
          id: "harmless",
          point: "Some lies cause no real harm",
          explanation: "Saying 'I love your gift!' when you don't hurts no one and makes someone happy."
        },
        {
          id: "relationships",
          point: "Protects relationships",
          explanation: "Constant brutal honesty can damage friendships. White lies smooth social interactions."
        },
        {
          id: "timing",
          point: "Truth can wait for the right moment",
          explanation: "Telling someone their presentation was bad RIGHT before a big meeting isn't helpful."
        },
        {
          id: "self-esteem",
          point: "Protects self-esteem",
          explanation: "Crushing someone's confidence over something minor isn't worth it."
        }
      ],
      counterArguments: [
        {
          id: "kindness-counter",
          triggerKeywords: ["kind", "nice", "care", "feelings", "hurt"],
          challenge: "But if they find out you lied, doesn't that hurt MORE than the original truth would have?",
          followUp: "Is a lie really kind if it damages trust when discovered?"
        },
        {
          id: "harmless-counter",
          triggerKeywords: ["harmless", "small", "minor", "little", "no harm"],
          challenge: "Who decides what's 'harmless'? Your small lie might matter a lot to them.",
          followUp: "Where do you draw the line between harmless and harmful lies?"
        },
        {
          id: "slippery-counter",
          triggerKeywords: ["sometimes", "certain", "situation", "depends"],
          challenge: "If lying is okay 'sometimes,' doesn't that make it easier to justify bigger lies later?",
          followUp: "How do you stop small lies from becoming a habit?"
        }
      ],
      commonWeaknesses: [
        "Not defining where white lies cross into real lies",
        "Ignoring the trust issues lies create",
        "Assuming you know what's best for others",
        "Not considering that honest feedback helps people grow"
      ]
    },
    againstSide: {
      position: "against",
      label: "NO - Always tell the truth",
      description: "Argue why honesty is always the best policy",
      starterPrompt: "Think about trust, respect, personal growth, and the slippery slope of lying.",
      sampleArguments: [
        {
          id: "trust",
          point: "Trust requires honesty",
          explanation: "Relationships are built on trust. Even small lies chip away at that foundation."
        },
        {
          id: "respect",
          point: "Honesty shows respect",
          explanation: "Lying to someone assumes they can't handle the truth. That's disrespectful."
        },
        {
          id: "growth",
          point: "Truth helps people grow",
          explanation: "Honest feedback helps people improve. Lies keep them stuck."
        },
        {
          id: "slippery-slope",
          point: "Small lies lead to bigger ones",
          explanation: "Once you start justifying 'small' lies, it's easier to justify bigger ones."
        },
        {
          id: "simplicity",
          point: "Honesty is simpler",
          explanation: "Lies require more lies to maintain. Truth is easier to remember."
        }
      ],
      counterArguments: [
        {
          id: "trust-counter",
          triggerKeywords: ["trust", "honest", "foundation", "relationship"],
          challenge: "But what about surprise parties? Those require lying. Does that destroy trust?",
          followUp: "Are there any situations where you'd agree a lie is acceptable?"
        },
        {
          id: "respect-counter",
          triggerKeywords: ["respect", "handle", "adult", "mature"],
          challenge: "Sometimes people genuinely CAN'T handle the truth in that moment. Isn't timing part of respect?",
          followUp: "Is there a difference between lying and just... not saying everything?"
        },
        {
          id: "growth-counter",
          triggerKeywords: ["grow", "improve", "feedback", "better"],
          challenge: "What if your honest opinion is wrong? What if you're criticizing something that's actually fine?",
          followUp: "Do people always need to hear your opinion, even when they didn't ask?"
        },
        {
          id: "brutal-counter",
          triggerKeywords: ["always", "never", "every", "all"],
          challenge: "'Your baby is ugly.' 'Your cooking is terrible.' Should you say those things just because they're true?",
          followUp: "Isn't there a difference between not lying and volunteering harsh truths?"
        }
      ],
      commonWeaknesses: [
        "Being too rigid and absolutist",
        "Confusing 'not lying' with 'saying everything you think'",
        "Not considering context and timing",
        "Ignoring that some truths are opinions, not facts"
      ]
    },
    reflectionQuestions: [
      "Is not saying something the same as lying?",
      "What's the difference between a white lie and a 'real' lie?",
      "Can you be honest AND kind at the same time?",
      "When someone asks 'how do I look?' - do they want the truth or reassurance?"
    ],
    keyInsight: "This debate reveals that 'honesty' is more complicated than just true/false. There's a difference between lying, staying silent, and finding kind ways to tell the truth."
  },
  {
    id: "school-start-time",
    title: "Later School Start",
    question: "Should middle and high school start at 9 AM or later?",
    description: "Scientists say teens need more sleep. But changing school times affects everything. Is it worth it?",
    icon: "⏰",
    difficulty: "intermediate",
    ageRange: "10-14",
    estimatedTime: "12-15 min",
    category: "Education",
    forSide: {
      position: "for",
      label: "YES - Start school later",
      description: "Argue why schools should start at 9 AM or later",
      starterPrompt: "Think about sleep science, mental health, academic performance, and teen biology.",
      sampleArguments: [
        {
          id: "sleep-science",
          point: "Teen biology requires more sleep",
          explanation: "Puberty shifts the sleep cycle later. Teens literally can't fall asleep early."
        },
        {
          id: "mental-health",
          point: "Better mental health",
          explanation: "Sleep deprivation is linked to depression, anxiety, and teen suicide risk."
        },
        {
          id: "grades",
          point: "Improved academic performance",
          explanation: "Well-rested students focus better, learn more, and get better grades."
        },
        {
          id: "safety",
          point: "Safer roads",
          explanation: "Drowsy teen drivers cause accidents. Later start times mean safer driving."
        },
        {
          id: "health",
          point: "Better physical health",
          explanation: "Sleep affects immune system, weight, and overall health."
        }
      ],
      counterArguments: [
        {
          id: "work-counter",
          triggerKeywords: ["sleep", "tired", "rest", "wake"],
          challenge: "Adults have to wake up early for work. Shouldn't school prepare kids for that reality?",
          followUp: "Are we setting kids up for failure by letting them sleep in?"
        },
        {
          id: "same-counter",
          triggerKeywords: ["biology", "natural", "puberty", "body"],
          challenge: "Won't teens just stay up even LATER if school starts later? They'll still be tired.",
          followUp: "Does the start time actually change anything if bedtimes don't change?"
        },
        {
          id: "sports-counter",
          triggerKeywords: ["perform", "focus", "better", "learn"],
          challenge: "What about after-school sports and activities? They'd end so late parents couldn't watch.",
          followUp: "Have you considered the ripple effects on extracurriculars?"
        }
      ],
      commonWeaknesses: [
        "Not addressing childcare problems for working parents",
        "Ignoring after-school activity impacts",
        "Assuming teens will actually sleep more",
        "Not considering costs of schedule changes"
      ]
    },
    againstSide: {
      position: "against",
      label: "NO - Keep current start times",
      description: "Argue why school start times should stay as they are",
      starterPrompt: "Think about working parents, after-school activities, buses, and real-world preparation.",
      sampleArguments: [
        {
          id: "parents",
          point: "Working parents need early start times",
          explanation: "Parents need to drop kids off before work. Later start times create childcare problems."
        },
        {
          id: "activities",
          point: "After-school activities suffer",
          explanation: "Sports, clubs, and jobs would push later into evening, ending after dark."
        },
        {
          id: "buses",
          point: "Bus schedule chaos",
          explanation: "Schools share buses. Changing one school's schedule affects the whole district."
        },
        {
          id: "real-world",
          point: "Prepares for real world",
          explanation: "Jobs start early. Learning to function on a schedule is an important life skill."
        },
        {
          id: "responsibility",
          point: "Teens should learn to sleep earlier",
          explanation: "The problem is late-night phone use, not school times. Teach better sleep habits."
        }
      ],
      counterArguments: [
        {
          id: "parents-counter",
          triggerKeywords: ["parent", "work", "childcare", "drop off"],
          challenge: "But isn't kids' health more important than parents' convenience? Should we sacrifice teens' wellbeing for scheduling?",
          followUp: "Other countries have solved this. Why can't we?"
        },
        {
          id: "activities-counter",
          triggerKeywords: ["sport", "activit", "club", "job"],
          challenge: "Couldn't activities just start before school instead of after? Some already do.",
          followUp: "Are activities more important than academic performance and mental health?"
        },
        {
          id: "realworld-counter",
          triggerKeywords: ["real world", "job", "adult", "prepare"],
          challenge: "Many adults DON'T work 9-5 anymore. And adult bodies are different from teen bodies.",
          followUp: "Should we sacrifice teen health to prepare for a work schedule they might not even have?"
        },
        {
          id: "phone-counter",
          triggerKeywords: ["phone", "screen", "habit", "choice"],
          challenge: "Even teens who put phones away and try to sleep early struggle. This is biology, not laziness.",
          followUp: "Are you blaming teens for something they can't fully control?"
        }
      ],
      commonWeaknesses: [
        "Ignoring sleep science and teen biology",
        "Prioritizing convenience over health",
        "Assuming teens are just lazy",
        "Not exploring creative schedule solutions"
      ]
    },
    reflectionQuestions: [
      "What stakeholders (parents, teachers, students, etc.) are affected by this decision?",
      "Are there creative solutions that address both sides' concerns?",
      "How would YOU feel if school started at 7 AM vs 9 AM?",
      "Should policy be based on what's convenient or what the science shows?"
    ],
    keyInsight: "This debate shows how solving one problem (teen sleep) can create other problems (childcare, schedules). Good policy requires considering ALL the people affected, not just one group."
  },
  {
    id: "zoos-ethical",
    title: "Are Zoos Ethical?",
    question: "Should zoos exist, or should they be phased out?",
    description: "Zoos say they help conservation and education. Critics say they're animal prisons. Who's right?",
    icon: "🦁",
    difficulty: "advanced",
    ageRange: "11-14",
    estimatedTime: "15-20 min",
    category: "Ethics",
    isLocked: true,
    forSide: {
      position: "for",
      label: "YES - Zoos should exist",
      description: "Argue why zoos are valuable and ethical",
      starterPrompt: "Think about conservation, education, research, and species survival.",
      sampleArguments: [],
      counterArguments: [],
      commonWeaknesses: []
    },
    againstSide: {
      position: "against",
      label: "NO - Phase out zoos",
      description: "Argue why zoos are unethical and should be replaced",
      starterPrompt: "Think about animal welfare, natural habitats, and whether captivity is ever justified.",
      sampleArguments: [],
      counterArguments: [],
      commonWeaknesses: []
    },
    reflectionQuestions: [],
    keyInsight: ""
  }
];

export function getDebateTopicById(id: string): DebateTopic | undefined {
  return debateTopics.find(t => t.id === id);
}

export function getAvailableDebateTopics(): DebateTopic[] {
  return debateTopics.filter(t => !t.isLocked);
}
