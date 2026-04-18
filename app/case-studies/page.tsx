import Link from 'next/link';
import { getAllCaseStudies } from '@/lib/mdx-utils';

export const metadata = {
  title: 'Case Studies',
  description: 'Explore our case studies',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Case Studies</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{cs.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(cs.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 line-clamp-4">
                    {/* We can show a preview of the content or use an excerpt from frontmatter */}
                    {/* For now, we'll just show a placeholder */}
                    Learn how we helped this client achieve their goals.
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}