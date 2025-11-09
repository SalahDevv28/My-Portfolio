// Test file to demonstrate proper CaseStudy type usage

import { CaseStudy } from './lib/types'

// Correct: Using CaseStudy as a type annotation
const caseStudyExample: CaseStudy = {
  slug: 'test-case-study',
  title: 'Test Case Study',
  client: 'Test Client',
  description: 'This is a test case study description',
  challenge: 'The main challenge was to demonstrate proper type usage',
  solution: 'We fixed the type vs value issue in the code',
  results: ['Improved type safety', 'Fixed compilation errors'],
  technologies: ['TypeScript', 'Next.js'],
  images: ['/images/test1.jpg', '/images/test2.jpg'],
  category: 'Web Development',
  duration: '3 months',
  teamSize: 5,
  date: '2025-01-15',
  content: 'Full case study content here...'
}

// Correct: Using CaseStudy in function parameter type annotation
function processCaseStudy(caseStudy: CaseStudy): string {
  return `Processing: ${caseStudy.title}`
}

// Correct: Using CaseStudy as return type annotation
function getCaseStudyTemplate(): CaseStudy {
  return {
    slug: '',
    title: '',
    client: '',
    description: '',
    challenge: '',
    solution: '',
    results: [],
    technologies: [],
    images: [],
    category: '',
    duration: '',
    teamSize: 0
  }
}

// Example usage
const processedTitle = processCaseStudy(caseStudyExample)
const template = getCaseStudyTemplate()

console.log('CaseStudy import and usage test completed successfully!')