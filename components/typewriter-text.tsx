"use client"

import useTypewriter from "../hooks/use-typewriter"

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export default function TypewriterText({ text, className = "", speed = 50, delay = 0 }: TypewriterTextProps) {
  const { typedText } = useTypewriter({ text, speed, delay, cursor: true })

  return <div className={className}>{typedText}</div>
}
