"use client"

import { useState, useEffect, useRef } from "react"

interface Suggestion {
  id: string
  label: string
}

interface SuggestionBadgesProps {
  suggestions: Suggestion[]
  onSelect?: (suggestion: Suggestion) => void
}

export function SuggestionBadges({ suggestions, onSelect }: SuggestionBadgesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    if (!mediaQuery.matches && !isPaused) {
      // Cycle through prompts every 2 seconds
      timerRef.current = setInterval(() => {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % suggestions.length)
          setIsAnimating(false)
        }, 200) // Quick fade out before switching
      }, 2000)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [suggestions.length, prefersReducedMotion, isPaused])

  const handleClick = () => {
    const currentSuggestion = suggestions[currentIndex]
    onSelect?.(currentSuggestion)
    
    // Pause cycling for 4 seconds after click
    setIsPaused(true)
    setTimeout(() => {
      setIsPaused(false)
    }, 4000)
  }

  const currentSuggestion = suggestions[currentIndex]

  return (
    <div className="w-full flex flex-col gap-3">
      <h3 className="text-sm text-white/60 font-medium">Suggested Prompts</h3>
      <button
        onClick={handleClick}
        className={`text-left text-sm text-white/70 transition-all hover:text-white hover:underline cursor-pointer ${
          isAnimating && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          transition: prefersReducedMotion 
            ? 'color 0.2s ease' 
            : 'opacity 0.3s ease, transform 0.3s ease, color 0.2s ease',
          transform: isAnimating && !prefersReducedMotion ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {currentSuggestion?.label}
      </button>
    </div>
  )
}
