'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, Layers, X } from 'lucide-react'
import { CaseStudy } from '@/lib/mdx-utils'

interface Props {
  caseStudies: CaseStudy[]
}

export default function CaseStudiesGrid({ caseStudies }: Props) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    caseStudies.forEach((cs) => {
      if (Array.isArray(cs.tags)) cs.tags.forEach((t: string) => set.add(t))
    })
    return Array.from(set).sort()
  }, [caseStudies])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return caseStudies.filter((cs) => {
      const matchesTag =
        !activeTag ||
        (Array.isArray(cs.tags) && cs.tags.includes(activeTag))

      if (!q) return matchesTag

      const searchable = [
        cs.title,
        cs.description,
        cs.client,
        cs.category,
        ...(Array.isArray(cs.tags) ? cs.tags : []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return matchesTag && searchable.includes(q)
    })
  }, [caseStudies, query, activeTag])

  const clearFilters = () => {
    setQuery('')
    setActiveTag(null)
  }

  const hasFilters = query.trim() !== '' || activeTag !== null

  return (
    <>
      {/* Search + tag filters */}
      <div className="mb-10 space-y-5">
        {/* Search bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, client, tag…"
            className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tag pills */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                activeTag === null
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white'
                  : 'border-white/10 text-gray-400 hover:border-purple-500/40 hover:text-gray-200 bg-white/5'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white'
                    : 'border-white/10 text-gray-400 hover:border-purple-500/40 hover:text-gray-200 bg-white/5'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count + clear */}
      {hasFilters && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            {filtered.length === 0
              ? 'No results'
              : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
          </p>
          <button
            onClick={clearFilters}
            className="text-xs text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <Layers className="w-14 h-14 text-white/10 mx-auto mb-4" />
          <p className="text-gray-400 text-base mb-2">No case studies match your search.</p>
          <button
            onClick={clearFilters}
            className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex flex-col flex-1 p-8">

                {/* Category + date */}
                <div className="flex items-center justify-between mb-4">
                  {cs.category ? (
                    <span className="text-xs font-semibold uppercase tracking-widest text-pink-400 border border-pink-500/30 bg-pink-500/10 rounded-full px-2.5 py-0.5">
                      {cs.category}
                    </span>
                  ) : (
                    <span />
                  )}
                  {cs.date && (
                    <span className="text-xs text-gray-500">
                      {new Date(cs.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-snug">
                  {cs.title}
                </h3>

                {/* Description */}
                {cs.description && (
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {cs.description}
                  </p>
                )}

                {/* Client */}
                {cs.client && (
                  <p className="text-xs text-gray-500 mb-4">
                    Client: <span className="text-gray-300">{cs.client}</span>
                  </p>
                )}

                {/* Tags */}
                {Array.isArray(cs.tags) && cs.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cs.tags.slice(0, 4).map((tag: string) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded-md border transition-colors ${
                          activeTag === tag
                            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-pink-500/40 text-pink-300'
                            : 'bg-white/5 border-white/10 text-gray-400'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {cs.tags.length > 4 && (
                      <span className="text-xs text-gray-500 px-1 py-0.5">
                        +{cs.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Outcomes */}
                {cs.outcomes && cs.outcomes.length > 0 && (
                  <div className="mb-5 space-y-1">
                    {cs.outcomes.slice(0, 2).map((outcome: string) => (
                      <div key={outcome} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="text-pink-400 mt-0.5 shrink-0">✓</span>
                        {outcome}
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 group-hover:opacity-80 transition-opacity">
                    Read case study
                  </span>
                  <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
