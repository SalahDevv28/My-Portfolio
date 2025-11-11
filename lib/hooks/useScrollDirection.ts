import { useState, useEffect } from 'react'

interface UseScrollDirectionReturn {
  isScrollingUp: boolean
  isScrollingDown: boolean
  scrollY: number
}

/**
 * Custom hook to detect scroll direction
 * @returns Object with scroll direction state
 */
export function useScrollDirection(): UseScrollDirectionReturn {
  const [scrollY, setScrollY] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollDirection = () => {
      const currentScrollY = window.pageYOffset
      const direction = currentScrollY > lastScrollY ? 'down' : 'up'
      
      setScrollY(currentScrollY)
      setIsScrollingDown(direction === 'down' && currentScrollY > 10)
      setIsScrollingUp(direction === 'up' && currentScrollY < lastScrollY)
      
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
    }

    // Throttle scroll events for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollDirection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    isScrollingUp,
    isScrollingDown,
    scrollY
  }
}