'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Code,
  Bot,
  Layers,
  Star,
  Users,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
  Mail,
  CheckCircle,
  MessageCircle
} from 'lucide-react'
import SectionDivider from '@/components/SectionDivider'

// Service data for the 3 main services
const services = [
  {
    id: 'websites',
    title: 'Building Websites',
    description: 'Modern, high-performance websites built with Next.js and React. We create stunning, responsive designs that convert visitors into customers.',
    icon: Code,
    features: [
      'Next.js & React Development',
      'Responsive & Mobile-First Design',
      'Performance Optimization',
      'SEO Best Practices',
      'Accessibility (WCAG 2.1 AA)',
      'Ongoing Maintenance & Support'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'notion-systems',
    title: 'Customized Notion Systems',
    description: 'Fully customized Notion workspaces powered with AI automations. We transform your Notion into a powerful, intelligent business operations hub.',
    icon: Layers,
    features: [
      'Custom Notion Workspace Design',
      'AI-Powered Automations',
      'Database & Template Creation',
      'Workflow Optimization',
      'Integration with External Tools',
      'Team Training & Documentation'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'ai-automations',
    title: 'AI Agents & Automations',
    description: 'Intelligent AI agents and automation solutions that streamline your business processes. We build custom AI systems that work 24/7.',
    icon: Bot,
    features: [
      'Custom AI Agent Development',
      'Workflow Automation',
      'Natural Language Processing',
      'Data Processing & Analysis',
      'API Integrations',
      'Monitoring & Optimization'
    ],
    color: 'from-green-500 to-emerald-500'
  }
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Founder',
    company: 'TechStart Inc.',
    content: 'SNT built our entire website and Notion system with AI automations. The transformation was incredible - our productivity increased by 60%.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Operations Manager',
    company: 'DataFlow Solutions',
    content: 'The AI agent they created automated our entire customer onboarding process. We saved over 20 hours per week and improved customer satisfaction.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'CEO',
    company: 'InnovateTech',
    content: 'Working with SNT was exceptional. They delivered a stunning website that perfectly represents our brand and set up powerful Notion automations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Product Lead',
    company: 'ScaleUp Tech',
    content: 'Their AI automation solutions revolutionized how we handle data processing. The ROI was immediate and substantial. Highly recommended.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
]

// Stats
const stats = [
  { label: 'Projects Built & Delivered', value: '10+', icon: Award },
  { label: 'Clients Across Different Use Cases', value: '3+', icon: Users },
  { label: 'AI-Powered Systems and workflows', value: '100%', icon: Star },
  { label: 'Response Fast & Reliable', value: '<24h', icon: Zap }
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Intelligent</span>
              <br />
              Digital Solutions
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              I build modern websites, customized Notion systems with AI, and intelligent automations 
              that help businesses grow and operate more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact" 
                className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book a discovery call
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Do</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              I specialize in three core areas, helping businesses build modern digital presence and automate their operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={service.id}
                  className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="accent" />

      {/* Testimonials Carousel Section */}
      <section className="py-20 px-6 lg:px-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Clients</span> Say
            </h2>
          </div>
          
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full border-2 border-purple-500"
                />
              </div>
              
              <blockquote className="text-xl text-gray-300 mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div>
                <div className="font-semibold text-white">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-purple-400">
                  {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-purple-500 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="subtle" />

      {/* Contact Section on Homepage */}
      <section className="py-20 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12">
            <MessageCircle className="w-16 h-16 text-pink-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how I can help bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Book a discovery call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="text-gray-400 text-sm mt-4">
              Free 30-minute consultation to discuss your needs
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
