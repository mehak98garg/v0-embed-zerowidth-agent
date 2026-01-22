"use client"

import { useState } from "react"
import { BrandBadge } from "@/components/polar/brand-badge"
import { ChatCard } from "@/components/polar/chat-card"
import { FooterLinks } from "@/components/polar/footer-links"

const DEFAULT_BACKGROUND = "/images/background.png"

export default function PolarLandingPage() {
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_BACKGROUND)

  const handleResetBackground = () => {
    setBackgroundImage(DEFAULT_BACKGROUND)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="flex w-full flex-col items-center">
        <ChatCard userName="Juan" onBackgroundChange={setBackgroundImage} onResetBackground={handleResetBackground} />
      </div>
    </main>
  )
}
