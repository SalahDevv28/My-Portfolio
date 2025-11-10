import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/markdown-utils'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Sybil Solutions Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((tag: string) => post.tags.includes(tag))))
    .slice(0, 3)

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${post.slug}`

  return (
    <div className="min-h-screen pt-16">
      {/* Navigation */}
      <div className="bg-gray-900/30 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full border border-purple-600/30">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-accent-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
            <button className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          
          {post.featuredImage && (
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-purple max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700 hover:border-purple-600 hover:text-purple-300 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Related Posts
              </h2>
              <p className="text-gray-400">
                Continue reading with these similar articles
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="card h-full group-hover:scale-105 transition-all duration-300">
                    {relatedPost.featuredImage && (
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                      <span>{relatedPost.category}</span>
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter to get more insights like this delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
        </div>
      </section>
    </div>
  )
}