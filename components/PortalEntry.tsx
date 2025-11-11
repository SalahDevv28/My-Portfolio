'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export default function PortalEntry() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleEnter = () => {
    setIsAnimating(true)
    setTimeout(() => {
      router.push('/home')
    }, 1500)
  }

  if (isAnimating) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="animate-fade-in">
          <div className="relative">
            {/* Portal rings */}
            <div className="absolute inset-0 animate-ping">
              <div className="w-32 h-32 border-2 border-purple-600 rounded-full"></div>
            </div>
            <div className="absolute inset-2 animate-ping animation-delay-300">
              <div className="w-28 h-28 border-2 border-accent-600 rounded-full"></div>
            </div>
            <div className="absolute inset-4 animate-ping animation-delay-600">
              <div className="w-24 h-24 border-2 border-purple-400 rounded-full"></div>
            </div>
            
            {/* Portal center */}
            <div className="w-32 h-32 bg-portal-gradient rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {/* Background stars/particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Clickable Portal - Entire Circle is Clickable */}
      <div
        className={`transition-all duration-1000 cursor-pointer group ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        onClick={handleEnter}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Portal rings with hover effects */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isHovered ? 'animate-portal-glow scale-110' : 'animate-portal-glow'
          }`}>
            <div className={`w-40 h-40 border-2 rounded-full transition-all duration-500 ${
              isHovered
                ? 'border-purple-400 opacity-100 scale-110'
                : 'border-purple-600 opacity-80'
            }`}></div>
          </div>
          <div className={`absolute inset-2 transition-all duration-500 ${
            isHovered ? 'animate-portal-glow animation-delay-150 scale-110' : 'animate-portal-glow animation-delay-300'
          }`}>
            <div className={`w-36 h-36 border-2 rounded-full transition-all duration-500 ${
              isHovered
                ? 'border-accent-400 opacity-80 scale-110'
                : 'border-accent-600 opacity-60'
            }`}></div>
          </div>
          <div className={`absolute inset-4 transition-all duration-500 ${
            isHovered ? 'animate-portal-glow animation-delay-300 scale-110' : 'animate-portal-glow animation-delay-600'
          }`}>
            <div className={`w-32 h-32 border-2 rounded-full transition-all duration-500 ${
              isHovered
                ? 'border-purple-300 opacity-60 scale-110'
                : 'border-purple-400 opacity-40'
            }`}></div>
          </div>
          
          {/* Portal center with hover effects */}
          <div className={`w-40 h-40 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-500 ${
            isHovered
              ? 'bg-portal-gradient scale-110 shadow-2xl shadow-purple-500/50'
              : 'bg-portal-gradient'
          }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-500 ${
              isHovered
                ? 'bg-white/20 border-white/40'
                : 'bg-white/10 border-white/20'
            }`}>
              <div className={`w-8 h-8 rounded-full transition-all duration-500 ${
                isHovered
                  ? 'bg-white/30 animate-pulse'
                  : 'bg-white/20 animate-pulse'
              }`}></div>
            </div>
          </div>

          {/* Hover tooltip */}
          <div className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <div className="bg-purple-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap backdrop-blur-sm">
              Click to Enter
            </div>
          </div>
        </div>
      </div>

      {/* Enter button - now optional */}
      <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <button
          onClick={handleEnter}
          className="group flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        >
          <span className="font-medium">Enter here</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Title */}
      <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 text-center transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-4">
          Sybil Solutions
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-md">
          Step into the future of digital innovation
        </p>
      </div>

      {/* Click hint */}
      <div className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center transition-all duration-1000 delay-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        <p className="text-gray-400 text-sm">
          Click the portal or use the button below
        </p>
      </div>
    </div>
  )
}