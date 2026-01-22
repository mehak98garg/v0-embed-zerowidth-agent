export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white/10 border border-white/10">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
