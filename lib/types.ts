export interface NavItem {
  name: string
  href: string
  description?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  href: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  featuredImage: string
  readTime: number
}

export interface CaseStudy {
  slug: string
  title: string
  client: string
  description: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  images: string[]
  category: string
  duration: string
  teamSize: number
  date?: string
  content?: string
}