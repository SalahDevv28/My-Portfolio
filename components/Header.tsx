'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NavItem } from '@/lib/types'

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-gray-800/50'
          : 'bg-background/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="font-heading font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
              SNT Solutions
            </span>
          </Link>

          {/* Desktop Navigation - Right aligned with CTA */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium relative ${
                  pathname === item.href ? 'text-purple-400' : ''
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                )}
              </Link>
            ))}
            <Link
              href="mailto:salahdevv@gmail.com?subject=Discovery Call Request"
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book a discovery call
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-50 animate-in fade-in duration-300">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-heading font-bold text-xl text-white">
                  SNT Solutions
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-4xl font-bold text-center text-gray-300 hover:text-purple-400 transition-colors duration-200 py-4 ${
                    pathname === item.href ? 'text-purple-400' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="p-8 border-t border-gray-800">
              <a
                href="mailto:salahdevv@gmail.com?subject=Discovery Call Request"
                className="block w-full text-center bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a discovery call
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}