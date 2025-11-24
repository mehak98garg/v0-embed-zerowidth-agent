// =============================================================================
// Chat Agent with Modern Mehak.ai Design (React + Vercel)
//
// Updated with mobile-friendly suggested prompts
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
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [hoveredPromptIndex, setHoveredPromptIndex] = useState(null);
  
  const messagesEndRef = useRef(null);

  // Initialize IDs
  useEffect(() => {
    setSessionId(getSessionId());
    setUserId(getUserId());
  }, []);

  // Prevent any initial scrolling behavior on mount
  useEffect(() => {
    const preventInitialScroll = () => {
      window.scrollTo({ top: window.scrollY, behavior: 'auto' });
    };
    
    preventInitialScroll();
    const timeoutId = setTimeout(preventInitialScroll, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToBottom = () => {
    if (conversation.length === 0) return;
    
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    if (conversation.length > 0) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 50);
      
      return () => clearTimeout(timeoutId);
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
      margin: "4px 24px 4px auto",
      maxWidth: "calc(100% - 24px)",
      width: "fit-content",
      fontSize: "14px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      wordBreak: "break-word",
    },
    agent: {
      alignSelf: "flex-start",
      backgroundColor: chatConfig.styling?.aiBubbleBackground || "#E5E5E5",
      color: chatConfig.styling?.aiBubbleTextColor || "#000000",
      padding: "12px 16px",
      borderRadius: "18px 18px 18px 4px",
      margin: "4px 0 4px 24px",
      maxWidth: "calc(75% - 24px)",
      width: "fit-content",
      fontSize: "14px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      wordBreak: "break-word",
      display: "inline-block",
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        maxWidth: "none",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Modern Header */}
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
              fontSize: "16px", 
              fontWeight: "300", 
              margin: "0",
              fontFamily: "Poppins, sans-serif"
            }}>
              {chatConfig.header.description}
            </h2>
            {chatConfig.header.showOnlineStatus && (
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                marginTop: "6px" 
              }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#E6FF99",
                  borderRadius: "50%",
                }}></div>
                <span style={{ 
                  fontSize: "10px", 
                  opacity: "0.8",
                  textTransform: "uppercase"
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
        padding: "0"
      }}>
        {/* Scrollable Messages */}
        <div
          className="chat-container"
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            overflowY: "auto",
            paddingTop: "24px",
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
                marginLeft: msg.role === "user" ? "auto" : "24px",
                marginRight: msg.role === "user" ? "24px" : "auto",
                textAlign: msg.role === "user" ? "right" : "left",
                maxWidth: "calc(100% - 48px)"
              }}>
                {formatTime(new Date())}
              </div>
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div style={{...bubbleStyles.agent, margin: "4px 0 4px 24px"}}>
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
                  Thinking...
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Prompts - Mobile-Friendly with horizontal scroll */}
      <div style={{ 
        padding: "0 16px 16px", 
        marginTop: "12px",
        width: "100%",
        boxSizing: "border-box"
      }}>
        <h3 style={{ 
          fontSize: "13px", 
          fontWeight: "500", 
          color: "#374151", 
          marginBottom: "12px",
          margin: "0 0 12px 0"
        }}>
          {chatConfig.suggestedPromptsTitle}
        </h3>
        <div style={{ 
          display: "flex", 
          gap: "8px", 
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {chatConfig.suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptClick(prompt)}
              onMouseOver={() => setHoveredPromptIndex(index)}
              onMouseOut={() => setHoveredPromptIndex(null)}
              onTouchStart={() => setHoveredPromptIndex(index)}
              onTouchEnd={() => setHoveredPromptIndex(null)}
              disabled={isLoading}
              style={{
                flex: "0 0 auto",
                minWidth: "160px",
                maxWidth: "220px",
                padding: "12px 16px",
                backgroundColor: hoveredPromptIndex === index 
                  ? (chatConfig.styling?.promptHoverBackground || "#F5F5F5")
                  : (chatConfig.styling?.promptBackground || "#FFFFFF"),
                border: `1px solid ${chatConfig.styling?.promptBorder || "#E0E0E0"}`,
                borderRadius: "8px",
                fontSize: "13px",
                textAlign: "left",
                cursor: isLoading ? "default" : "pointer",
                transition: "all 0.2s ease",
                boxShadow: hoveredPromptIndex === index 
                  ? "0 2px 8px rgba(0,0,0,0.15)" 
                  : "0 1px 3px rgba(0,0,0,0.1)",
                opacity: isLoading ? "0.6" : "1",
                whiteSpace: "normal",
                wordWrap: "break-word",
                lineHeight: "1.4",
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

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
              autoFocus={false}
              autoComplete="off"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: `1px solid ${chatConfig.styling?.promptBorder || "#E0E0E0"}`,
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: chatConfig.styling?.inputBackground || "#FFFFFF",
                transition: "border-color 0.2s ease",
                textAlign: "left",
                paddingLeft: "16px",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007BFF";
                e.preventDefault();
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
                (chatConfig.styling?.buttonHoverBackground || "#E5E5E5") : 
                (chatConfig.styling?.buttonBackground || "#242424"),
              color: isSubmitHovered ? "#000000" : "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              padding: "0",
              margin: "0",
              cursor: (!message.trim() || isLoading) ? "default" : "pointer",
              transition: "all 0.2s ease",
              opacity: (!message.trim() || isLoading) ? "0.5" : "1",
              width: "48px",
              height: "48px",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ 
                display: "block",
                margin: "0",
                padding: "0"
              }}
            >
              <path
                d="M10 3L10 17M10 3L15 8M10 3L5 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        
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
          borderRadius: "3px";
        }
        .chat-container::-webkit-scrollbar-thumb:hover {
          background-color: #9CA3AF;
        }
        .chat-container {
          scrollbar-width: thin;
          scrollbar-color: #D1D5DB transparent;
        }
        
        /* Hide scrollbar for suggested prompts on mobile */
        div::-webkit-scrollbar {
          display: none;
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
