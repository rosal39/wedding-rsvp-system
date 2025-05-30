"use client"

import { useEffect, useRef } from "react"

interface BackgroundVideoProps {
  videoSrc: string
}

export default function BackgroundVideo({ videoSrc }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5 // Slow down the video for a more elegant effect
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-80 z-10" />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
      />
    </div>
  )
}
