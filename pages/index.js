// =============================================================================
// Chat Agent with Modern Mehak.ai Design (React + Vercel)
//
// Updated to match the lovable design with dark header, online status,
// rotating prompts, and modern styling with all requested changes
//
// Author: Thomas J McLeish (Updated for Mehak.ai design)
// Date: March 2, 2025
// =============================================================================

import chatConfig from "../config/config";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";

const getSessionId = () => {
  if (typeof window === "undefined") return "";
  let sessionId = sessionStorage.getItem("sessionId");
  sessionId = sessionId && sessionId.length <= 32 ? sessionId : null;
  if (!sessionId) {
    sessionId = uuidv4().replace(/-/g, "").slice(0, 32);
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const getUserId = () => {
  if (typeof window === "undefined") return "";
  let userId = localStorage.getItem("userId");
  userId = userId && userId.length <= 32 ? userId : null;
  if (!userId) {
    userId = uuidv4().replace(/-/g, "").slice(0, 32);
    localStorage.setItem("userId", userId);
  }
  return userId;
};

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
  
  const messagesEndRef = useRef(null);

  // Initialize IDs
  useEffect(() => {
    setSessionId(getSessionId());
    setUserId(getUserId());
  }, []);

  // Rotate suggested prompts
  useEffect(() => {
    if (chatConfig.behavior?.rotatePrompts && showSuggestions) {
      const interval = setInterval(() => {
        setCurrentPromptIndex((prevIndex) => 
          (prevIndex + 1) % chatConfig.suggestedPrompts.length
        );
      }, chatConfig.behavior.rotationInterval || 4500);
      return () => clearInterval(interval);
    }
  }, [showSuggestions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (document.querySelector(".chat-container")) {
      scrollToBottom();
    }
  }, [conversation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMessage(message);
  };

  const submitMessage = async (userInput) => {
    if (!userInput.trim()) return;

    setMessage("");
    setError(null);
    setShowSuggestions(false); // Hide suggestions after first message

    const userMessage = {
      role: "user",
      content: userInput.trim(),
    };

    setConversation((prev) => [...prev, userMessage]);

    const payload = {
      data: { message: userMessage },
      stateful: true,
      stream: false,
      user_id: userId,
      session_id: sessionId,
      verbose: false,
    };

    try {
      setIsLoading(true);

      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      const agentReply = data.output_data?.content || "No valid response received from agent.";

      const agentMessage = {
        role: "agent",
        content: agentReply,
      };

      setConversation((prev) => [...prev, agentMessage]);
    } catch (err) {
      console.error("Error fetching agent response:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt) => {
    setMessage(prompt);
    setTimeout(() => {
      submitMessage(prompt);
    }, 0);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const bubbleStyles = {
    user: {
      alignSelf: "flex-end",
      backgroundColor: chatConfig.styling?.userBubbleBackground || "#007BFF",
      color: chatConfig.styling?.userBubbleTextColor || "#FFFFFF",
      padding: "12px 16px",
      borderRadius: "18px 18px 4px 18px",
      margin: "4px 0",
      maxWidth: "80%",
      fontSize: "14px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    agent: {
      alignSelf: "flex-start",
      backgroundColor: chatConfig.styling?.aiBubbleBackground || "#E5E5E5",
      color: chatConfig.styling?.aiBubbleTextColor || "#000000",
      padding: "12px 16px",
      borderRadius: "18px 18px 18px 4px",
      margin: "4px 0",
      maxWidth: "80%",
      fontSize: "14px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div
      style={{
        padding: "0",
        width: "100vw",
        maxWidth: "1040px",
        margin: "0 auto",
        height: chatConfig.maxChatHeight || "480px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        borderRadius: "4px",
        border: "1px solid #E0E0E0",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none", // Removed drop shadow
      }}
    >
      {/* Modern Header with Online Status */}
      <div
        style={{
          backgroundColor: chatConfig.styling?.headerBackground || "#2D2D2D",
          color: chatConfig.styling?.headerTextColor || "#FFFFFF",
          padding: "24px",
          borderRadius: "4px 4px 0 0",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div>
            <h2 style={{ 
              fontSize: "20px", 
              fontWeight: "300", 
              margin: "0",
              fontFamily: "Poppins, sans-serif"
            }}>
              {chatConfig.header.title}
            </h2>
            {chatConfig.header.showOnlineStatus && (
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginTop: "12px" 
              }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#22C55E",
                  borderRadius: "50%",
                }}></div>
                <span style={{ 
                  fontSize: "14px", 
                  opacity: "0.8" 
                }}>
                  Online
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ 
        flex: "1", 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "0",
        padding: "0 24px"
      }}>
        {/* AI Welcome Message */}
        <div style={{ paddingTop: "24px", paddingBottom: "16px" }}>
          <div style={bubbleStyles.agent}>
            <p style={{ margin: "0", fontSize: "14px" }}>
              {chatConfig.header.description}
            </p>
          </div>
          <div style={{ 
            fontSize: "12px", 
            color: "#6B7280", 
            marginTop: "8px", 
            marginLeft: "8px" 
          }}>
            {formatTime(new Date())}
          </div>
        </div>

        {/* Scrollable Messages */}
        <div
          className="chat-container"
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            overflowY: "auto",
            paddingBottom: "16px",
          }}
        >
          {conversation.map((msg, index) => (
            <div key={index}>
              <div style={msg.role === "user" ? bubbleStyles.user : bubbleStyles.agent}>
                {msg.role === "agent" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
              <div style={{ 
                fontSize: "12px", 
                color: "#6B7280", 
                marginTop: "4px",
                marginLeft: msg.role === "user" ? "auto" : "8px",
                marginRight: msg.role === "user" ? "8px" : "auto",
                textAlign: msg.role === "user" ? "right" : "left",
                maxWidth: "80%"
              }}>
                {formatTime(new Date())}
              </div>
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div style={bubbleStyles.agent}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#6B7280",
                    borderRadius: "50%",
                    animation: "bounce 1.4s ease-in-out 0s infinite both"
                  }}></div>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#6B7280",
                    borderRadius: "50%",
                    animation: "bounce 1.4s ease-in-out 0.16s infinite both"
                  }}></div>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#6B7280",
                    borderRadius: "50%",
                    animation: "bounce 1.4s ease-in-out 0.32s infinite both"
                  }}></div>
                </div>
                <span style={{ fontSize: "12px", color: "#6B7280" }}>
                  AI is typing...
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Prompts */}
      {showSuggestions && (
        <div style={{ padding: "0 24px 16px" }}>
          <h3 style={{ 
            fontSize: "14px", 
            fontWeight: "500", 
            color: "#374151", 
            marginBottom: "12px",
            margin: "0 0 12px 0"
          }}>
            {chatConfig.suggestedPromptsTitle}
          </h3>
          <div style={{ minHeight: "60px" }}>
            <button
              onClick={() => handlePromptClick(chatConfig.suggestedPrompts[currentPromptIndex])}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: chatConfig.styling?.promptBackground || "#FFFFFF",
                border: `1px solid ${chatConfig.styling?.promptBorder || "#E0E0E0"}`,
                borderRadius: "8px",
                fontSize: "14px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = chatConfig.styling?.promptHoverBackground || "#F5F5F5";
                e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = chatConfig.styling?.promptBackground || "#FFFFFF";
                e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
              }}
            >
              {chatConfig.suggestedPrompts[currentPromptIndex]}
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div style={{ 
        borderTop: "1px solid #E0E0E0", 
        padding: "14px" 
      }}>
        <form onSubmit={handleSubmit} style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "12px" 
        }}>
          <div style={{ flex: "1" }}>
            <input
              type="text"
              placeholder={chatConfig.chatInputPlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: `1px solid ${chatConfig.styling?.promptBorder || "#E0E0E0"}`,
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: chatConfig.styling?.inputBackground || "#FFFFFF",
                transition: "border-color 0.2s ease",
                textAlign: "right", // Right align the input text
                paddingRight: "16px", // Ensure proper spacing
                boxSizing: "border-box", // Prevent overlapping
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007BFF";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = chatConfig.styling?.promptBorder || "#E0E0E0";
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            onMouseOver={() => setIsSubmitHovered(true)}
            onMouseOut={() => setIsSubmitHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isSubmitHovered ? 
                (chatConfig.styling?.buttonHoverBackground || "#007BFF") : 
                (chatConfig.styling?.buttonBackground || "#242424"),
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              cursor: (!message.trim() || isLoading) ? "default" : "pointer",
              transition: "all 0.2s ease",
              opacity: (!message.trim() || isLoading) ? "0.5" : "1",
              minWidth: "48px", // Ensure button has minimum width
              flexShrink: 0, // Prevent button from shrinking
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          color: "#EF4444", 
          padding: "16px 24px",
          backgroundColor: "#FEF2F2",
          borderTop: "1px solid #FECACA",
          fontSize: "14px"
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        
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
        .chat-container::-webkit-scrollbar-thumb:hover {
          background-color: #9CA3AF;
        }
        .chat-container {
          scrollbar-width: thin;
          scrollbar-color: #D1D5DB transparent;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
