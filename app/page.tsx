'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
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
  MessageCircle,
  Search,
  PenTool,
  ZapIcon,
  Globe,
  Code,
  Workflow
} from 'lucide-react'
import SectionDivider from '@/components/SectionDivider'

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
  { label: 'Projects Delivered', value: '10+', icon: Award },
  { label: 'Happy Clients', value: '3+', icon: Users },
  { label: 'AI-Powered Solutions', value: '100%', icon: Star },
  { label: 'Response Time', value: '<24h', icon: Zap }
]

// Services data
const services = [
  {
    icon: Globe,
    title: 'Modern Websites',
    description: 'We build fast, responsive, and visually stunning websites using Next.js, React, and modern web technologies. Every site is crafted to convert visitors into customers.',
    features: ['Next.js & React', 'Responsive Design', 'SEO Optimized', 'Performance First']
  },
  {
    icon: Workflow,
    title: 'Notion Systems',
    description: 'We transform Notion into a powerful business operations hub. Custom databases, automated workflows, and seamless integrations that keep your team organized and productive.',
    features: ['Custom Databases', 'Workflow Automation', 'Team Training', 'Ongoing Support']
  },
  {
    icon: Bot,
    title: 'AI Automations',
    description: 'Intelligent AI agents and automations that handle repetitive tasks, analyze data, and supercharge your workflows. We build systems that work while you sleep.',
    features: ['AI Agents', 'Smart Workflows', 'Data Processing', 'Custom Integrations']
  }
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
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Intelligent</span>
              <br />
              Digital Solutions
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              From modern websites to AI-powered Notion systems and automations—we help businesses
              transform their digital presence and operate at peak efficiency.
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

      {/* What We Do Section */}
      <section className="py-20 px-6 lg:px-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">We Do</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We specialize in three core areas that help businesses thrive in the digital age.
              Each service is tailored to your unique needs and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section id="services" className="py-20 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Design Philosophy</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We believe in the power of AI-enhanced Notion systems to transform how businesses operate.
              Our approach combines clean design, intelligent automation, and seamless user experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Philosophy Card 1 */}
          <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
              Understand First
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Every great system starts with deep understanding. We take the time to learn your workflows,
              challenges, and goals before designing a solution.
            </p>
            <p className="text-gray-300 text-sm">
              We analyze your current Notion setup, identify pain points, and map out opportunities
              for AI-driven improvements.
            </p>
          </div>

          {/* Philosophy Card 2 */}
          <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
              Design with Purpose
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Clean, intuitive design isn't just about aesthetics—it's about creating systems
              that people actually want to use.
            </p>
            <p className="text-gray-300 text-sm">
              We craft Notion workspaces that are both beautiful and functional, with careful
              attention to user experience and information architecture.
            </p>
          </div>

          {/* Philosophy Card 3 */}
          <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ZapIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
              Automate Intelligently
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              AI should enhance human work, not replace it. We build smart automations that
              handle repetitive tasks while preserving human creativity.
            </p>
            <p className="text-gray-300 text-sm">
              From automated workflows to AI-powered insights, we create systems that learn,
              adapt, and make your team more productive every day.
            </p>
          </div>
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
              Let's discuss your project and see how we can help bring your vision to life.
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
