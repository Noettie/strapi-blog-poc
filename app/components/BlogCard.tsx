import Link from 'next/link';
import { BlogPost } from '../lib/types';
import { getStrapiMedia } from '../lib/strapi';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const imageUrl = getStrapiMedia(post.featuredImage?.formats?.medium?.url || post.featuredImage?.url);
  const slug = post.slug || post.documentId;

  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
          {post.featuredImage ? (
            <img
              src={imageUrl}
              alt={post.featuredImage.alternativeText || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#3DA58A20] to-[#3DA58A40]">
              <span className="text-[#3DA58A] text-4xl font-bold opacity-30">K</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category + Read Time */}
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span
                className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${post.category.color}15` || '#3DA58A15',
                  color: post.category.color || '#3DA58A',
                }}
              >
                {post.category.name}
              </span>
            )}
            {post.readTime && (
              <span className="text-[12px] text-gray-400">{post.readTime} read</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[18px] font-semibold text-gray-900 leading-snug mb-2 group-hover:text-[#3DA58A] transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          )}

          {/* Author + Date */}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
            {post.author && (
              <>
                <div className="w-8 h-8 rounded-full bg-[#3DA58A] flex items-center justify-center text-white text-[12px] font-semibold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-gray-800">{post.author.name}</p>
                  <p className="text-[12px] text-gray-400">{formatDate(post.publishedAt)}</p>
                </div>
              </>
            )}
            {!post.author && (
              <p className="text-[12px] text-gray-400">{formatDate(post.publishedAt)}</p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
