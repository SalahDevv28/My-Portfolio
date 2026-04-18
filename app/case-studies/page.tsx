import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { getAllCaseStudies } from '@/lib/mdx-utils';

export const metadata = {
  title: 'Case Studies',
  description: 'Real projects, real results — explore how we help businesses transform their digital presence.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-28 px-6 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 border border-purple-500/40 bg-purple-500/10 rounded-full px-4 py-1.5 mb-6">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Real Projects,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Real Results
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore how we help businesses build smarter digital systems — from modern websites
            to AI-powered automations.
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="py-16 px-6 lg:px-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">

          {caseStudies.length === 0 ? (
            <div className="text-center py-24">
              <Layers className="w-16 h-16 text-purple-500/40 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No case studies yet — check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex flex-col flex-1 p-8">

                    {/* Category + date row */}
                    <div className="flex items-center justify-between mb-4">
                      {cs.category ? (
                        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 rounded-full px-2.5 py-0.5">
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

                    {/* Tech stack pills */}
                    {cs.technicalStack && cs.technicalStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {cs.technicalStack.slice(0, 4).map((tech: string) => (
                          <span
                            key={tech}
                            className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-md px-2 py-0.5"
                          >
                            {tech}
                          </span>
                        ))}
                        {cs.technicalStack.length > 4 && (
                          <span className="text-xs text-gray-500 px-1 py-0.5">
                            +{cs.technicalStack.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Outcomes preview */}
                    {cs.outcomes && cs.outcomes.length > 0 && (
                      <div className="mb-5 space-y-1">
                        {cs.outcomes.slice(0, 2).map((outcome: string) => (
                          <div key={outcome} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="text-purple-400 mt-0.5 shrink-0">✓</span>
                            {outcome}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                        Read case study
                      </span>
                      <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-10 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to be{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                our next case study?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and build something worth writing about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://calendly.com/salahdevv/request-a-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                Book a discovery call
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-purple-500 text-white font-semibold rounded-lg hover:bg-purple-500/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
