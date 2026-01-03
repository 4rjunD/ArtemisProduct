import { NextRequest, NextResponse } from "next/server";

// Token-optimized AI evaluation endpoint
// Uses minimal prompts and caches common evaluations

interface EvaluationRequest {
  gameType: "detective" | "story-quest" | "debate" | "fact-fiction";
  userReasoning: string;
  context: string; // Question/scenario (trimmed)
  correctAnswer?: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

interface EvaluationResponse {
  score: number; // 0-100
  feedback: string;
  cached: boolean;
}

// Simple reasoning patterns for quick scoring (no API call needed)
const QUICK_PATTERNS = {
  excellent: [
    /because.*evidence/i,
    /i noticed.*therefore/i,
    /the source.*reliable/i,
    /considering.*both/i,
    /this suggests.*since/i,
    /logically.*follows/i,
    /bias.*detect/i,
    /fallacy.*recogniz/i
  ],
  good: [
    /because/i,
    /i think.*because/i,
    /it seems.*since/i,
    /probably.*because/i,
    /makes sense/i,
    /i noticed/i
  ],
  basic: [
    /just.*feel/i,
    /obvious/i,
    /everyone knows/i,
    /looks.*right/i
  ]
};

// Quick local scoring for simple cases (saves API calls)
function quickScore(reasoning: string, isCorrect: boolean): { score: number; feedback: string } | null {
  if (!reasoning || reasoning.length < 10) {
    return {
      score: isCorrect ? 40 : 20,
      feedback: "Try explaining your thinking more next time."
    };
  }

  const len = reasoning.length;

  // Check for excellent reasoning patterns
  for (const pattern of QUICK_PATTERNS.excellent) {
    if (pattern.test(reasoning)) {
      return {
        score: isCorrect ? 95 : 70,
        feedback: isCorrect
          ? "Excellent reasoning with clear evidence!"
          : "Great thinking process, even though the answer differed."
      };
    }
  }

  // Check for good reasoning patterns
  for (const pattern of QUICK_PATTERNS.good) {
    if (pattern.test(reasoning)) {
      return {
        score: isCorrect ? 80 : 55,
        feedback: isCorrect
          ? "Good reasoning that supported your answer."
          : "Decent approach, consider more evidence next time."
      };
    }
  }

  // Check for basic/weak reasoning
  for (const pattern of QUICK_PATTERNS.basic) {
    if (pattern.test(reasoning)) {
      return {
        score: isCorrect ? 50 : 30,
        feedback: "Try to base your reasoning on specific evidence rather than feelings."
      };
    }
  }

  // Default based on length and correctness
  if (len > 100) {
    return {
      score: isCorrect ? 75 : 50,
      feedback: isCorrect
        ? "Thoughtful explanation!"
        : "Good effort explaining your thinking."
    };
  }

  if (len > 30) {
    return {
      score: isCorrect ? 60 : 40,
      feedback: "Try to provide more detail in your reasoning."
    };
  }

  return null; // Fall through to AI evaluation
}

export async function POST(request: NextRequest) {
  try {
    const body: EvaluationRequest = await request.json();
    const { userReasoning, context, correctAnswer, isCorrect } = body;

    // Try quick local scoring first (saves tokens!)
    const quickResult = quickScore(userReasoning || "", isCorrect ?? false);
    if (quickResult) {
      return NextResponse.json({
        score: quickResult.score,
        feedback: quickResult.feedback,
        cached: true
      } as EvaluationResponse);
    }

    // Only call API for complex cases
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback if no API key
      return NextResponse.json({
        score: isCorrect ? 70 : 45,
        feedback: "Keep practicing your critical thinking!",
        cached: true
      } as EvaluationResponse);
    }

    // Token-optimized prompt (very short!)
    const prompt = `Rate 0-100 this reasoning for a critical thinking exercise. Context: "${context?.slice(0, 150) || "thinking exercise"}". Answer was ${isCorrect ? "correct" : "incorrect"}. User's reasoning: "${userReasoning?.slice(0, 200) || "none given"}". Reply JSON only: {"score":N,"feedback":"brief"}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Cheapest, fastest model
        messages: [
          {
            role: "system",
            content: "You evaluate reasoning quality. Reply only with JSON: {\"score\":N,\"feedback\":\"brief\"}"
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 50, // Very limited to save tokens
        temperature: 0.3 // Low for consistency
      })
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse JSON response
    try {
      const parsed = JSON.parse(content);
      return NextResponse.json({
        score: Math.max(0, Math.min(100, parsed.score || 50)),
        feedback: parsed.feedback || "Keep practicing!",
        cached: false
      } as EvaluationResponse);
    } catch {
      // If JSON parsing fails, extract score manually
      const scoreMatch = content.match(/(\d+)/);
      return NextResponse.json({
        score: scoreMatch ? parseInt(scoreMatch[1]) : 50,
        feedback: "Keep building your critical thinking skills!",
        cached: false
      } as EvaluationResponse);
    }
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json({
      score: 50,
      feedback: "Keep practicing!",
      cached: true
    } as EvaluationResponse);
  }
}
