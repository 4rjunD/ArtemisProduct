// ArtemisIQ - Critical Thinking Score System
// Measures cognitive skills across multiple dimensions

export interface SkillScore {
  skill: string;
  score: number; // 0-100
  level: "developing" | "proficient" | "advanced" | "expert";
  gamesPlayed: number;
  trend: "improving" | "stable" | "needs-practice";
}

export interface GameSession {
  id: string;
  gameType: "detective" | "story-quest" | "debate" | "fact-fiction";
  gameId: string;
  completedAt: string;
  timeSpent: number; // seconds
  scores: {
    accuracy: number; // 0-100
    reasoning: number; // 0-100 (AI evaluated)
    speed: number; // 0-100
    consistency: number; // 0-100
  };
  skills: string[];
  rawData: Record<string, unknown>;
}

export interface ArtemisIQProfile {
  overallIQ: number; // Composite score 70-150 scale (like IQ)
  skillScores: SkillScore[];
  totalGamesPlayed: number;
  totalTimePracticed: number; // minutes
  currentStreak: number; // days
  longestStreak: number;
  lastPlayedAt: string;
  sessions: GameSession[];
  weeklyProgress: {
    week: string;
    iq: number;
    gamesPlayed: number;
  }[];
}

// Skill categories and their weights
export const SKILL_CATEGORIES = {
  // Core Critical Thinking
  "Logical Reasoning": { weight: 1.2, description: "Ability to think through problems step by step" },
  "Evidence Evaluation": { weight: 1.1, description: "Skill at weighing and assessing evidence" },
  "Pattern Recognition": { weight: 1.0, description: "Spotting patterns and connections" },

  // Information Literacy
  "Source Evaluation": { weight: 1.1, description: "Judging reliability of information sources" },
  "Bias Detection": { weight: 1.0, description: "Recognizing bias and manipulation" },
  "Fact Checking": { weight: 1.0, description: "Verifying claims and spotting misinformation" },

  // Argumentation
  "Argument Building": { weight: 1.0, description: "Constructing strong, logical arguments" },
  "Perspective Taking": { weight: 1.1, description: "Understanding different viewpoints" },
  "Fallacy Recognition": { weight: 1.0, description: "Spotting logical fallacies" },

  // Decision Making
  "Consequence Thinking": { weight: 1.0, description: "Anticipating outcomes of choices" },
  "Risk Assessment": { weight: 0.9, description: "Evaluating risks and trade-offs" },
  "Ethical Reasoning": { weight: 1.0, description: "Considering moral implications" },
};

// Game to skill mapping
export const GAME_SKILLS: Record<string, string[]> = {
  "detective": [
    "Logical Reasoning",
    "Evidence Evaluation",
    "Pattern Recognition",
    "Consequence Thinking"
  ],
  "story-quest": [
    "Consequence Thinking",
    "Ethical Reasoning",
    "Risk Assessment",
    "Perspective Taking"
  ],
  "debate": [
    "Argument Building",
    "Perspective Taking",
    "Fallacy Recognition",
    "Evidence Evaluation"
  ],
  "fact-fiction": [
    "Source Evaluation",
    "Bias Detection",
    "Fact Checking",
    "Fallacy Recognition"
  ]
};

// Calculate ArtemisIQ from raw scores
export function calculateArtemisIQ(skillScores: SkillScore[]): number {
  if (skillScores.length === 0) return 100; // Default starting IQ

  let weightedSum = 0;
  let totalWeight = 0;

  for (const skill of skillScores) {
    const category = SKILL_CATEGORIES[skill.skill as keyof typeof SKILL_CATEGORIES];
    if (category) {
      weightedSum += skill.score * category.weight;
      totalWeight += category.weight;
    }
  }

  // Convert 0-100 scale to IQ-like 70-150 scale
  const avgScore = totalWeight > 0 ? weightedSum / totalWeight : 50;
  const iq = Math.round(70 + (avgScore * 0.8)); // Maps 0-100 to 70-150

  return Math.max(70, Math.min(150, iq));
}

// Get skill level from score
export function getSkillLevel(score: number): SkillScore["level"] {
  if (score >= 90) return "expert";
  if (score >= 75) return "advanced";
  if (score >= 50) return "proficient";
  return "developing";
}

// Calculate session score from game data
export function calculateSessionScore(
  gameType: string,
  accuracy: number, // 0-100
  reasoningQuality: number, // 0-100 (from AI)
  timeSpent: number, // seconds
  expectedTime: number // seconds
): GameSession["scores"] {
  // Speed score - faster is better, but not too fast (might be guessing)
  const timeRatio = timeSpent / expectedTime;
  let speedScore: number;
  if (timeRatio < 0.3) {
    speedScore = 40; // Too fast, probably guessing
  } else if (timeRatio < 0.7) {
    speedScore = 90; // Quick but thoughtful
  } else if (timeRatio <= 1.5) {
    speedScore = 100; // Right on pace
  } else if (timeRatio <= 2.5) {
    speedScore = 80; // Taking time, still good
  } else {
    speedScore = 60; // Very slow
  }

  // Consistency combines accuracy and reasoning
  const consistency = Math.round((accuracy + reasoningQuality) / 2);

  return {
    accuracy,
    reasoning: reasoningQuality,
    speed: speedScore,
    consistency
  };
}

