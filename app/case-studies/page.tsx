import { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { getAllCaseStudies, getAllCaseStudyCategories, searchCaseStudies } from '@/lib/case-studies-utils'
import CaseStudyCard from '@/components/CaseStudyCard'

export const metadata: Metadata = {
  title: 'Case Studies - Real-World Success Stories | Sybil Solutions',
  description: 'Explore our portfolio of successful web development projects, from e-commerce platforms to SaaS applications.',
  keywords: ['case studies', 'portfolio', 'web development', 'success stories', 'e-commerce', 'SaaS'],
}

export default function CaseStudiesPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const allCaseStudies = getAllCaseStudies()
  const categories = getAllCaseStudyCategories()
  const searchQuery = typeof searchParams.search === 'string' ? searchParams.search : undefined
  const selectedCategory = typeof searchParams.category === 'string' ? searchParams.category : undefined

  let filteredCaseStudies = allCaseStudies

  if (searchQuery) {
    filteredCaseStudies = searchCaseStudies(searchQuery)
  }

  if (selectedCategory) {
    filteredCaseStudies = filteredCaseStudies.filter((caseStudy) => caseStudy.category === selectedCategory)
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-accent-900/20"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Case Studies</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Real-world success stories showcasing how we transform businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <form action="/case-studies" method="get" className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="search"
                placeholder="Search case studies..."
                defaultValue={searchQuery}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-600"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Link 
                href="/case-studies" 
                className={`px-4 py-2 rounded-full text-sm font-medium ${!selectedCategory ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/case-studies?category=${encodeURIComponent(category!)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </form>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-white mb-4">No case studies found</h3>
              <p className="text-gray-400 mb-8">Try adjusting your search terms or category filter.</p>
              <Link href="/case-studies" className="btn-primary">View All Case Studies</Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-400">
                  Showing {filteredCaseStudies.length} of {allCaseStudies.length} case studies
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCaseStudies.map((caseStudy) => (
                  <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}