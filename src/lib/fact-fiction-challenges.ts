export interface Challenge {
  id: string;
  type: "headline" | "source" | "fallacy" | "statistic" | "image-claim";
  content: {
    headline?: string;
    source?: string;
    article?: string;
    claim?: string;
    imageDescription?: string;
    options?: { id: string; text: string; source?: string }[];
  };
  isTrue: boolean;
  correctAnswer?: string; // For multiple choice
  explanation: string;
  redFlags: string[];
  greenFlags?: string[];
  skill: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface ChallengeSet {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  ageRange: string;
  challenges: Challenge[];
  isLocked: boolean;
  skillsFocused: string[];
  completionMessage: string;
}

export const challengeSets: ChallengeSet[] = [
  {
    id: "headline-heroes",
    title: "Headline Heroes",
    description: "Can you spot the difference between real news and fake headlines? Test your skills!",
    icon: "📰",
    category: "News Literacy",
    difficulty: "beginner",
    estimatedTime: "10-12 min",
    ageRange: "10-14",
    isLocked: false,
    skillsFocused: ["Headline Analysis", "Source Checking", "Critical Reading"],
    completionMessage: "You've learned to look beyond catchy headlines!",
    challenges: [
      {
        id: "h1",
        type: "headline",
        content: {
          headline: "Scientists Discover New Species of Glow-in-the-Dark Shark in Deep Ocean",
          source: "National Geographic",
        },
        isTrue: true,
        explanation: "This is TRUE! In 2021, scientists discovered kitefin sharks that glow in the dark through bioluminescence. Real scientific discoveries often sound amazing but come from reputable sources.",
        redFlags: [],
        greenFlags: [
          "Comes from National Geographic, a trusted science publication",
          "Specific details (species type, location)",
          "Bioluminescence is a real phenomenon in deep-sea creatures"
        ],
        skill: "Source Recognition",
        difficulty: "easy"
      },
      {
        id: "h2",
        type: "headline",
        content: {
          headline: "BREAKING: Chocolate Officially Declared a Vegetable by FDA!!!",
          source: "ViralNewsNow.click",
        },
        isTrue: false,
        explanation: "This is FAKE! The FDA (Food and Drug Administration) has never declared chocolate a vegetable. This uses tricks like ALL CAPS, multiple exclamation marks, and comes from an unknown clickbait site.",
        redFlags: [
          "ALL CAPS and excessive punctuation (!!!)",
          "Unknown source with '.click' domain",
          "Too good to be true for chocolate lovers",
          "No specific date or official statement referenced"
        ],
        skill: "Clickbait Detection",
        difficulty: "easy"
      },
      {
        id: "h3",
        type: "headline",
        content: {
          headline: "Local Teen Raises $50,000 for Animal Shelter Through Lemonade Stand",
          source: "Hometown Daily News",
        },
        isTrue: true,
        explanation: "This is REALISTIC! While we made this up as an example, stories like this happen regularly. Local news often covers community feel-good stories. The amount is impressive but achievable, and it's a local source covering local news.",
        redFlags: [],
        greenFlags: [
          "Local news covering local story",
          "Specific, realistic amount",
          "Heartwarming but believable"
        ],
        skill: "Realistic Assessment",
        difficulty: "easy"
      },
      {
        id: "h4",
        type: "headline",
        content: {
          headline: "Study Shows Video Games Make Kids 300% Smarter Instantly",
          source: "GamerFacts.net",
        },
        isTrue: false,
        explanation: "This is FAKE! No study can show something makes you '300% smarter instantly.' Real research uses careful measurements over time. The source 'GamerFacts.net' isn't a scientific publication, and the claim is designed to appeal to gamers.",
        redFlags: [
          "Impossible claim (300% smarter 'instantly')",
          "No specific study or researchers named",
          "Source has obvious bias (GamerFacts)",
          "Intelligence can't be measured in simple percentages"
        ],
        skill: "Statistical Skepticism",
        difficulty: "medium"
      },
      {
        id: "h5",
        type: "headline",
        content: {
          headline: "NASA Confirms Water Ice Found on Moon's South Pole",
          source: "NASA.gov",
        },
        isTrue: true,
        explanation: "This is TRUE! NASA has confirmed water ice at the Moon's south pole, which is why future Moon missions target that area. Government agency websites (.gov) are generally reliable for official announcements.",
        redFlags: [],
        greenFlags: [
          "Official government source (.gov domain)",
          "Specific location mentioned (south pole)",
          "Matches other reported scientific findings"
        ],
        skill: "Source Verification",
        difficulty: "easy"
      },
      {
        id: "h6",
        type: "headline",
        content: {
          headline: "You Won't BELIEVE What This Celebrity Said About Your Zodiac Sign!",
          source: "CelebGossipDaily.com",
        },
        isTrue: false,
        explanation: "This is CLICKBAIT! Phrases like 'You won't BELIEVE' are designed to make you click without giving real information. It's vague about which celebrity and what they said, using curiosity as a trap.",
        redFlags: [
          "'You won't BELIEVE' is classic clickbait language",
          "Vague - doesn't name the celebrity",
          "Gossip site, not a news source",
          "Zodiac signs aren't scientifically meaningful"
        ],
        skill: "Clickbait Detection",
        difficulty: "easy"
      },
      {
        id: "h7",
        type: "headline",
        content: {
          headline: "New Research Links Regular Reading to Improved Vocabulary in Children",
          source: "Journal of Educational Psychology",
        },
        isTrue: true,
        explanation: "This is TRUE and WELL-SOURCED! Academic journals publish peer-reviewed research. The claim is reasonable and specific. Many studies confirm that reading improves vocabulary.",
        redFlags: [],
        greenFlags: [
          "Academic journal source",
          "Reasonable, specific claim",
          "Uses 'links' instead of 'proves' (honest scientific language)"
        ],
        skill: "Academic Source Recognition",
        difficulty: "medium"
      },
      {
        id: "h8",
        type: "headline",
        content: {
          headline: "EXPOSED: Government Hiding Alien Base Under Local Shopping Mall",
          source: "TruthRevealed.info",
        },
        isTrue: false,
        explanation: "This is FAKE! Words like 'EXPOSED' and sites ending in '.info' with dramatic names are red flags. Claims about hidden alien bases have no evidence and require extraordinary proof.",
        redFlags: [
          "'EXPOSED' is sensationalist language",
          "Extraordinary claim with no evidence",
          "Conspiracy theory pattern",
          "Unknown source with dramatic name"
        ],
        skill: "Conspiracy Detection",
        difficulty: "easy"
      }
    ]
  },
  {
    id: "source-detective",
    title: "Source Detective",
    description: "Not all sources are created equal. Learn to spot the difference between reliable and unreliable sources.",
    icon: "🔍",
    category: "Source Evaluation",
    difficulty: "intermediate",
    estimatedTime: "12-15 min",
    ageRange: "11-15",
    isLocked: false,
    skillsFocused: ["Source Credibility", "Bias Detection", "Cross-Referencing"],
    completionMessage: "You're now a Source Detective! Always check where information comes from.",
    challenges: [
      {
        id: "s1",
        type: "source",
        content: {
          claim: "A new study shows that eating breakfast improves test scores in students.",
          options: [
            { id: "a", text: "Harvard Medical School published research in the American Journal of Clinical Nutrition", source: "Academic" },
            { id: "b", text: "Your friend's older brother said he read it somewhere", source: "Hearsay" },
            { id: "c", text: "A cereal company's website with a 'Studies show...' claim", source: "Biased" },
            { id: "d", text: "A random blog post with no author listed", source: "Unverified" }
          ]
        },
        isTrue: true,
        correctAnswer: "a",
        explanation: "Harvard Medical School and peer-reviewed journals are credible sources. The cereal company has financial motivation to promote breakfast. 'My friend's brother' is hearsay, and anonymous blogs lack accountability.",
        redFlags: [
          "Companies selling products have bias",
          "Hearsay ('someone said') isn't verifiable",
          "No author = no accountability"
        ],
        greenFlags: [
          "Universities conduct unbiased research",
          "Peer-reviewed journals check accuracy",
          "Named institutions can be verified"
        ],
        skill: "Source Hierarchy",
        difficulty: "medium"
      },
      {
        id: "s2",
        type: "source",
        content: {
          claim: "Climate change is affecting polar bear populations.",
          options: [
            { id: "a", text: "World Wildlife Fund (WWF) conservation report", source: "Conservation Org" },
            { id: "b", text: "An oil company's environmental statement", source: "Conflicted Interest" },
            { id: "c", text: "NASA and NOAA joint climate research", source: "Government Science" },
            { id: "d", text: "A viral social media post with a sad polar bear photo", source: "Social Media" }
          ]
        },
        isTrue: true,
        correctAnswer: "c",
        explanation: "NASA and NOAA are government scientific agencies with rigorous research standards. WWF is credible but advocates for conservation (slight bias). Oil companies have financial conflicts of interest. Social media posts can use emotional images without factual backing.",
        redFlags: [
          "Oil companies profit from denying climate impact",
          "Emotional images can manipulate without facts",
          "Social media lacks fact-checking"
        ],
        greenFlags: [
          "Government science agencies are non-profit and rigorous",
          "Joint research means multiple organizations verified it",
          "NASA/NOAA data is publicly available"
        ],
        skill: "Conflict of Interest",
        difficulty: "medium"
      },
      {
        id: "s3",
        type: "source",
        content: {
          claim: "This new phone is the best smartphone ever made.",
          options: [
            { id: "a", text: "The phone company's own advertisement", source: "Self-Promotion" },
            { id: "b", text: "Consumer Reports independent testing", source: "Independent Review" },
            { id: "c", text: "A tech reviewer who got the phone for free", source: "Gifted Product" },
            { id: "d", text: "Your classmate who just bought it yesterday", source: "Limited Experience" }
          ]
        },
        isTrue: true,
        correctAnswer: "b",
        explanation: "Consumer Reports buys products themselves and tests independently - they don't accept ads or free products. Companies always praise their own products. Free products can influence reviewers. One day of use isn't enough to evaluate properly.",
        redFlags: [
          "Companies are biased toward their own products",
          "Free products can create positive bias",
          "One day isn't enough testing time"
        ],
        greenFlags: [
          "Independent testing with no financial ties",
          "Consumer Reports doesn't accept advertising",
          "Standardized testing methods"
        ],
        skill: "Advertising vs. Reviews",
        difficulty: "easy"
      },
      {
        id: "s4",
        type: "source",
        content: {
          claim: "A certain vitamin supplement cures all diseases.",
          options: [
            { id: "a", text: "The supplement company's website with testimonials", source: "Seller" },
            { id: "b", text: "FDA warning letter about false claims", source: "Regulatory Agency" },
            { id: "c", text: "A doctor on YouTube selling the supplement", source: "Conflicted Expert" },
            { id: "d", text: "Mayo Clinic health information page", source: "Medical Institution" }
          ]
        },
        isTrue: false,
        correctAnswer: "d",
        explanation: "Mayo Clinic provides evidence-based health information. The FDA would warn against false 'cure-all' claims. Testimonials on seller websites are cherry-picked. A doctor selling products has a financial conflict - always check if 'experts' profit from their recommendations.",
        redFlags: [
          "'Cures all diseases' is a major red flag - nothing does",
          "Testimonials are selected to sound positive",
          "Experts selling products have conflicts"
        ],
        greenFlags: [
          "Medical institutions review scientific evidence",
          "FDA monitors false health claims",
          "Non-profit health organizations"
        ],
        skill: "Health Misinformation",
        difficulty: "medium"
      },
      {
        id: "s5",
        type: "source",
        content: {
          claim: "This historical event happened exactly this way.",
          options: [
            { id: "a", text: "Wikipedia article with citations", source: "Crowdsourced" },
            { id: "b", text: "A museum's educational exhibit", source: "Educational Institution" },
            { id: "c", text: "A Hollywood movie 'based on true events'", source: "Entertainment" },
            { id: "d", text: "Primary source documents from the time", source: "Primary Source" }
          ]
        },
        isTrue: true,
        correctAnswer: "d",
        explanation: "Primary sources (documents, photos, letters from the actual time) are the gold standard for history. Museums are good but interpret sources. Wikipedia can be a starting point but check its citations. Movies dramatize and change facts for entertainment.",
        redFlags: [
          "'Based on true events' means changed for drama",
          "Wikipedia can be edited by anyone",
          "Interpretations can have bias"
        ],
        greenFlags: [
          "Primary sources are direct evidence",
          "Museums employ historians but use primary sources",
          "Multiple matching primary sources = more reliable"
        ],
        skill: "Primary vs. Secondary Sources",
        difficulty: "hard"
      },
      {
        id: "s6",
        type: "source",
        content: {
          claim: "This political candidate is the best choice for the election.",
          options: [
            { id: "a", text: "The candidate's own campaign website", source: "Self-Promotion" },
            { id: "b", text: "A fact-checking site's analysis of their claims", source: "Fact-Checker" },
            { id: "c", text: "A news channel known for supporting that political party", source: "Partisan Media" },
            { id: "d", text: "A non-partisan voter guide comparing all candidates", source: "Non-Partisan" }
          ]
        },
        isTrue: true,
        correctAnswer: "d",
        explanation: "Non-partisan voter guides present all candidates fairly. Campaign sites only show positives. Partisan media favors one side. Fact-checkers verify claims but don't recommend candidates - that's for you to decide based on your values.",
        redFlags: [
          "Campaign sites are advertising",
          "Partisan media has predetermined bias",
          "'Best choice' is subjective, not factual"
        ],
        greenFlags: [
          "Non-partisan means no party preference",
          "Comparing all candidates shows full picture",
          "Fact-checkers verify but don't tell you who to vote for"
        ],
        skill: "Political Media Literacy",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "fallacy-finder",
    title: "Fallacy Finder",
    description: "Learn to spot tricks in arguments! Logical fallacies are sneaky errors that can fool anyone.",
    icon: "🎭",
    category: "Logic",
    difficulty: "intermediate",
    estimatedTime: "12-15 min",
    ageRange: "12-16",
    isLocked: false,
    skillsFocused: ["Logical Reasoning", "Argument Analysis", "Fallacy Recognition"],
    completionMessage: "You can now spot logical tricks that fool most people!",
    challenges: [
      {
        id: "f1",
        type: "fallacy",
        content: {
          claim: "Everyone is buying this phone, so it must be the best one!",
          options: [
            { id: "a", text: "Bandwagon Fallacy - popularity doesn't equal quality" },
            { id: "b", text: "This is good logic - popular things are usually best" },
            { id: "c", text: "Appeal to Authority - trusting experts too much" },
            { id: "d", text: "Straw Man - misrepresenting an argument" }
          ]
        },
        isTrue: false,
        correctAnswer: "a",
        explanation: "This is the BANDWAGON FALLACY! Just because something is popular doesn't mean it's the best. Pet rocks were popular in the 1970s - that didn't make them useful. Always evaluate quality separately from popularity.",
        redFlags: [
          "'Everyone is doing it' isn't a reason",
          "Popular doesn't mean good (or bad)",
          "This is how fads spread"
        ],
        skill: "Bandwagon Fallacy",
        difficulty: "easy"
      },
      {
        id: "f2",
        type: "fallacy",
        content: {
          claim: "You can't trust her opinion on healthy eating - she ate cake at the party last week!",
          options: [
            { id: "a", text: "This is fair - she's being hypocritical" },
            { id: "b", text: "Ad Hominem - attacking the person instead of their argument" },
            { id: "c", text: "False Dilemma - presenting only two options" },
            { id: "d", text: "Slippery Slope - assuming extreme consequences" }
          ]
        },
        isTrue: false,
        correctAnswer: "b",
        explanation: "This is AD HOMINEM! Attacking the person doesn't address whether their argument about healthy eating is correct. Even if she ate cake, her nutrition facts could still be right. Judge arguments by their logic, not the person making them.",
        redFlags: [
          "Attacking the person, not their point",
          "One action doesn't invalidate expertise",
          "Distraction from the actual topic"
        ],
        skill: "Ad Hominem",
        difficulty: "easy"
      },
      {
        id: "f3",
        type: "fallacy",
        content: {
          claim: "If we let students use calculators in class, next they'll want computers to write all their essays, and eventually no one will learn anything!",
          options: [
            { id: "a", text: "This is reasonable - we should consider consequences" },
            { id: "b", text: "Red Herring - changing the subject" },
            { id: "c", text: "Slippery Slope - assuming one thing inevitably leads to extreme outcomes" },
            { id: "d", text: "Circular Reasoning - the conclusion is in the premise" }
          ]
        },
        isTrue: false,
        correctAnswer: "c",
        explanation: "This is the SLIPPERY SLOPE fallacy! Using calculators doesn't automatically lead to 'no one learning anything.' Each step would require separate decisions. Reasonable tools don't inevitably lead to extreme outcomes.",
        redFlags: [
          "Chain of assumptions without evidence",
          "Extreme final outcome",
          "No evidence each step will happen"
        ],
        skill: "Slippery Slope",
        difficulty: "medium"
      },
      {
        id: "f4",
        type: "fallacy",
        content: {
          claim: "You're either with us or against us. There's no middle ground.",
          options: [
            { id: "a", text: "False Dilemma - presenting only two extreme options when more exist" },
            { id: "b", text: "This is logical - sometimes there really are only two choices" },
            { id: "c", text: "Bandwagon - appealing to popularity" },
            { id: "d", text: "Appeal to Emotion - using feelings instead of logic" }
          ]
        },
        isTrue: false,
        correctAnswer: "a",
        explanation: "This is a FALSE DILEMMA (also called black-and-white thinking)! Most issues have many positions between extremes. You can partially agree, have conditions, or have a completely different view. Watch for anyone who says there are 'only two options.'",
        redFlags: [
          "'Only two choices' when more exist",
          "Extreme language (with us/against us)",
          "Ignores nuance and middle positions"
        ],
        skill: "False Dilemma",
        difficulty: "medium"
      },
      {
        id: "f5",
        type: "fallacy",
        content: {
          claim: "My grandpa smoked his whole life and lived to 95, so smoking can't be that bad for you.",
          options: [
            { id: "a", text: "Anecdotal Evidence - using one example to disprove statistics" },
            { id: "b", text: "This makes sense - personal experience is valuable" },
            { id: "c", text: "Straw Man - misrepresenting the other side" },
            { id: "d", text: "Appeal to Authority - trusting grandpa too much" }
          ]
        },
        isTrue: false,
        correctAnswer: "a",
        explanation: "This is ANECDOTAL EVIDENCE! One person's experience doesn't disprove what happens to millions of others. Smoking significantly increases disease risk even if some individuals get lucky. Statistics from large studies beat individual stories.",
        redFlags: [
          "One story vs. thousands of studies",
          "Survivorship bias (we don't hear from those who died)",
          "'I know someone who...' isn't proof"
        ],
        skill: "Anecdotal Evidence",
        difficulty: "medium"
      },
      {
        id: "f6",
        type: "fallacy",
        content: {
          claim: "Why should we listen to scientists about climate change? They just want research funding!",
          options: [
            { id: "a", text: "This is valid - follow the money" },
            { id: "b", text: "Ad Hominem - attacking motives instead of evidence" },
            { id: "c", text: "Bandwagon - too many scientists agree" },
            { id: "d", text: "False Cause - confusing correlation and causation" }
          ]
        },
        isTrue: false,
        correctAnswer: "b",
        explanation: "This is AD HOMINEM (attacking motives)! Instead of addressing the scientific evidence, this attacks scientists' supposed motivations. Scientists would get funding for ANY research - finding climate change isn't real would also get funded. Address the evidence, not imagined motives.",
        redFlags: [
          "Attacks motives, ignores evidence",
          "Assumes bad faith without proof",
          "Scientists could profit either way"
        ],
        skill: "Motive Attacks",
        difficulty: "hard"
      },
      {
        id: "f7",
        type: "fallacy",
        content: {
          claim: "This medicine must work - it's been used for thousands of years in traditional practice!",
          options: [
            { id: "a", text: "Appeal to Tradition - old doesn't mean effective" },
            { id: "b", text: "This is reasonable - ancient wisdom is valuable" },
            { id: "c", text: "Hasty Generalization - jumping to conclusions" },
            { id: "d", text: "Begging the Question - circular logic" }
          ]
        },
        isTrue: false,
        correctAnswer: "a",
        explanation: "This is APPEAL TO TRADITION! Age doesn't prove effectiveness. Bloodletting was practiced for thousands of years but was harmful. Some traditional medicines work (aspirin from willow bark), others don't. Each needs scientific testing regardless of age.",
        redFlags: [
          "Age alone doesn't prove anything works",
          "Many old practices were harmful",
          "Needs modern testing to verify"
        ],
        skill: "Appeal to Tradition",
        difficulty: "medium"
      },
      {
        id: "f8",
        type: "fallacy",
        content: {
          claim: "We can't find any proof that aliens AREN'T visiting Earth, so they probably are!",
          options: [
            { id: "a", text: "This makes sense - no disproof means it's possible" },
            { id: "b", text: "Shifting the Burden of Proof - claiming something is true because it hasn't been disproven" },
            { id: "c", text: "Straw Man - misrepresenting skeptics" },
            { id: "d", text: "Red Herring - changing the subject" }
          ]
        },
        isTrue: false,
        correctAnswer: "b",
        explanation: "This is SHIFTING THE BURDEN OF PROOF! The person making the claim (aliens visit Earth) needs to provide evidence. You can't prove a negative. By this logic, invisible dragons 'probably' exist because you can't prove they don't!",
        redFlags: [
          "Can't prove a negative",
          "The claimant must provide evidence",
          "Absence of disproof isn't proof"
        ],
        skill: "Burden of Proof",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "stats-tricks",
    title: "Stats & Tricks",
    description: "Numbers don't lie, but they can be used to mislead. Learn to spot statistical manipulation!",
    icon: "📊",
    category: "Statistics",
    difficulty: "advanced",
    estimatedTime: "15-18 min",
    ageRange: "13-17",
    isLocked: false,
    skillsFocused: ["Statistical Literacy", "Data Interpretation", "Graph Analysis"],
    completionMessage: "You now see through misleading statistics that fool most adults!",
    challenges: [
      {
        id: "st1",
        type: "statistic",
        content: {
          claim: "9 out of 10 dentists recommend our toothpaste!",
          article: "This claim appears in a toothpaste commercial. The company surveyed dentists and asked 'Would you recommend a fluoride toothpaste to your patients?' 9 out of 10 said yes."
        },
        isTrue: false,
        explanation: "This is MISLEADING! They asked about fluoride toothpaste in general, not their specific brand. Most fluoride toothpastes are similar, so dentists would recommend any of them. The question was designed to get the answer they wanted.",
        redFlags: [
          "Vague question that applies to all similar products",
          "Doesn't ask about THIS specific brand",
          "Survey designed to get desired answer",
          "No information about how many dentists were surveyed"
        ],
        skill: "Survey Manipulation",
        difficulty: "medium"
      },
      {
        id: "st2",
        type: "statistic",
        content: {
          claim: "Our city's crime rate dropped 50% last year!",
          article: "The mayor announced this statistic at a press conference. Looking deeper: the city changed how they categorize crimes last year, moving many offenses to a 'minor incidents' category that isn't counted in 'crime' statistics."
        },
        isTrue: false,
        explanation: "This is DEFINITION MANIPULATION! The crime didn't decrease - they just changed what counts as 'crime.' This is common in statistics. Always ask: 'Did they change how they measure this?'",
        redFlags: [
          "Definition of 'crime' changed",
          "Same incidents, different category",
          "Comparing apples to oranges",
          "The underlying reality didn't change"
        ],
        skill: "Definition Changes",
        difficulty: "hard"
      },
      {
        id: "st3",
        type: "statistic",
        content: {
          claim: "This graph shows our company is growing rapidly!",
          article: "The graph shows the Y-axis starting at $95 million instead of $0. The actual values go from $97 million to $100 million, but visually the bar looks 10 times taller.",
          imageDescription: "A bar graph with Y-axis starting at 95, making a change from 97 to 100 look dramatic"
        },
        isTrue: false,
        explanation: "This is a TRUNCATED Y-AXIS trick! By not starting at zero, small changes look huge. A 3% increase ($97M to $100M) looks like the company tripled. Always check where the axis starts!",
        redFlags: [
          "Y-axis doesn't start at zero",
          "Small change looks visually dramatic",
          "3% growth shown as 'rapid'",
          "Designed to exaggerate"
        ],
        skill: "Graph Manipulation",
        difficulty: "medium"
      },
      {
        id: "st4",
        type: "statistic",
        content: {
          claim: "Students who eat breakfast score 20% higher on tests!",
          article: "A study found correlation between eating breakfast and test scores. The study did not control for family income, sleep habits, or other factors. Students who eat breakfast may also have more stable home lives and resources."
        },
        isTrue: false,
        explanation: "This confuses CORRELATION with CAUSATION! Breakfast might help, but the real cause might be that well-supported students (stable homes, good sleep, less stress) both eat breakfast AND score higher. Breakfast alone might not be the magic factor.",
        redFlags: [
          "Correlation doesn't prove causation",
          "Many other possible explanations",
          "Didn't control for other factors",
          "'Scores higher' could have multiple causes"
        ],
        skill: "Correlation vs. Causation",
        difficulty: "hard"
      },
      {
        id: "st5",
        type: "statistic",
        content: {
          claim: "Our new drug reduces heart attack risk by 50%!",
          article: "The study found that the risk went from 2 in 1,000 people to 1 in 1,000 people. That's a 50% relative reduction, but only a 0.1% absolute reduction. You'd need to treat 1,000 people for one person to benefit."
        },
        isTrue: false,
        explanation: "This uses RELATIVE vs. ABSOLUTE risk tricks! Yes, 1 is 50% less than 2 (relative), but going from 0.2% to 0.1% risk is a tiny absolute change. '50% reduction' sounds better than '0.1% improvement.' Always ask for actual numbers!",
        redFlags: [
          "Relative percentages can exaggerate small changes",
          "Absolute numbers tell the real story",
          "0.1% difference = 1 in 1,000 people",
          "Sounds impressive, effect is minimal"
        ],
        skill: "Relative vs. Absolute",
        difficulty: "hard"
      },
      {
        id: "st6",
        type: "statistic",
        content: {
          claim: "The average salary at our company is $150,000!",
          article: "The company has 99 employees earning $50,000 and 1 CEO earning $10,000,000. The mean (average) is indeed about $150,000, but 99% of employees earn far less."
        },
        isTrue: false,
        explanation: "This is MEAN vs. MEDIAN manipulation! One extreme value (the CEO's salary) pulls the average way up. The MEDIAN (middle value) of $50,000 represents what most people actually earn. When you see 'average,' ask which average!",
        redFlags: [
          "Mean can be skewed by outliers",
          "Most employees earn $50,000",
          "Median would show typical salary",
          "Designed to make company look generous"
        ],
        skill: "Mean vs. Median",
        difficulty: "medium"
      },
      {
        id: "st7",
        type: "statistic",
        content: {
          claim: "80% of people agree that our product is excellent!",
          article: "The survey gave only two options: 'This product is excellent' or 'This product is the worst I've ever used.' Most people picked 'excellent' because it was less extreme."
        },
        isTrue: false,
        explanation: "This is a FORCED CHOICE trick! When given only extreme options, people pick the less extreme one. A fair survey would have: Excellent, Good, Average, Poor, Terrible. The result says more about the survey design than the product.",
        redFlags: [
          "Only two extreme options",
          "Missing middle choices",
          "People avoid extreme negatives",
          "Survey designed for desired result"
        ],
        skill: "Survey Design Tricks",
        difficulty: "medium"
      },
      {
        id: "st8",
        type: "statistic",
        content: {
          claim: "This school's test scores improved by 15% this year!",
          article: "This year, the school didn't test the lowest-performing 20% of students because they were reclassified as 'exempt' from testing. Last year, all students were tested."
        },
        isTrue: false,
        explanation: "This is SAMPLE MANIPULATION! By excluding low performers, the average automatically goes up. The students didn't improve - they just changed who gets counted. Always ask: 'Who was included in this measurement?'",
        redFlags: [
          "Changed who was tested",
          "Excluded low performers",
          "Same students might score the same",
          "Improvement is an illusion"
        ],
        skill: "Sample Selection Bias",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "viral-verification",
    title: "Viral Verification",
    description: "That viral post making rounds - is it real? Learn to verify before you share!",
    icon: "📱",
    category: "Social Media",
    difficulty: "beginner",
    estimatedTime: "10-12 min",
    ageRange: "10-15",
    isLocked: true,
    skillsFocused: ["Social Media Literacy", "Verification", "Responsible Sharing"],
    completionMessage: "You now know to verify before sharing!",
    challenges: []
  }
];

export const getSkillDescription = (skill: string): string => {
  const descriptions: Record<string, string> = {
    "Clickbait Detection": "Recognizing sensational headlines designed to get clicks",
    "Source Recognition": "Identifying trustworthy vs. unreliable sources",
    "Statistical Skepticism": "Questioning too-good-to-be-true numbers",
    "Source Verification": "Checking if sources are legitimate",
    "Academic Source Recognition": "Understanding peer-reviewed research",
    "Conspiracy Detection": "Spotting unfounded conspiracy theories",
    "Source Hierarchy": "Ranking sources by reliability",
    "Conflict of Interest": "Identifying when sources have ulterior motives",
    "Advertising vs. Reviews": "Distinguishing ads from genuine reviews",
    "Health Misinformation": "Spotting false health claims",
    "Primary vs. Secondary Sources": "Understanding direct vs. interpreted evidence",
    "Political Media Literacy": "Navigating partisan vs. non-partisan sources",
    "Bandwagon Fallacy": "Not assuming popular = correct",
    "Ad Hominem": "Recognizing attacks on person instead of argument",
    "Slippery Slope": "Spotting exaggerated chain reactions",
    "False Dilemma": "Recognizing false either/or choices",
    "Anecdotal Evidence": "Understanding why stories don't beat statistics",
    "Motive Attacks": "Seeing through attacks on supposed motivations",
    "Appeal to Tradition": "Knowing old doesn't mean correct",
    "Burden of Proof": "Understanding who needs to prove what",
    "Survey Manipulation": "Spotting biased survey questions",
    "Definition Changes": "Noticing when definitions shift to change results",
    "Graph Manipulation": "Catching misleading visual tricks",
    "Correlation vs. Causation": "Knowing connection isn't the same as cause",
    "Relative vs. Absolute": "Understanding the difference in percentages",
    "Mean vs. Median": "Knowing which average to trust",
    "Survey Design Tricks": "Spotting forced-choice and leading questions",
    "Sample Selection Bias": "Noticing when samples are cherry-picked"
  };
  return descriptions[skill] || "Critical thinking skill";
};
