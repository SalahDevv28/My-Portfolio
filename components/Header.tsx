'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NavItem } from '@/lib/types'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'

const navigation: NavItem[] = [
  { name: 'Home', href: '/home' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isScrollingUp, isScrollingDown, scrollY } = useScrollDirection()
  const pathname = usePathname()

  const isPortalPage = pathname === '/'
  const shouldHideHeader = isPortalPage ? false : isScrollingDown && scrollY > 50
  const shouldShowHeader = isPortalPage ? true : isScrollingUp || scrollY < 50

  useEffect(() => {
    setIsScrolled(window.scrollY > 50)
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
        shouldShowHeader ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-gray-800/50'
          : 'bg-background/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-accent-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
              Sybil Solutions
            </span>
          </Link>

          {/* Desktop Navigation - Right aligned */}
          <nav className="hidden md:flex items-center space-x-8">
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
          </nav>

          {/* CTA Button - Right aligned */}
          <div className="hidden md:flex">
            <Link
              href="/contact"
              className="btn-primary text-sm hover:scale-105 transition-transform"
            >
              Get Started
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
                className="flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-heading font-bold text-xl text-white">
                  Sybil Solutions
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
              <Link
                href="/contact"
                className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}