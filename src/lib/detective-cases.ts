export interface Clue {
  id: string;
  title: string;
  description: string;
  location: string;
  isRevealed: boolean;
  icon: string;
}

export interface Suspect {
  id: string;
  name: string;
  age: string;
  description: string;
  alibi: string;
  motive: string;
  image: string;
}

export interface Case {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  ageRange: string;
  estimatedTime: string;
  description: string;
  fullStory: string;
  setting: string;
  clues: Clue[];
  suspects: Suspect[];
  solution: {
    culprit: string;
    explanation: string;
    keyClues: string[];
  };
  guidingQuestions: string[];
  isCompleted?: boolean;
  isLocked?: boolean;
}

export const cases: Case[] = [
  {
    id: "missing-mascot",
    title: "The Missing Mascot",
    difficulty: "beginner",
    ageRange: "6-10",
    estimatedTime: "10-15 min",
    description: "The school mascot costume has vanished right before the big game! Can you find out who took it?",
    fullStory: `It's Friday afternoon at Oakwood Elementary, and everyone is excited for tonight's big basketball game. The school mascot, a friendly owl costume named "Hootie," has been the good luck charm for 10 years.

But when Coach Martinez went to get Hootie from the storage closet at 3:00 PM, the costume was GONE! The game starts at 6:00 PM, and the whole school is counting on you to solve this mystery.

The costume was last seen at 2:00 PM when the janitor, Mr. Chen, was cleaning near the storage room. Since then, three people were seen near the storage closet.

Your job: Find the clues, interview the suspects, and figure out who took Hootie and why!`,
    setting: "Oakwood Elementary School",
    clues: [
      {
        id: "clue-1",
        title: "Orange Thread",
        description: "A small piece of orange thread caught on the storage closet door handle. It looks like it came from clothing.",
        location: "Storage Closet Door",
        isRevealed: false,
        icon: "🧵"
      },
      {
        id: "clue-2",
        title: "Muddy Footprints",
        description: "Small muddy footprints leading from the back playground door toward the storage closet. They're about the size of a kid's sneaker.",
        location: "Hallway Floor",
        isRevealed: false,
        icon: "👟"
      },
      {
        id: "clue-3",
        title: "Feather on Ground",
        description: "One of Hootie's brown feathers found near the gym exit door, not the main entrance.",
        location: "Near Gym Exit",
        isRevealed: false,
        icon: "🪶"
      },
      {
        id: "clue-4",
        title: "Janitor's Note",
        description: "Mr. Chen's cleaning log shows he left the storage closet UNLOCKED at 2:15 PM because he was coming right back, but got called to clean up a spill in the cafeteria.",
        location: "Janitor's Office",
        isRevealed: false,
        icon: "📝"
      },
      {
        id: "clue-5",
        title: "Text Message Screenshot",
        description: "A screenshot shared in the school group chat from 2:30 PM. Emma texted her friend: 'You won't BELIEVE what I'm about to do! This will be SO funny! 🦉'",
        location: "Student's Phone",
        isRevealed: false,
        icon: "📱"
      }
    ],
    suspects: [
      {
        id: "suspect-1",
        name: "Emma Rodriguez",
        age: "11 years old",
        description: "Class clown who loves pranks. Known for her funny jokes but sometimes takes things too far. She was wearing an orange hoodie today.",
        alibi: "Says she was in the library reading from 2:00-3:00 PM. The librarian confirms she was there, but left briefly around 2:25 PM to 'use the bathroom.'",
        motive: "Wanted to pull a prank by hiding the mascot and revealing it dramatically at the game for laughs.",
        image: "👧"
      },
      {
        id: "suspect-2",
        name: "Tyler Brooks",
        age: "12 years old",
        description: "Star player on the rival school's team who was visiting for a tour. Wearing clean white sneakers.",
        alibi: "Was with Principal Hayes on a school tour from 1:30-3:00 PM. The principal confirms he never left her sight.",
        motive: "Could want to sabotage the game so his team has better luck.",
        image: "👦"
      },
      {
        id: "suspect-3",
        name: "Mr. Patterson",
        age: "45 years old",
        description: "The grumpy art teacher who thinks school spirit events are 'a waste of time.' Always wears a blue jacket.",
        alibi: "Claims he was in the art room preparing for Monday's class. No one can confirm this.",
        motive: "Has complained about the 'noisy mascot' disrupting his classes during pep rallies.",
        image: "👨‍🏫"
      }
    ],
    solution: {
      culprit: "Emma Rodriguez",
      explanation: "Emma took Hootie as a prank. The orange thread matches her orange hoodie. The muddy footprints are kid-sized (not adult like Mr. Patterson). Her text message at 2:30 PM hints at what she was planning. She left the library at 2:25 PM - just enough time to grab the costume from the unlocked closet. The feather near the gym exit shows she took it out the back way to hide it. Tyler has a solid alibi with the principal the whole time.",
      keyClues: ["clue-1", "clue-2", "clue-5"]
    },
    guidingQuestions: [
      "Look at the orange thread. Who was wearing something orange today?",
      "The footprints are small - could they belong to an adult or a child?",
      "Check the timing. When was the closet unlocked, and who doesn't have a solid alibi for that time?",
      "What does Emma's text message tell us about her plans?",
      "Tyler has someone confirming his location the whole time. What does that tell you?",
      "If Mr. Patterson did it, wouldn't his footprints be bigger?"
    ]
  },
  {
    id: "science-fair-sabotage",
    title: "Science Fair Sabotage",
    difficulty: "intermediate",
    ageRange: "8-12",
    estimatedTime: "15-20 min",
    description: "Someone ruined the winning science project the night before the regional competition. Was it jealousy, revenge, or something else?",
    fullStory: `The Regional Science Fair is tomorrow, and Oakwood Middle School's best project - a working model volcano by Maya Chen - was going to represent the school.

But this morning, the volcano was found destroyed in the science room. The paper-mâché is torn, the wiring is cut, and weeks of work are ruined.

Maya is devastated. The science room was locked overnight, but Mrs. Torres (the science teacher) says her keys went missing for about an hour yesterday after school.

Three students stayed late for various activities. One of them must have taken the keys and come back later. But who? And why would they do something so mean?`,
    setting: "Oakwood Middle School Science Room",
    clues: [
      {
        id: "clue-1",
        title: "Scissors with Residue",
        description: "A pair of scissors found under a desk with bits of paper-mâché stuck to them. They have the initials 'JM' scratched into the handle.",
        location: "Under Lab Desk",
        isRevealed: false,
        icon: "✂️"
      },
      {
        id: "clue-2",
        title: "Angry Journal Entry",
        description: "A torn page from a notebook found in the trash: '...it's not FAIR. My project was just as good. The judges are going to feel so stupid when they see...' The rest is torn off.",
        location: "Trash Can",
        isRevealed: false,
        icon: "📓"
      },
      {
        id: "clue-3",
        title: "Security Camera Footage",
        description: "The hallway camera shows someone entering the science room at 8:47 PM wearing a dark hoodie. They left at 9:02 PM. Face not visible.",
        location: "Security Office",
        isRevealed: false,
        icon: "📹"
      },
      {
        id: "clue-4",
        title: "Mrs. Torres's Statement",
        description: "Mrs. Torres found her keys on her desk the next morning, but she KNOWS she put them in her drawer. Someone returned them.",
        location: "Teacher Interview",
        isRevealed: false,
        icon: "🔑"
      },
      {
        id: "clue-5",
        title: "Text Conversation",
        description: "Jake texted his friend at 8:30 PM: 'Can't hang out tonight, stuck at home. Mom grounded me for the bad grade.'",
        location: "Phone Records",
        isRevealed: false,
        icon: "📱"
      },
      {
        id: "clue-6",
        title: "Social Media Post",
        description: "Sophie posted on Instagram at 9:15 PM from downtown: 'Movie night with fam! 🍿' with a location tag at the movie theater.",
        location: "Social Media",
        isRevealed: false,
        icon: "📸"
      }
    ],
    suspects: [
      {
        id: "suspect-1",
        name: "Jake Morrison",
        age: "13 years old",
        description: "His project came in second place. He's been openly upset about losing to Maya. His initials are 'JM' and he owns those scissors.",
        alibi: "Says he was grounded and home all night. His mom confirms he didn't leave the house.",
        motive: "Jealous that his robot project lost to Maya's volcano. He worked really hard and felt cheated.",
        image: "👦"
      },
      {
        id: "suspect-2",
        name: "Sophie Lee",
        age: "12 years old",
        description: "Used to be best friends with Maya until they had a big fight last month. She didn't even enter the science fair.",
        alibi: "Was at the movies with her family from 7:30-10:00 PM.",
        motive: "Still angry at Maya from their fight. Maybe wanted revenge?",
        image: "👧"
      },
      {
        id: "suspect-3",
        name: "Derek Patel",
        age: "13 years old",
        description: "Quiet kid who got third place. Doesn't seem to care much about winning. He stayed late for chess club.",
        alibi: "Chess club ended at 5:00 PM. Says he went straight home. His parents were at work until 9 PM, so no one can confirm.",
        motive: "Unclear. He never seemed upset about the results. But he did have opportunity to take the keys.",
        image: "🧑"
      }
    ],
    solution: {
      culprit: "Derek Patel",
      explanation: "Derek is the culprit. The journal entry about the judges 'feeling stupid' is his - he's actually very competitive but hides it. Jake has a solid alibi (his mom confirms he was grounded at home, and his text at 8:30 proves he couldn't be at school at 8:47). Sophie was at the movies during the sabotage (her Instagram proves location). Derek's scissors (JM) were actually borrowed - Jake lent them to him for his project last week. Derek had no alibi (parents at work) and the opportunity to take the keys during chess club.",
      keyClues: ["clue-2", "clue-3", "clue-5", "clue-6"]
    },
    guidingQuestions: [
      "The scissors say 'JM' but could someone else have been using them?",
      "Look at the timeline. Who has a confirmed alibi at 8:47 PM when the camera caught someone?",
      "The journal entry seems personal. What does 'judges feeling stupid' suggest about the writer?",
      "Jake was grounded - can he really be at school if his mom says he was home?",
      "Sophie's Instagram has a location tag. What does that prove?",
      "Who had the chance to take Mrs. Torres's keys and had no one to confirm where they were that night?"
    ],
    isLocked: true
  },
  {
    id: "missing-time-capsule",
    title: "The Vanishing Time Capsule",
    difficulty: "advanced",
    ageRange: "10-14",
    estimatedTime: "20-25 min",
    description: "A 25-year-old time capsule was about to be opened at the school reunion, but it's disappeared. Old secrets and new suspects collide!",
    fullStory: `Oakwood High is celebrating its 50th anniversary with a big reunion. The highlight: opening a time capsule buried 25 years ago by the Class of 1999.

The night before the ceremony, the capsule was dug up and placed in Principal Hayes's office for safekeeping. But this morning, it's gone - along with whatever secrets it held.

Several people from the Class of '99 were in the building last night, helping set up for the reunion. The capsule reportedly contained a "confession letter" that someone wrote as a teenager.

Could someone want to keep their 25-year-old secret buried forever?`,
    setting: "Oakwood High School - 50th Anniversary Reunion",
    clues: [],
    suspects: [],
    solution: {
      culprit: "TBD",
      explanation: "Coming soon",
      keyClues: []
    },
    guidingQuestions: [],
    isLocked: true
  }
];

export function getCaseById(id: string): Case | undefined {
  return cases.find(c => c.id === id);
}

export function getAvailableCases(): Case[] {
  return cases.filter(c => !c.isLocked);
}
