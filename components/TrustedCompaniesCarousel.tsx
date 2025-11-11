'use client'

import { useState, useEffect } from 'react'

interface Company {
  name: string
  logo: string
  logoUrl?: string // For Wikipedia logo URLs
}

interface TrustedCompaniesCarouselProps {
  companies: Company[]
  className?: string
}

export default function TrustedCompaniesCarousel({ companies, className = '' }: TrustedCompaniesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Duplicate companies array for infinite loop effect
  const extendedCompanies = [...companies, ...companies, ...companies]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= companies.length) {
          return 0
        }
        return prev + 1
      })
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [companies.length])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex items-center">
        <div 
          className="flex items-center space-x-12 transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / Math.min(6, companies.length))}%)` 
          }}
        >
          {extendedCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 w-32 h-20 flex items-center justify-center group"
            >
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    // Fallback to text logo if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
              ) : null}
              <div 
                className={`${
                  company.logoUrl ? 'hidden' : 'flex'
                } w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <span className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors">
                  {company.logo}
                </span>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <span className="text-gray-400 text-xs group-hover:text-white transition-colors whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
    </div>
  )
}