// Token-efficient prompt for AI evaluation
export function getEvaluationPrompt(
  gameType: string,
  userReasoning: string,
  context: string,
  correctAnswer: string
): string {
  // Keep prompts SHORT to save tokens
  return `Rate reasoning quality 0-100. Context: ${context.slice(0, 200)}. User said: "${userReasoning.slice(0, 300)}". Correct: ${correctAnswer.slice(0, 100)}. Reply ONLY with JSON: {"score":N,"feedback":"1 sentence"}`;
}

// Default profile for new users
export function createDefaultProfile(): ArtemisIQProfile {
  return {
    overallIQ: 100,
    skillScores: [],
    totalGamesPlayed: 0,
    totalTimePracticed: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedAt: new Date().toISOString(),
    sessions: [],
    weeklyProgress: []
  };
}

// Update profile with new session
export function updateProfile(
  profile: ArtemisIQProfile,
  session: GameSession
): ArtemisIQProfile {
  const newSessions = [...profile.sessions, session];

  // Update skill scores based on all sessions
  const skillData: Record<string, { total: number; count: number }> = {};

  for (const s of newSessions) {
    const avgScore = (s.scores.accuracy + s.scores.reasoning + s.scores.consistency) / 3;
    for (const skill of s.skills) {
      if (!skillData[skill]) {
        skillData[skill] = { total: 0, count: 0 };
      }
      skillData[skill].total += avgScore;
      skillData[skill].count += 1;
    }
  }

  const newSkillScores: SkillScore[] = Object.entries(skillData).map(([skill, data]) => {
    const score = Math.round(data.total / data.count);
    const prevSkill = profile.skillScores.find(s => s.skill === skill);
    const prevScore = prevSkill?.score || score;

    let trend: SkillScore["trend"] = "stable";
    if (score > prevScore + 5) trend = "improving";
    else if (score < prevScore - 5) trend = "needs-practice";

    return {
      skill,
      score,
      level: getSkillLevel(score),
      gamesPlayed: data.count,
      trend
    };
  });

  // Check streak
  const today = new Date().toDateString();
  const lastPlayed = new Date(profile.lastPlayedAt).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  let currentStreak = profile.currentStreak;
  if (lastPlayed === today) {
    // Same day, no change
  } else if (lastPlayed === yesterday) {
    currentStreak += 1;
  } else {
    currentStreak = 1; // Reset streak
  }

  const longestStreak = Math.max(profile.longestStreak, currentStreak);

  // Calculate new IQ
  const newIQ = calculateArtemisIQ(newSkillScores);

  // Update weekly progress
  const weekKey = getWeekKey(new Date());
  const weeklyProgress = [...profile.weeklyProgress];
  const existingWeek = weeklyProgress.find(w => w.week === weekKey);
  if (existingWeek) {
    existingWeek.iq = newIQ;
    existingWeek.gamesPlayed += 1;
  } else {
    weeklyProgress.push({ week: weekKey, iq: newIQ, gamesPlayed: 1 });
  }

  // Keep only last 12 weeks
  while (weeklyProgress.length > 12) {
    weeklyProgress.shift();
  }

  return {
    overallIQ: newIQ,
    skillScores: newSkillScores,
    totalGamesPlayed: profile.totalGamesPlayed + 1,
    totalTimePracticed: profile.totalTimePracticed + Math.round(session.timeSpent / 60),
    currentStreak,
    longestStreak,
    lastPlayedAt: new Date().toISOString(),
    sessions: newSessions.slice(-50), // Keep last 50 sessions
    weeklyProgress
  };
}

function getWeekKey(date: Date): string {
  const year = date.getFullYear();
  const week = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
  return `${year}-W${week.toString().padStart(2, '0')}`;
}

// Get IQ label
export function getIQLabel(iq: number): { label: string; color: string; description: string } {
  if (iq >= 140) return {
    label: "Exceptional",
    color: "text-purple-600",
    description: "Outstanding critical thinking abilities"
  };
  if (iq >= 125) return {
    label: "Advanced",
    color: "text-blue-600",
    description: "Well above average thinking skills"
  };
  if (iq >= 110) return {
    label: "Above Average",
    color: "text-green-600",
    description: "Strong critical thinking foundation"
  };
  if (iq >= 95) return {
    label: "Average",
    color: "text-yellow-600",
    description: "Developing thinking skills"
  };
  if (iq >= 80) return {
    label: "Building",
    color: "text-orange-600",
    description: "Learning the fundamentals"
  };
  return {
    label: "Starting",
    color: "text-red-600",
    description: "Just beginning the journey"
  };
}
