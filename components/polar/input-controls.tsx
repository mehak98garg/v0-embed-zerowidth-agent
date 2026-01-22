"use client"

interface InputControlsProps {
  modelName?: string
  onBackgroundChange?: (imageUrl: string) => void
  onResetBackground?: () => void
}

export function InputControls({ modelName = "Polar 4.5", onBackgroundChange, onResetBackground }: InputControlsProps) {
  return (
    <div className="h-8" />
  )
}
