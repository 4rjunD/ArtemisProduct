import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SOCRATIC_SYSTEM_PROMPT = `You are a Socratic tutor for STEM subjects (Math and Science). Your role is to help students understand concepts by asking guiding questions - NEVER give direct answers.

RULES YOU MUST FOLLOW:
1. NEVER provide the solution, final answer, or do the calculation for them
2. Ask ONE focused question at a time
3. Start by understanding what the student already knows
4. Guide them to discover the solution themselves through questions
5. If they're stuck, break the problem into smaller steps with questions
6. When they make progress, acknowledge it and ask what comes next
7. If they get the answer, ask them to explain WHY it works
8. Keep responses concise (2-4 sentences max)
9. Be encouraging but not over-the-top

QUESTION TYPES TO USE:
- "What do you already know about [concept]?"
- "What would happen if you tried [approach]?"
- "Can you break this into smaller parts?"
- "What's the first thing you notice about this problem?"
- "That's a good start! What would be the next step?"
- "Why do you think that works?"
- "Can you explain your reasoning?"
- "What similar problems have you solved before?"

IF THE STUDENT ASKS FOR THE ANSWER DIRECTLY:
- Redirect with: "I know it's tempting to want the answer, but you'll learn it better if you figure it out. Let me ask you this instead: [guiding question]"

IF THE STUDENT GETS FRUSTRATED:
- Acknowledge it: "I can tell this is challenging. Let's try a different approach. [simpler question]"

REMEMBER: Your goal is for the student to have that "aha!" moment where THEY figure it out. That's real learning.`;

interface Message {
  role: "assistant" | "user";
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { problem, messages, subject } = body;

    if (!problem || !messages) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If no API key, use fallback responses
    if (!OPENAI_API_KEY) {
      const fallbackResponse = getFallbackResponse(messages);
      return NextResponse.json({ response: fallbackResponse });
    }

    // Build conversation for OpenAI
    const openaiMessages = [
      { role: "system", content: SOCRATIC_SYSTEM_PROMPT },
      {
        role: "user",
        content: `The student is working on this ${subject || "STEM"} problem:\n\n"${problem}"\n\nHelp them understand it using the Socratic method.`,
      },
      ...messages.map((m: Message) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      return NextResponse.json({ response: getFallbackResponse(messages) });
    }

    const data = await response.json();
    const tutorResponse = data.choices[0]?.message?.content || getFallbackResponse(messages);

    return NextResponse.json({ response: tutorResponse });
  } catch (error) {
    console.error("Tutor API error:", error);
    return NextResponse.json(
      { response: "Let me think about that differently. What part of this problem feels most unclear to you?" },
      { status: 200 }
    );
  }
}

// Fallback responses when API is unavailable
function getFallbackResponse(messages: Message[]): string {
  const messageCount = messages.length;
  const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content.toLowerCase() || "";

  // Check for common patterns
  if (lastUserMessage.includes("don't know") || lastUserMessage.includes("not sure") || lastUserMessage.includes("confused")) {
    return "That's okay - being uncertain is part of learning. Let's break this down. What's ONE thing about this problem that you DO understand?";
  }

  if (lastUserMessage.includes("help") || lastUserMessage.includes("stuck")) {
    return "I'm here to help you figure this out. Instead of me telling you, let's try this: What would be your first guess at how to approach this? Don't worry about being wrong.";
  }

  if (lastUserMessage.includes("answer") || lastUserMessage.includes("solution") || lastUserMessage.includes("tell me")) {
    return "I know it's tempting to want the answer, but you'll understand it much better if you figure it out yourself. Here's what I want you to try: What's the very first step you would take?";
  }

  // Progress through conversation
  const responses = [
    "Good start! Now, what do you think would be the next step after that?",
    "You're on the right track. Can you explain WHY you think that approach might work?",
    "Interesting thinking. What would happen if you tried applying that idea to the problem?",
    "That's a good observation. How might that help us get closer to the answer?",
    "You're making progress! What does that tell you about the solution?",
    "Almost there! Can you now put the pieces together and explain what you've figured out?",
  ];

  return responses[Math.min(messageCount, responses.length - 1)];
}
