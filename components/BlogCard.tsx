import Link from 'next/link'
import { Calendar, User, Clock, Tag } from 'lucide-react'
import { BlogPost } from '@/lib/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card group hover:scale-105 transition-all duration-300 h-full flex flex-col">
      {post.featuredImage && (
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-600/30">
            {post.category}
          </span>
        </div>
        
        <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
            >
              <Tag className="w-3 h-3" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-accent-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-400">{post.author}</span>
          </div>
          
          <Link
            href={`/blog/${post.slug}`}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}