import Link from 'next/link'
import { ArrowRight, Code, Server, Bot, Search, CheckCircle, Users, Clock, Shield } from 'lucide-react'
import SectionDivider from '@/components/SectionDivider'

const services = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern, responsive web applications built with the latest technologies and best practices.',
    icon: Code,
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Angular'],
    features: [
      'Responsive Web Design',
      'Single Page Applications (SPA)',
      'Progressive Web Apps (PWA)',
      'Performance Optimization',
      'Cross-browser Compatibility',
      'Accessibility Compliance (WCAG 2.1)',
      'SEO Optimization',
      'Modern UI/UX Implementation'
    ],
    process: [
      'Requirements Analysis',
      'UI/UX Design Phase',
      'Development Sprint',
      'Testing & QA',
      'Deployment & Launch',
      'Ongoing Support'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Scalable server-side solutions, robust APIs, and secure database architectures.',
    icon: Server,
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Redis', 'GraphQL'],
    features: [
      'RESTful API Development',
      'GraphQL API Implementation',
      'Database Design & Optimization',
      'Cloud Infrastructure Setup',
      'Microservices Architecture',
      'Authentication & Authorization',
      'Caching Strategies',
      'Load Balancing & Scaling'
    ],
    process: [
      'System Architecture Design',
      'Database Schema Design',
      'API Development',
      'Security Implementation',
      'Performance Testing',
      'Documentation & Deployment'
    ]
  },
  {
    id: 'ai-agents',
    title: 'AI Agent Development',
    description: 'Intelligent systems and automated solutions powered by machine learning and AI.',
    icon: Bot,
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'Langchain', 'Hugging Face', 'Vector Databases'],
    features: [
      'Custom AI Model Training',
      'Natural Language Processing',
      'Computer Vision Solutions',
      'Recommendation Systems',
      'Chatbot Development',
      'Process Automation',
      'Data Analysis & Insights',
      'Predictive Analytics'
    ],
    process: [
      'Requirements & Use Case Analysis',
      'Data Collection & Preparation',
      'Model Development & Training',
      'Testing & Validation',
      'Integration & Deployment',
      'Performance Monitoring'
    ]
  },
  {
    id: 'research',
    title: 'Research & Consulting',
    description: 'Expert guidance on technology strategy, code review, and implementation planning.',
    icon: Search,
    technologies: ['Technical Analysis', 'Strategy Planning', 'Code Review', 'Performance Audit'],
    features: [
      'Technology Stack Consultation',
      'Code Review & Optimization',
      'Performance Audits',
      'Architecture Planning',
      'Best Practices Implementation',
      'Security Assessments',
      'Scalability Analysis',
      'Cost-Benefit Analysis'
    ],
    process: [
      'Initial Assessment',
      'Current State Analysis',
      'Recommendations Report',
      'Implementation Roadmap',
      'Follow-up Support',
      'Performance Monitoring'
    ]
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Agile development with regular updates and on-time delivery.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced developers with 8+ years of industry experience.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime guarantee.'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-accent-900/20"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive digital solutions from frontend innovation to AI-powered automation, 
              tailored to accelerate your business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 lg:px-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-xl mb-6">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="accent" />

      {/* Services Detail Sections */}
      {services.map((service, index) => {
        const Icon = service.icon
        return (
          <section key={service.id} className={`py-20 px-6 lg:px-24 ${index % 2 === 1 ? 'bg-gray-900/30' : ''}`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-accent-600 rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-xl text-gray-300 mb-8">
                    {service.description}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-heading font-semibold text-white mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-white mb-4">Technologies We Use</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full border border-purple-600/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading font-semibold text-white mb-4">Our Process</h4>
                    <div className="space-y-3">
                      {service.process.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                            {stepIndex + 1}
                          </div>
                          <span className="text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center btn-primary"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-24 bg-gradient-to-r from-purple-900/20 to-accent-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help bring your vision to life with our expertise and experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg">
              Start Your Project
            </Link>
            <Link href="/portfolio" className="btn-secondary text-lg">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}