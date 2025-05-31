"use client"

import { useState, useEffect } from "react"

interface TypewriterOptions {
  text: string
  speed?: number
  delay?: number
  cursor?: boolean
}

export default function useTypewriter({ text, speed = 50, delay = 0, cursor = true }: TypewriterOptions) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Reset when text changes
    setDisplayText("")
    setCurrentIndex(0)
    setIsTyping(false)

    // Initial delay before typing starts
    timeout = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [isTyping, currentIndex, text, speed])

  return {
    displayText,
    isFinished: currentIndex >= text.length,
    isTyping,
    typedText: cursor ? (
      <span>
        {displayText}
        <span className={`inline-block w-[0.1em] h-[1.2em] ml-[2px] bg-white ${isTyping ? "animate-blink" : ""}`} />
      </span>
    ) : (
      displayText
    ),
  }
}
