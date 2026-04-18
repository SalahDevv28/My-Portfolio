'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, X, FileText } from 'lucide-react'
import { CaseStudy, parseDate } from '@/lib/mdx-utils'

interface Props {
  caseStudies: CaseStudy[]
}

// Deterministic gradient per slug so cards never shift color
const GRADIENTS = [
  'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
  'linear-gradient(135deg, #be185d 0%, #f97316 100%)',
  'linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)',
  'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
  'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
  'linear-gradient(135deg, #b45309 0%, #dc2626 100%)',
]

function getGradient(slug: string): string {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) & 0xffff
  return GRADIENTS[h % GRADIENTS.length]
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = parseDate(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
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
        cs.title, cs.description, cs.client, cs.category,
        ...(Array.isArray(cs.tags) ? cs.tags : []),
      ].filter(Boolean).join(' ').toLowerCase()
      return matchesTag && searchable.includes(q)
    })
  }, [caseStudies, query, activeTag])

  const clearFilters = () => { setQuery(''); setActiveTag(null) }
  const hasFilters = query.trim() !== '' || activeTag !== null

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="mb-10 space-y-4">

        {/* Search + stats row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1">
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

          <p className="shrink-0 text-sm text-gray-500 whitespace-nowrap">
            {hasFilters
              ? `${filtered.length} of ${caseStudies.length} results`
              : `${caseStudies.length} case stud${caseStudies.length !== 1 ? 'ies' : 'y'}`}
          </p>
        </div>

        {/* Tag pills */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                activeTag === null
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-md'
                  : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200 bg-white/5'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-md'
                    : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200 bg-white/5'
                }`}
              >
                {tag}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 px-2"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-28">
          <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-gray-400 mb-3">No case studies match your search.</p>
          <button
            onClick={clearFilters}
            className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs, i) => {
            const gradient = getGradient(cs.slug)
            const date = formatDate(cs.date)
            const tags: string[] = Array.isArray(cs.tags) ? cs.tags : []
            // First card is featured — spans 2 columns on lg
            const isFeatured = i === 0 && filtered.length > 1

            return (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className={`group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/20 ${
                  isFeatured ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Gradient thumbnail */}
                <div
                  className={`relative overflow-hidden ${isFeatured ? 'h-52' : 'h-40'}`}
                  style={{ background: gradient }}
                >
                  {/* Dot texture overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '18px 18px',
                    }}
                  />
                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    {cs.category && (
                      <span className="text-xs font-semibold text-white bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                        {cs.category}
                      </span>
                    )}
                  </div>

                  {/* Date bottom-right */}
                  {date && (
                    <span className="absolute bottom-3 right-4 text-xs text-white/60 font-medium">
                      {date}
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Client */}
                  {cs.client && (
                    <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                      {cs.client}
                    </p>
                  )}

                  {/* Title */}
                  <h3 className={`font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all leading-snug ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
                    {cs.title}
                  </h3>

                  {/* Description */}
                  {cs.description && (
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {cs.description}
                    </p>
                  )}

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tags.slice(0, isFeatured ? 6 : 3).map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                            activeTag === tag
                              ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-pink-500/40 text-pink-300'
                              : 'bg-white/5 border-white/10 text-gray-400'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > (isFeatured ? 6 : 3) && (
                        <span className="text-xs text-gray-600 py-0.5">
                          +{tags.length - (isFeatured ? 6 : 3)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      Read case study
                    </span>
                    <span className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center group-hover:from-purple-500 group-hover:to-pink-500 group-hover:border-transparent transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 text-pink-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
