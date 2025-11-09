import { Metadata } from 'next'
import Link from 'next/link'
import { Search, Calendar, User, Clock, Tag } from 'lucide-react'
import { getAllPosts, getAllCategories } from '@/lib/markdown-utils'
import BlogCard from '@/components/BlogCard'
import BlogSearch from '@/components/BlogSearch'
import BlogFilter from '@/components/BlogFilter'

export const metadata: Metadata = {
  title: 'Blog - Latest Insights on Web Development, AI, and Technology',
  description: 'Stay updated with the latest trends, tutorials, and insights on web development, AI, backend systems, and technology from the Sybil Solutions team.',
  keywords: ['blog', 'web development', 'AI', 'machine learning', 'backend', 'tutorials', 'technology insights'],
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const searchQuery = searchParams.search as string
  const selectedCategory = searchParams.category as string

  // Filter posts based on search and category
  let filteredPosts = allPosts

  if (searchQuery) {
    filteredPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  if (selectedCategory) {
    filteredPosts = filteredPosts.filter((post) => post.category === selectedCategory)
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-accent-900/20"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Insights, tutorials, and stories from the world of web development, AI, and technology innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <BlogSearch />
            <BlogFilter categories={categories} selectedCategory={selectedCategory} />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                No posts found
              </h3>
              <p className="text-gray-400 mb-8">
                Try adjusting your search terms or category filter.
              </p>
              <Link href="/blog" className="btn-primary">
                View All Posts
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-400">
                  Showing {filteredPosts.length} of {allPosts.length} posts
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-accent-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter for the latest insights and tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}