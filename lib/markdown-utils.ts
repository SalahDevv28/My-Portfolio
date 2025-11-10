import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { BlogPost } from './types'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

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

    // Combine the data with the id, ensuring all required properties
    const postData = {
      slug,
      title: matterResult.data.title || 'Untitled Post',
      excerpt: matterResult.data.excerpt || '',
      content: matterResult.data.content || '',
      author: matterResult.data.author || 'Unknown Author',
      date: matterResult.data.date || new Date().toISOString(),
      category: matterResult.data.category || 'General',
      tags: matterResult.data.tags || [],
      featuredImage: matterResult.data.featuredImage || '/images/placeholder.jpg',
      readTime: matterResult.data.readTime || 5,
      ...matterResult.data,
    }
    return postData
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
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

  // Ensure all required BlogPost properties are present
  const blogPost: BlogPost = {
    slug,
    title: data.title || 'Untitled Post',
    excerpt: data.excerpt || '',
    content: contentHtml,
    author: data.author || 'Unknown Author',
    date: data.date || new Date().toISOString(),
    category: data.category || 'General',
    tags: data.tags || [],
    featuredImage: data.featuredImage || '/images/placeholder.jpg',
    readTime: data.readTime || 5,
    ...data,
  }
  return blogPost
}

export function getPostsByCategory(category: string) {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export function searchPosts(query: string) {
  const allPosts = getAllPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
    )
  })
}

export function getAllCategories() {
  const allPosts = getAllPosts()
  const categories = new Set(allPosts.map((post) => post.category))
  return Array.from(categories)
}