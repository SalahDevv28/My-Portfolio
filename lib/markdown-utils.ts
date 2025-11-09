import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { BlogPost, CaseStudy } from './types'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')
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

export function getAllPosts() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      slug,
      ...matterResult.data,
    } as BlogPost
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
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

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      slug,
      ...matterResult.data,
    } as CaseStudy
  })

  // Sort case studies by date
  return allCaseStudiesData.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Process the content
  const processedContent = await remark()
    .use(html)
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    content: contentHtml,
    ...data,
  } as BlogPost
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

  // Create the case study with all required properties, providing fallbacks
  const caseStudy: CaseStudy = {
    slug,
    title: data.title || 'Untitled Project',
    client: data.client || 'Unknown Client',
    description: data.description || 'No description available',
    challenge: data.challenge || 'Challenge not specified',
    solution: data.solution || 'Solution not detailed',
    results: data.results || [],
    technologies: data.technologies || [],
    images: data.images || [],
    category: data.category || 'General',
    duration: data.duration || 'Not specified',
    teamSize: data.teamSize || 1,
    date: data.date,
    content: contentHtml,
  }

  return caseStudy
}

export function getPostsByCategory(category: string) {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export function getCaseStudiesByCategory(category: string) {
  const allCaseStudies = getAllCaseStudies()
  return allCaseStudies.filter((caseStudy) => caseStudy.category === category)
}

export function searchPosts(query: string) {
  const allPosts = getAllPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery) ||
      (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery)))
    )
  })
}

export function getAllCategories() {
  const allPosts = getAllPosts()
  const categories = new Set(allPosts.map((post) => post.category))
  return Array.from(categories)
}