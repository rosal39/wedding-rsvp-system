"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CursorState {
  isHovering: boolean
  isClicking: boolean
  cursorText: string
  cursorVariant: "default" | "hover" | "click" | "text"
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    cursorText: "",
    cursorVariant: "default",
  })

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true, cursorVariant: "click" }))
    }

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false, cursorVariant: prev.isHovering ? "hover" : "default" }))
    }

    // Add event listeners for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, [role="button"], .cursor-pointer, .cursor-hover',
      )

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          const text = el.getAttribute("data-cursor-text") || ""
          setCursorState({
            isHovering: true,
            isClicking: false,
            cursorText: text,
            cursorVariant: "hover",
          })
        })

        el.addEventListener("mouseleave", () => {
          setCursorState({
            isHovering: false,
            isClicking: false,
            cursorText: "",
            cursorVariant: "default",
          })
        })
      })
    }

    // Add text selection listeners
    const addTextListeners = () => {
      const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div")

      textElements.forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          const target = e.target as HTMLElement
          if (
            !target.closest("button") &&
            !target.closest("a") &&
            !target.closest("input") &&
            !target.closest("textarea") &&
            !target.closest('[role="button"]') &&
            target.textContent &&
            target.textContent.trim().length > 0
          ) {
            setCursorState((prev) => ({
              ...prev,
              cursorVariant: "text",
            }))
          }
        })

        el.addEventListener("mouseleave", () => {
          setCursorState((prev) => ({
            ...prev,
            cursorVariant: "default",
          }))
        })
      })
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Initial setup and re-setup on DOM changes
    const setupListeners = () => {
      addHoverListeners()
      addTextListeners()
    }

    setupListeners()

    // Re-setup listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(setupListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      width: 32,
      height: 32,
    },
    hover: {
      scale: 1.5,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      border: "1px solid rgba(59, 130, 246, 0.6)",
      width: 48,
      height: 48,
    },
    click: {
      scale: 0.8,
      backgroundColor: "rgba(59, 130, 246, 0.4)",
      border: "1px solid rgba(59, 130, 246, 0.8)",
      width: 28,
      height: 28,
    },
    text: {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      width: 2,
      height: 24,
      borderRadius: "1px",
    },
  }

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full backdrop-blur-sm"
          variants={cursorVariants}
          animate={cursorState.cursorVariant}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        >
          {/* Cursor text */}
          {cursorState.cursorText && (
            <motion.span
              className="absolute top-full mt-2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {cursorState.cursorText}
            </motion.span>
          )}

          {/* Cursor dot */}
          <motion.div
            className="w-1 h-1 bg-white rounded-full"
            animate={{
              scale: cursorState.cursorVariant === "text" ? 0 : 1,
              opacity: cursorState.cursorVariant === "text" ? 0 : 1,
            }}
          />
        </motion.div>

        {/* Trailing effect */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/20"
          animate={{
            scale: cursorState.isHovering ? 2 : 1.5,
            opacity: cursorState.isHovering ? 0.3 : 0.1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        />
      </motion.div>

      {/* Cursor trail particles */}
      <CursorTrail cursorX={cursorXSpring} cursorY={cursorYSpring} />
    </>
  )
}

// Cursor trail component for elegant particle effects
function CursorTrail({ cursorX, cursorY }: { cursorX: any; cursorY: any }) {
  const [trail, setTrail] = useState<Array<{ id: number; x: number; y: number }>>([])
  const trailRef = useRef<number>(0)

  useEffect(() => {
    const unsubscribeX = cursorX.onChange((x: number) => {
      const y = cursorY.get()
      setTrail((prev) => {
        const newTrail = [
          { id: trailRef.current++, x: x + 16, y: y + 16 },
          ...prev.slice(0, 8), // Keep only last 8 trail points
        ]
        return newTrail
      })
    })

    return unsubscribeX
  }, [cursorX, cursorY])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: point.x,
            top: point.y,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: index * 0.05,
          }}
        />
      ))}
    </div>
  )
}
