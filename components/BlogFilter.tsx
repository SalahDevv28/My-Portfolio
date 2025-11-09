'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'

interface BlogFilterProps {
  categories: string[]
  selectedCategory?: string
}

export default function BlogFilter({ categories, selectedCategory }: BlogFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryFilter = (category: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (selectedCategory === category) {
      // Remove category filter if clicking the same category
      params.delete('category')
    } else {
      // Set new category filter
      params.set('category', category)
    }
    
    // Keep existing search query
    const currentSearch = searchParams.get('search')
    if (currentSearch) {
      params.set('search', currentSearch)
    }
    
    router.push(`/blog?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('category')
    params.delete('search')
    router.push(`/blog`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-400 font-medium">Filter by category:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryFilter('')}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            !selectedCategory
              ? 'bg-purple-600 text-white border-purple-600'
              : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-purple-600'
          }`}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-purple-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {(selectedCategory) && (
        <button
          onClick={clearFilters}
          className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Clear filters</span>
        </button>
      )}
    </div>
  )
}