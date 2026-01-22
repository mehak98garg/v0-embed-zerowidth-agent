interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-white/15 text-white border border-white/20"
            : "bg-white/10 text-white/90 border border-white/10"
        }`}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </div>
      </div>
    </div>
  )
}
