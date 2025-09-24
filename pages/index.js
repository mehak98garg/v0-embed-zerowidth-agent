// =============================================================================
// Chat Agent with Modern Mehak.ai Design (React + Vercel)
//
// Updated to match the lovable design with dark header, online status,
// rotating prompts, and modern styling with all requested changes
// FIXED: Auto-scroll issue for Framer embedding
// FIXED: Removed left padding and changed "AI is typing..." to "Thinking..."
//
// Author: Thomas J McLeish (Updated for Mehak.ai design)
// Date: March 2, 2025
// =============================================================================

import chatConfig from "../config/config";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";

// =============================================================================
// Utilities
// =============================================================================

const TYPE_SPEED = 10; // For the thinking indicator dots

const useAutoScroll = (dependency) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [dependency]);

  return messagesEndRef;
};

const formatTime = () => {
  const d = new Date();
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
};

const getUserId = () => {
  let userId = localStorage.getItem("mehak_user_id");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("mehak_user_id", userId);
  }
  return userId;
};

// =============================================================================
// Component
// =============================================================================

export default function AgentComponent() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [userId, setUserId] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const messagesEndRef = useAutoScroll(conversation);
  const inputRef = useRef(null);

  // Session + user id
  useEffect(() => {
    setSessionId(uuidv4());
    setUserId(getUserId());
  }, []);

  // Rotate suggested prompt
  useEffect(() => {
    if (!chatConfig.suggestedPrompts?.length) return;
    const id = setInterval(() => {
      setCurrentPromptIndex((i) => (i + 1) % chatConfig.suggestedPrompts.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Submit message
  const submitMessage = async (text) => {
    if (!text || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      from: "user",
      text: text.trim(),
      time: formatTime(),
    };

    setConversation((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);

    try {
      const payload = {
        flowUrl: chatConfig.flowURL,
        sessionId,
        userId,
        userText: text,
      };

      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Request failed");
      }

      const data = await res.json();
      const reply = data?.reply ?? "Sorry, I didn’t get that.";

      const agentMessage = {
        id: uuidv4(),
        from: "agent",
        text: reply,
        time: formatTime(),
      };

      setConversation((prev) => [...prev, agentMessage]);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitMessage(message);
    setMessage("");
  };

  // Styling tokens
  const tokens = {
    container: {
      // FULL-BLEED FIX: absolutely fill the iframe/host
      position: "absolute",
      inset: 0,
      margin: 0,
      padding: 0,
      width: "100%",
      height: "100%",
      maxWidth: "none",
      fontFamily: "system-ui, -apple-system, sans-serif",
      border: "none",
      borderRadius: 0,
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      boxShadow: "none",
      boxSizing: "border-box",
    },
    header: {
      backgroundColor: chatConfig.styling?.headerBackground || "#2D2D2D",
      color: chatConfig.styling?.headerTextColor || "#FFFFFF",
      padding: "24px",
      borderRadius: "0",
      borderBottom: "1px solid #E0E0E0",
    },
    headerTitle: {
      fontSize: "20px",
      fontWeight: 600,
      marginBottom: "6px",
    },
    headerDesc: {
      fontSize: "14px",
      opacity: 0.9,
    },
    onlineRow: {
      display: "flex",
      alignItems: "center",
      marginTop: "8px",
      gap: "8px",
      fontSize: "12px",
      color: "#9CA3AF",
    },
    dotOnline: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "#7CFC00",
      display: "inline-block",
    },
    chatWrap: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "16px 20px",
      overflow: "hidden",
    },
    chatScroll: {
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
      paddingRight: 4,
    },
    bubbleRow: {
      display: "flex",
      marginBottom: 12,
    },
    bubbleUser: {
      marginLeft: "auto",
      background: "#F3F4F6",
      color: "#111827",
      border: "1px solid #E5E7EB",
      borderRadius: 16,
      padding: "10px 12px",
      maxWidth: "80%",
      boxShadow: "none",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    },
    bubbleAgent: {
      marginRight: "auto",
      background: "#111827",
      color: "#F9FAFB",
      borderRadius: 16,
      padding: "10px 12px",
      maxWidth: "80%",
      border: "1px solid #111827",
      boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    },
    timestamp: {
      fontSize: 11,
      marginTop: 6,
      color: "#9CA3AF",
    },
    suggestionsWrap: {
      marginTop: 8,
      marginBottom: 10,
    },
    suggestion: {
      width: "100%",
      textAlign: "left",
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid #E5E7EB",
      background: "#FFFFFF",
      cursor: "pointer",
      fontSize: 14,
    },
    inputRow: {
      display: "flex",
      gap: 10,
      marginTop: 12,
    },
    input: {
      flex: 1,
      borderRadius: 12,
      border: "1px solid #E5E7EB",
      padding: "12px 14px",
      fontSize: 14,
      outline: "none",
    },
    submit: {
      borderRadius: 12,
      border: "1px solid #E5E7EB",
      padding: "0 14px",
      fontSize: 14,
      background: isSubmitHovered ? "#111827" : "#F3F4F6",
      color: isSubmitHovered ? "#FFFFFF" : "#111827",
      cursor: "pointer",
    },
    thinkingRow: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "#6B7280",
      fontSize: 13,
      marginTop: 6,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "#9CA3AF",
      animation: "bounce 1.4s infinite ease-in-out both",
    },
  };

  return (
    <div style={tokens.container}>
      {/* Header */}
      <div style={tokens.header}>
        <div style={tokens.headerTitle}>
          {chatConfig.header?.title || "Chat with ELIZA"}
        </div>
        <div style={tokens.headerDesc}>
          {chatConfig.header?.description ||
            "Greetings, I am a draft clone of ELIZA running the DOCTOR script. HOW DO YOU DO. PLEASE STATE YOUR PROBLEM."}
        </div>
        <div style={tokens.onlineRow}>
          <span style={tokens.dotOnline} />
          <span>ONLINE</span>
        </div>
      </div>

      {/* Chat Area */}
      <div style={tokens.chatWrap} className="chat-container">
        {/* Suggestions */}
        {showSuggestions && chatConfig.suggestedPrompts?.length > 0 && (
          <div style={tokens.suggestionsWrap}>
            <button
              style={tokens.suggestion}
              onClick={() =>
                submitMessage(chatConfig.suggestedPrompts[currentPromptIndex])
              }
            >
              {chatConfig.suggestedPrompts[currentPromptIndex]}
            </button>
          </div>
        )}

        {/* Scrollable messages */}
        <div style={tokens.chatScroll}>
          {conversation.map((m) => (
            <div
              key={m.id}
              style={{
                ...tokens.bubbleRow,
                justifyContent: m.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div style={m.from === "user" ? tokens.bubbleUser : tokens.bubbleAgent}>
                <ReactMarkdown>{m.text}</ReactMarkdown>
                <div style={tokens.timestamp}>{m.time}</div>
              </div>
            </div>
          ))}

          {/* Typing / thinking */}
          {isLoading && (
            <div style={tokens.bubbleRow}>
              <div style={tokens.bubbleAgent}>
                <div style={tokens.thinkingRow}>
                  <span>Thinking</span>
                  <span className="dots">
                    <span style={{ ...tokens.dot, animationDelay: "0s" }} />
                    <span style={{ ...tokens.dot, animationDelay: "0.2s" }} />
                    <span style={{ ...tokens.dot, animationDelay: "0.4s" }} />
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error */}
        {error && (
          <div style={{ color: "#B91C1C", marginTop: 8, fontSize: 13 }}>{error}</div>
        )}

        {/* Input */}
        <form onSubmit={onSubmit} style={tokens.inputRow}>
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={chatConfig.placeholder || "Chat with this agent..."}
            style={tokens.input}
          />
          <button
            type="submit"
            onMouseEnter={() => setIsSubmitHovered(true)}
            onMouseLeave={() => setIsSubmitHovered(false)}
            style={tokens.submit}
            disabled={isLoading}
          >
            ↑
          </button>
        </form>
      </div>

      {/* Minimal global reset + scrollbars */}
      <style jsx global>{`
        html, body, #__next {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        iframe {
          margin: 0;
          padding: 0;
          border: none;
          display: block;
        }

        .chat-container {
          contain: layout style paint;
          isolation: isolate;
        }

        .chat-container::-webkit-scrollbar {
          width: 6px;
        }
        .chat-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-container::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
          border-radius: 3px;
        }
        .chat-container {
          scrollbar-width: thin;
          scrollbar-color: #D1D5DB transparent;
        }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
