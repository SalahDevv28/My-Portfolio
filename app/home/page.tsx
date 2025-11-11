'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Code,
  Server,
  Bot,
  Search,
  Star,
  Users,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
  Mail,
  CheckCircle
} from 'lucide-react'
import SectionDivider from '@/components/SectionDivider'
import TrustedCompaniesCarousel from '@/components/TrustedCompaniesCarousel'

// Service data for the 4 main services
const services = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies like React, Next.js, and TypeScript. We create seamless user experiences that convert.',
    icon: Code,
    features: [
      'React & Next.js Development',
      'TypeScript & JavaScript',
      'Responsive Design (Mobile-First)',
      'Performance Optimization',
      'Accessibility (WCAG 2.1 AA)',
      'Cross-browser Compatibility'
    ],
    href: '/services#frontend',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Scalable server-side solutions, RESTful APIs, and cloud architecture. We build the foundation that powers your applications.',
    icon: Server,
    features: [
      'Node.js & Python Development',
      'Database Design & Optimization',
      'API Development & Integration',
      'Cloud Architecture (AWS, GCP)',
      'Microservices & Serverless',
      'Security & Authentication'
    ],
    href: '/services#backend',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'ai-agents',
    title: 'AI Agent Development',
    description: 'Intelligent automation and machine learning solutions. We develop AI systems that learn, adapt, and solve complex business problems.',
    icon: Bot,
    features: [
      'Machine Learning Models',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'AI Automation Workflows',
      'AI Integration & Deployment'
    ],
    href: '/services#ai-agents',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'research',
    title: 'Research & Consulting',
    description: 'Strategic technology consulting to guide your digital transformation. We provide expert guidance on technology decisions and implementations.',
    icon: Search,
    features: [
      'Technology Strategy',
      'Code Review & Audits',
      'Performance Optimization',
      'Architecture Consulting',
      'Technical Due Diligence',
      'Innovation Workshops'
    ],
    href: '/services#research',
    color: 'from-orange-500 to-red-500'
  }
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechForward Inc.',
    content: 'Sybil Solutions transformed our outdated e-commerce platform into a modern, lightning-fast application. Our conversion rate increased by 40% within the first month.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'DataSync Solutions',
    content: 'The AI agent they developed for us automated 70% of our customer support processes. The ROI was immediate and substantial.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'InnovateLab',
    content: 'Working with Sybil Solutions was exceptional. They delivered on time, within budget, and exceeded all our expectations. Highly recommended.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'VP Engineering',
    company: 'CloudScale Tech',
    content: 'Their expertise in both frontend and backend development is outstanding. They helped us modernize our entire tech stack with zero downtime.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
]

// Partnership logos
const partners = [
  { name: 'Microsoft', logo: 'MS', logoUrl: 'https://en.wikipedia.org/wiki/Microsoft#/media/File:Microsoft_logo_(2012).svg' },
  { name: 'Google', logo: 'G', logoUrl: 'https://en.wikipedia.org/wiki/Google#/media/File:Google_2015_logo.svg' },
  { name: 'Amazon Web Services', logo: 'AWS', logoUrl: 'https://en.wikipedia.org/wiki/Amazon_Web_Services#/media/File:Amazon_Web_Services_Logo.svg' },
  { name: 'Vercel', logo: 'V', logoUrl: 'https://en.wikipedia.org/wiki/Vercel#/media/File:Vercel_logo.svg' },
  { name: 'MongoDB', logo: 'MDB', logoUrl: 'https://en.wikipedia.org/wiki/MongoDB#/media/File:MongoDB_Logo.svg' },
  { name: 'PostgreSQL', logo: 'PSQL', logoUrl: 'https://en.wikipedia.org/wiki/PostgreSQL#/media/File:Postgresql_elephant.svg' }
]

// Stats
const stats = [
  { label: 'Projects Delivered', value: '200+', icon: Award },
  { label: 'Happy Clients', value: '150+', icon: Users },
  { label: 'Years Experience', value: '8+', icon: Star },
  { label: 'Response Time', value: '<24h', icon: Zap }
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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Future</span>
              <br />
              of Digital Solutions
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              We craft innovative web applications, intelligent AI systems, and scalable backend solutions 
              that drive business growth and digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact" 
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Your Project
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/case-studies" 
                className="group px-8 py-4 border-2 border-purple-500 text-purple-300 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From cutting-edge frontend development to intelligent AI solutions, we provide comprehensive digital services 
              that transform your vision into reality.
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
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href={service.href}
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold transition-colors group-hover:translate-x-1"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="accent" />

      {/* Testimonials Carousel Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Clients</span> Say
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

      {/* Partners Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-12">
            Trusted by Leading Companies
          </h3>
          <TrustedCompaniesCarousel companies={partners} />
        </div>
      </section>

      <SectionDivider variant="default" />

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <Mail className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest insights on web development, AI trends, and digital innovation
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}