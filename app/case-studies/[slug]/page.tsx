import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, Building, Target, Quote } from 'lucide-react'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/case-studies-utils'

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies()
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug(params.slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${caseStudy.title} | Sybil Solutions Case Studies`,
    description: caseStudy.description,
    keywords: caseStudy.technicalStack,
    authors: [{ name: 'Sybil Solutions' }],
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      type: 'article',
      publishedTime: caseStudy.date,
      authors: ['Sybil Solutions'],
      tags: caseStudy.technicalStack,
      images: caseStudy.featuredImage ? [{ url: caseStudy.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.description,
      images: caseStudy.featuredImage ? [caseStudy.featuredImage] : [],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    notFound()
  }

  const allCaseStudies = getAllCaseStudies()
  const relatedCaseStudies = allCaseStudies
    .filter((cs) => cs.slug !== caseStudy.slug && cs.category === caseStudy.category)
    .slice(0, 3)

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/case-studies/${caseStudy.slug}`

  return (
    <div className="min-h-screen pt-16">
      {/* Navigation */}
      <div className="bg-gray-900/30 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/case-studies"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Case Studies</span>
          </Link>
        </div>
      </div>

      {/* Case Study Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          {caseStudy.category && (
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full border border-purple-600/30">
                {caseStudy.category}
              </span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            {caseStudy.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-accent-600 rounded-full flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
              <span>{caseStudy.client}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(caseStudy.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <button className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          
          {caseStudy.featuredImage && (
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <img
                src={caseStudy.featuredImage}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}
        </header>

        {/* Case Study Content */}
        <div className="prose prose-invert prose-purple max-w-none">
          <div 
            className="case-study-content"
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />
        </div>

        {/* Project Outcomes */}
        {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">Project Outcomes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Stack */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-2 mb-6">
            <Tag className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium text-lg">Technical Stack</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {caseStudy.technicalStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-800 text-gray-300 text-sm rounded-lg border border-gray-700 hover:border-purple-600 hover:text-purple-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Client Testimonial */}
        {caseStudy.testimonial && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
              <div className="flex items-start space-x-4">
                <Quote className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <blockquote className="text-lg text-gray-200 mb-4 italic">
                    "{caseStudy.testimonial.content}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-accent-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{caseStudy.testimonial.author}</div>
                      <div className="text-sm text-gray-400">{caseStudy.testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Related Case Studies
              </h2>
              <p className="text-gray-400">
                {caseStudy.category ? `More projects in ${caseStudy.category}` : 'More successful projects'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCaseStudies.map((relatedCaseStudy) => (
                <Link
                  key={relatedCaseStudy.slug}
                  href={`/case-studies/${relatedCaseStudy.slug}`}
                  className="group"
                >
                  <article className="card h-full group-hover:scale-105 transition-all duration-300">
                    {relatedCaseStudy.featuredImage && (
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={relatedCaseStudy.featuredImage}
                          alt={relatedCaseStudy.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {relatedCaseStudy.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {relatedCaseStudy.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                      <span>{relatedCaseStudy.client}</span>
                      <span>{new Date(relatedCaseStudy.date).getFullYear()}</span>
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
            <Target className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can help transform your business with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
              />
              <button className="btn-primary whitespace-nowrap">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}