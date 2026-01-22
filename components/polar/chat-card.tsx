"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft } from "lucide-react"
import { ChatInput } from "./chat-input"
import { InputControls } from "./input-controls"
import { SuggestionBadges } from "./suggestion-badges"
import { ChatMessage } from "./chat-message"
import { TypingIndicator } from "./typing-indicator"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatCardProps {
  userName?: string
  onBackgroundChange?: (imageUrl: string) => void
  onResetBackground?: () => void
}

export function ChatCard({ userName = "Juan", onBackgroundChange, onResetBackground }: ChatCardProps) {
  const [inputValue, setInputValue] = useState("")
  const [isChatMode, setIsChatMode] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isChatMode) {
      scrollToBottom()
    }
  }, [messages, isTyping, isChatMode])

  const handleSuggestionSelect = (suggestion: { id: string; label: string }) => {
    setInputValue(suggestion.label)
  }

  const handleBack = () => {
    setIsChatMode(false)
    setMessages([])
    setInputValue("")
  }

  const handleSubmit = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message.trim(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue("")
    setIsChatMode(true)
    setIsTyping(true)

    try {
      // Call the RAG API with conversation history
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("[v0] API error:", errorData)
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: errorData.details || "I'm sorry, I encountered an error processing your request.",
        }
        
        setMessages((prev) => [...prev, errorMessage])
        setIsTyping(false)
        return
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      // Create assistant message placeholder
      const assistantId = (Date.now() + 1).toString()
      const assistantMessage: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
      }
      
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)

      if (!reader) {
        throw new Error("No response stream available")
      }

      // Read the plain text stream
      let accumulatedText = ""
      
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        accumulatedText += chunk
        
        // Update the message content in real-time
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === assistantId 
              ? { ...msg, content: accumulatedText }
              : msg
          )
        )
      }
    } catch (error: any) {
      console.error("[v0] Error calling RAG API:", error)
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: error.message || "I'm sorry, I encountered an error processing your request. Please try again.",
      }
      
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  if (isChatMode) {
    return (
      <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md flex flex-col" style={{ height: "600px" }}>
        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 -ml-2 text-white/60 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.2);
              border-radius: 3px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.3);
            }
          `}</style>
          
          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} content={message.content} />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-6 pb-4 pt-3 border-t border-white/10">
          <ChatInput 
            value={inputValue} 
            onChange={setInputValue} 
            onSubmit={handleSubmit}
            placeholder="Type your message..."
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
      <div className="flex flex-col items-start">
        {/* Header with logo and greeting */}
        <div className="flex flex-col gap-2 items-start mb-6">
          <p className="text-sm text-white/80">Chat with my digital twin!</p>
          <h1 className="text-left text-2xl font-semibold text-white">Ask me anything about my work, skills or experience</h1>
        </div>

        {/* Input section */}
        <div className="flex w-full flex-col gap-1 mb-3">
          <ChatInput 
            value={inputValue} 
            onChange={setInputValue} 
            onSubmit={handleSubmit}
          />
          <InputControls onBackgroundChange={onBackgroundChange} onResetBackground={onResetBackground} />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Suggestions */}
        <SuggestionBadges suggestions={DEFAULT_SUGGESTIONS} onSelect={handleSuggestionSelect} />
      </div>
    </div>
  )
}

const DEFAULT_SUGGESTIONS = [
  { id: "1", label: "Are you a leader or a collaborator?" },
  { id: "2", label: "What are your qualifications?" },
  { id: "3", label: "What are your recent accomplishments?" },
]
