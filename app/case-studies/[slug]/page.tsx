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
    description: `Read the case study about ${caseStudy.title}`,
    // You can add more metadata like image, etc.
  };
};

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <a href="/case-studies" className="text-sm text-blue-600 hover:underline">
            ← Back to all case studies
          </a>
        </div>
        <h1 className="text-4xl font-bold mb-6">{caseStudy.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {new Date(caseStudy.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
      </div>
    </section>
  );
}