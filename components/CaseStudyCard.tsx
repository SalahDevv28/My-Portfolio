import Link from 'next/link'
import { Calendar, Building, Clock, Target, Tag } from 'lucide-react'
import { CaseStudy } from '@/lib/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article className="card group hover:scale-105 transition-all duration-300 h-full flex flex-col">
      {caseStudy.featuredImage && (
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
          <img
            src={caseStudy.featuredImage}
            alt={caseStudy.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          {caseStudy.category && (
            <div className="absolute bottom-4 left-4">
              <span className="inline-block px-3 py-1 bg-purple-600/80 text-white text-xs rounded-full backdrop-blur-sm">
                {caseStudy.category}
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
            <Building className="w-4 h-4" />
            <span>{caseStudy.client}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{new Date(caseStudy.date).toLocaleDateString()}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
          <Link href={`/case-studies/${caseStudy.slug}`}>
            {caseStudy.title}
          </Link>
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
          {caseStudy.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.technicalStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
            >
              <Tag className="w-3 h-3" />
              <span>{tech}</span>
            </span>
          ))}
          {caseStudy.technicalStack.length > 3 && (
            <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">
              +{caseStudy.technicalStack.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Target className="w-4 h-4" />
            <span>{caseStudy.outcomes.length} outcomes</span>
          </div>
          
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
          >
            View Case Study →
          </Link>
        </div>
      </div>
    </article>
  )
}