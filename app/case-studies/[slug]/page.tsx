import { notFound } from 'next/navigation';
import { getCaseStudyBySlug } from '@/lib/mdx-utils';

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) {
    return {
      title: 'Case Study not found',
      description: 'We could not find the case study you are looking for.',
    };
  }
  return {
    title: caseStudy.title,
    description: caseStudy.description ?? `Read the case study about ${caseStudy.title}`,
  };
};

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const hasMetadata =
    caseStudy.client ||
    caseStudy.category ||
    (caseStudy.technicalStack && caseStudy.technicalStack.length > 0) ||
    (caseStudy.outcomes && caseStudy.outcomes.length > 0);

  return (
    <section className="py-20 bg-black/30 backdrop-blur-sm min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <div className="mb-10">
          <a
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors hover:underline"
          >
            ← Back to all case studies
          </a>
        </div>

        {/* Category badge */}
        {caseStudy.category && (
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 border border-purple-500/40 bg-purple-500/10 rounded-full px-3 py-1 mb-4">
            {caseStudy.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {caseStudy.title}
          </span>
        </h1>

        {/* Date + Client */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
          {caseStudy.date && (
            <span>
              {new Date(caseStudy.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {caseStudy.client && (
            <>
              <span className="text-gray-600">·</span>
              <span className="text-gray-300">{caseStudy.client}</span>
            </>
          )}
        </div>

        {/* Description */}
        {caseStudy.description && (
          <p className="text-lg text-gray-300 leading-relaxed mb-8 border-l-2 border-purple-500/50 pl-4">
            {caseStudy.description}
          </p>
        )}

        {/* Metadata cards */}
        {hasMetadata && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

            {caseStudy.technicalStack && caseStudy.technicalStack.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technicalStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-gray-300 bg-purple-500/10 border border-purple-500/20 rounded-md px-2.5 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
                  Key Outcomes
                </h3>
                <ul className="space-y-1.5">
                  {caseStudy.outcomes.map((outcome: string) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-purple-400 mt-0.5 shrink-0">✓</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-10" />

        {/* Markdown content */}
        <div
          className="case-study-content"
          dangerouslySetInnerHTML={{ __html: caseStudy.content }}
        />

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <div className="mt-14 bg-gradient-to-br from-purple-900/20 to-pink-900/10 border border-purple-500/20 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <span className="text-4xl text-purple-400/60 leading-none select-none">"</span>
              <div>
                <p className="text-gray-200 text-lg italic leading-relaxed mb-4">
                  {caseStudy.testimonial.content}
                </p>
                <p className="text-sm font-semibold text-white">
                  {caseStudy.testimonial.author}
                </p>
                {caseStudy.testimonial.role && (
                  <p className="text-xs text-gray-400 mt-0.5">{caseStudy.testimonial.role}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
