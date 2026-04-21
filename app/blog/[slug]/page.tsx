import { getBlogPost, getBlogPosts, getStrapiMedia } from '../../lib/strapi';
import RichText from '../../components/RichText';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: 'Post Not Found | Konnetta Blog' };
  }

  return {
    title: post.seo?.metaTitle || `${post.title} | Konnetta Blog`,
    description: post.seo?.metaDescription || post.excerpt || '',
    keywords: post.seo?.keywords || '',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getStrapiMedia(post.featuredImage?.formats?.large?.url || post.featuredImage?.url);

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-gray-500 hover:text-[#3DA58A] transition-colors mb-8">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to all articles
      </Link>

      {/* Category + Read Time */}
      <div className="flex items-center gap-3 mb-4">
        {post.category && (
          <span
            className="text-[12px] font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${post.category.color}15` || '#3DA58A15',
              color: post.category.color || '#3DA58A',
            }}
          >
            {post.category.name}
          </span>
        )}
        {post.readTime && (
          <span className="text-[13px] text-gray-400">{post.readTime} read</span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-[42px] font-bold text-gray-900 leading-tight mb-6">
        {post.title}
      </h1>

      {/* Author + Date */}
      {post.author && (
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
          <div className="w-11 h-11 rounded-full bg-[#3DA58A] flex items-center justify-center text-white text-[15px] font-semibold">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-[15px] font-medium text-gray-900">{post.author.name}</p>
            <p className="text-[13px] text-gray-400">
              {post.author.role && <span>{post.author.role} &middot; </span>}
              {formatDate(post.publishedAt)}
            </p>
          </div>
        </div>
      )}

      {/* Featured Image */}
      {post.featuredImage && (
        <figure className="mb-10 -mx-4 md:mx-0">
          <img
            src={imageUrl}
            alt={post.featuredImage.alternativeText || post.title}
            className="w-full rounded-none md:rounded-2xl object-cover max-h-[480px]"
          />
          {post.featuredImage.caption && (
            <figcaption className="text-[13px] text-gray-400 mt-3 text-center px-4">
              {post.featuredImage.caption}
            </figcaption>
          )}
        </figure>
      )}

      {/* Body */}
      <div className="prose-container">
        <RichText content={post.body} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
          {post.tags.map(tag => (
            <span key={tag.id} className="text-[13px] px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Author Bio */}
      {post.author && post.author.bio && (
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#3DA58A] flex items-center justify-center text-white text-[16px] font-semibold">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-[16px] font-semibold text-gray-900">{post.author.name}</p>
              {post.author.role && <p className="text-[13px] text-gray-500">{post.author.role}</p>}
            </div>
          </div>
          <RichText content={post.author.bio} />
          {post.author.socialLinkedin && (
            <a href={post.author.socialLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-[#3DA58A] hover:underline mt-3">
              LinkedIn Profile →
            </a>
          )}
        </div>
      )}
    </article>
  );
}
