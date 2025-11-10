import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { CaseStudy } from './types'

const caseStudiesDirectory = path.join(process.cwd(), 'content', 'case-studies')

export async function getMarkdownData(directory: string, filename: string) {
  const fullPath = path.join(directory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Process the content
  const processedContent = await remark()
    .use(html)
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    ...data,
    content: contentHtml,
  }
}

export function getAllCaseStudies() {
  // Get file names under /case-studies
  const fileNames = fs.readdirSync(caseStudiesDirectory)
  const allCaseStudiesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(caseStudiesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the frontmatter section
    const matterResult = matter(fileContents)

    // Ensure all required CaseStudy properties are present
    const caseStudy: CaseStudy = {
      slug,
      title: matterResult.data.title || 'Untitled Project',
      date: matterResult.data.date || new Date().toISOString(),
      client: matterResult.data.client || 'Unknown Client',
      category: matterResult.data.category,
      featuredImage: matterResult.data.featuredImage,
      description: matterResult.data.description || 'No description available',
      technicalStack: matterResult.data.technicalStack || [],
      outcomes: matterResult.data.outcomes || [],
      testimonial: matterResult.data.testimonial,
      content: matterResult.data.content || '',
      ...matterResult.data,
    }
    return caseStudy
  })

  // Sort case studies by date
  return allCaseStudiesData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const fullPath = path.join(caseStudiesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Process the content
  const processedContent = await remark()
    .use(html)
    .process(content)

  const contentHtml = processedContent.toString()

  // Ensure all required CaseStudy properties are present
  const caseStudy: CaseStudy = {
    slug,
    title: data.title || 'Untitled Project',
    date: data.date || new Date().toISOString(),
    client: data.client || 'Unknown Client',
    category: data.category,
    featuredImage: data.featuredImage,
    description: data.description || 'No description available',
    technicalStack: data.technicalStack || [],
    outcomes: data.outcomes || [],
    testimonial: data.testimonial,
    content: contentHtml,
    ...data,
  }
  return caseStudy
}

export function getCaseStudiesByCategory(category: string) {
  const allCaseStudies = getAllCaseStudies()
  return allCaseStudies.filter((caseStudy) => caseStudy.category === category)
}

export function searchCaseStudies(query: string) {
  const allCaseStudies = getAllCaseStudies()
  const lowercaseQuery = query.toLowerCase()
  
  return allCaseStudies.filter((caseStudy) => {
    return (
      caseStudy.title.toLowerCase().includes(lowercaseQuery) ||
      caseStudy.description.toLowerCase().includes(lowercaseQuery) ||
      caseStudy.client.toLowerCase().includes(lowercaseQuery) ||
      caseStudy.technicalStack.some((tech: string) => tech.toLowerCase().includes(lowercaseQuery)) ||
      (caseStudy.category && caseStudy.category.toLowerCase().includes(lowercaseQuery))
    )
  })
}

export function getAllCaseStudyCategories() {
  const allCaseStudies = getAllCaseStudies()
  const categories = new Set(allCaseStudies.map((caseStudy) => caseStudy.category).filter(Boolean))
  return Array.from(categories)
}