"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const AnimatedText = ({ text }: { text: string }) => {
  const lettersRef = useRef<HTMLHeadingElement[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lettersRef.current.forEach((letter, index) => {
        if (letter) {
          const rect = letter.getBoundingClientRect()
          const dx = e.clientX - (rect.left + rect.width / 2)
          const dy = e.clientY - (rect.top + rect.height / 2)
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150
          const proximity = Math.max(0, maxDistance - distance) / maxDistance

          letter.style.fontWeight = `${300 + proximity * 1000}`
          letter.style.fontVariationSettings = `"wdth" ${20 * proximity + 100}`
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {text.split("").map((letter, index) => (
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: index * 0.1 },
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block select-none whitespace-nowrap text-7xl transition-all delay-[-30ms] duration-100"
          ref={(element) => {
            if (element) {
              lettersRef.current[index] = element
            }
          }}
        >
          {letter}
        </motion.h1>
      ))}
    </AnimatePresence>
  )
}

export default AnimatedText
