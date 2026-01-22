"use client"

import type React from "react"
import { Search } from "lucide-react"

interface ChatInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
}

export function ChatInput({
  placeholder = "Ask me anything...",
  value: externalValue,
  onChange: externalOnChange,
  onSubmit,
}: ChatInputProps) {
  const value = externalValue ?? ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && onSubmit) {
      onSubmit(value)
      externalOnChange?.("")
    }
  }

  const handleSearchClick = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value)
      externalOnChange?.("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <input
        type="text"
        value={value}
        onChange={(e) => externalOnChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full border-0 bg-white/10 pl-4 pr-12 py-3 text-white placeholder:text-white/50 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-white/30 rounded-full"
      />
      <button
        type="button"
        onClick={handleSearchClick}
        aria-label="Search"
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white/60 hover:bg-white/20 hover:text-white transition-all"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  )
}
