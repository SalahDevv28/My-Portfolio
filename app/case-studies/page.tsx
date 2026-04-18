import Link from 'next/link';
import { getAllCaseStudies } from '@/lib/mdx-utils';

export const metadata = {
  title: 'Case Studies',
  description: 'Explore our case studies',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <section className="py-20 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Case Studies
          </span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group"
            >
              <div className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {cs.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(cs.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-500 line-clamp-4">
                  {/* We can show a preview of the content or use an excerpt from frontmatter */}
                  {/* For now, we'll just show a placeholder */}
                  Learn how we helped this client achieve their goals.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}