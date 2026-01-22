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

  const handleSubmit = (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsChatMode(true)
    setIsTyping(true)

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAssistantResponse(message.trim()),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAssistantResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("leader") || lowerMessage.includes("collaborator")) {
      return "I'm naturally a collaborative leader. I believe in empowering team members while providing clear direction and support. I've led several cross-functional projects where fostering open communication and shared ownership was key to our success."
    }
    
    if (lowerMessage.includes("qualification") || lowerMessage.includes("education")) {
      return "I hold a Bachelor's degree in Computer Science and have completed several professional certifications including AWS Solutions Architect and Google Cloud Professional. I've also pursued continuous learning through advanced courses in machine learning and system design."
    }
    
    if (lowerMessage.includes("accomplishment") || lowerMessage.includes("achievement")) {
      return "Recently, I architected and led the development of a scalable microservices platform that reduced system latency by 40% and improved deployment frequency from weekly to daily releases. I also mentored 5 junior engineers who have since been promoted to mid-level positions."
    }
    
    return "That's a great question! I'd be happy to share more about my background and experience. Feel free to ask me about my technical skills, project experience, leadership style, or any specific areas you're curious about."
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
