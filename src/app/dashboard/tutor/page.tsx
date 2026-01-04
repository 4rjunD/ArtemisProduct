"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Send,
  BookOpen,
  Clock,
  ChevronRight,
  ChevronDown,
  Sparkles,
  User,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface Session {
  id: string;
  title: string;
  problem: string;
  messages: Message[];
  subject: string;
  createdAt: Date;
  solved: boolean;
}

interface TopicNode {
  id: string;
  name: string;
  children?: TopicNode[];
}

const TOPICS: TopicNode[] = [
  {
    id: "math",
    name: "Math",
    children: [
      { id: "algebra", name: "Algebra" },
      { id: "geometry", name: "Geometry" },
      { id: "calculus", name: "Calculus" },
      { id: "statistics", name: "Statistics" },
      { id: "trigonometry", name: "Trigonometry" },
    ],
  },
  {
    id: "science",
    name: "Science",
    children: [
      { id: "physics", name: "Physics" },
      { id: "chemistry", name: "Chemistry" },
      { id: "biology", name: "Biology" },
    ],
  },
];

const STORAGE_KEY = "artemis-tutor-sessions";

export default function TutorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [problem, setProblem] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["math", "science"]);

  // Load sessions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setSessions(parsed.map((s: Session) => ({ ...s, createdAt: new Date(s.createdAt) })));
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);

  // Auth check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  // Create new session
  const createNewSession = (initialProblem?: string, topic?: string) => {
    const newSession: Session = {
      id: Date.now().toString(),
      title: initialProblem?.slice(0, 50) || topic || "New Session",
      problem: initialProblem || "",
      messages: [],
      subject: topic || "general",
      createdAt: new Date(),
      solved: false,
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSession(newSession);
    setProblem(initialProblem || "");

    // If we have a problem, start the conversation
    if (initialProblem) {
      startTutoring(newSession, initialProblem);
    }
  };

  // Start tutoring conversation
  const startTutoring = async (sess: Session, problemText: string) => {
    setIsLoading(true);

    // Add initial assistant message
    const initialMessage: Message = {
      role: "assistant",
      content: `I see you're working on this problem. Let's figure it out together!\n\nBefore we dive in, tell me: **What do you already know about this topic?** What have you tried so far?`,
    };

    const updatedSession = {
      ...sess,
      problem: problemText,
      title: problemText.slice(0, 50) + (problemText.length > 50 ? "..." : ""),
      messages: [initialMessage],
    };

    setCurrentSession(updatedSession);
    setSessions((prev) =>
      prev.map((s) => (s.id === sess.id ? updatedSession : s))
    );
    setIsLoading(false);
  };

  // Handle starting with a pasted problem
  const handleStartWithProblem = () => {
    if (!problem.trim()) return;
    createNewSession(problem.trim());
  };

  // Send message to tutor
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentSession || isLoading) return;

    const userMessage: Message = { role: "user", content: inputMessage };
    const updatedMessages = [...currentSession.messages, userMessage];

    // Update UI immediately
    const updatedSession = { ...currentSession, messages: updatedMessages };
    setCurrentSession(updatedSession);
    setSessions((prev) =>
      prev.map((s) => (s.id === currentSession.id ? updatedSession : s))
    );
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call the tutor API
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: currentSession.problem,
          messages: updatedMessages,
          subject: currentSession.subject,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "I'm here to help! Can you tell me more about what you're thinking?",
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      const finalSession = { ...currentSession, messages: finalMessages };
      setCurrentSession(finalSession);
      setSessions((prev) =>
        prev.map((s) => (s.id === currentSession.id ? finalSession : s))
      );
    } catch (error) {
      console.error("Error calling tutor API:", error);
      // Fallback response
      const fallbackMessage: Message = {
        role: "assistant",
        content: "Let me think about that... What part of the problem feels most confusing to you right now?",
      };
      const finalMessages = [...updatedMessages, fallbackMessage];
      const finalSession = { ...currentSession, messages: finalMessages };
      setCurrentSession(finalSession);
      setSessions((prev) =>
        prev.map((s) => (s.id === currentSession.id ? finalSession : s))
      );
    }

    setIsLoading(false);
  };

  // Delete session
  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (currentSession?.id === id) {
      setCurrentSession(null);
      setProblem("");
    }
  };

  // Toggle topic expansion
  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // Select topic to practice
  const selectTopic = (topicId: string, topicName: string) => {
    createNewSession(`I want to practice ${topicName}. Give me a problem to work on.`, topicId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <span className="font-serif text-xl">Artemis Tutor</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {session.user?.name || session.user?.email}
          </div>
        </div>
      </header>

      {/* Main 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - Sessions & Topics */}
        <div className="w-60 border-r border-border flex flex-col bg-card">
          {/* New Session Button */}
          <div className="p-3 border-b border-border">
            <Button
              variant="glow"
              className="w-full gap-2"
              onClick={() => createNewSession()}
            >
              <Plus className="h-4 w-4" />
              New Session
            </Button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto">
            {/* Recent Sessions */}
            <div className="p-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Recent Sessions
              </p>
              {sessions.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">No sessions yet</p>
              ) : (
                <div className="space-y-1">
                  {sessions.slice(0, 10).map((sess) => (
                    <div
                      key={sess.id}
                      className={`group flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm transition-colors ${
                        currentSession?.id === sess.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-foreground"
                      }`}
                      onClick={() => setCurrentSession(sess)}
                    >
                      <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="truncate flex-1">{sess.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(sess.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Browse Topics */}
            <div className="p-3 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Browse Topics
              </p>
              <div className="space-y-1">
                {TOPICS.map((topic) => (
                  <div key={topic.id}>
                    <button
                      onClick={() => toggleTopic(topic.id)}
                      className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted text-sm text-foreground"
                    >
                      {expandedTopics.includes(topic.id) ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                      <BookOpen className="h-3 w-3 text-primary" />
                      {topic.name}
                    </button>
                    {expandedTopics.includes(topic.id) && topic.children && (
                      <div className="ml-6 space-y-1">
                        {topic.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => selectTopic(child.id, child.name)}
                            className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted text-sm text-muted-foreground hover:text-foreground"
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE PANEL - Problem Display */}
        <div className="flex-1 flex flex-col border-r border-border overflow-hidden">
          {currentSession ? (
            <>
              {/* Problem Header */}
              <div className="p-4 border-b border-border bg-card flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {currentSession.subject.charAt(0).toUpperCase() + currentSession.subject.slice(1)}
                  </span>
                </div>
                <h2 className="font-serif text-lg">{currentSession.title}</h2>
              </div>

              {/* Problem Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl">
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Your Problem:</p>
                    <p className="text-foreground whitespace-pre-wrap">{currentSession.problem}</p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">
                      <strong>Remember:</strong> I won't give you the answer directly. Instead, I'll ask questions that help you figure it out yourself.
                    </p>
                    <p>
                      When you understand the solution, I'll ask you to explain it back to me. That's how we both know you really got it.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty State - Paste Problem */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="max-w-md w-full text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl mb-2">Paste Your Problem</h2>
                  <p className="text-muted-foreground">
                    Paste any Math or Science homework question, and I'll guide you to the solution without giving you the answer.
                  </p>
                </div>

                <div className="space-y-4">
                  <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Paste your homework problem here..."
                    className="w-full h-32 p-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    variant="glow"
                    size="lg"
                    className="w-full"
                    onClick={handleStartWithProblem}
                    disabled={!problem.trim()}
                  >
                    Start Learning
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-6">
                  Or select a topic from the sidebar to practice
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL - Socratic Chat */}
        <div className="w-96 flex flex-col bg-card">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Your Tutor</p>
                <p className="text-xs text-muted-foreground">I guide, you discover</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!currentSession ? (
              <div className="text-center text-muted-foreground text-sm py-8">
                Paste a problem to start learning
              </div>
            ) : currentSession.messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-8">
                Starting session...
              </div>
            ) : (
              currentSession.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.role === "assistant" ? (
                        <Sparkles className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      <span className="text-xs opacity-70">
                        {msg.role === "assistant" ? "Tutor" : "You"}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    <span className="text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder={currentSession ? "Type your response..." : "Start a session first"}
                disabled={!currentSession || isLoading}
                className="flex-1 h-10 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!currentSession || !inputMessage.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
