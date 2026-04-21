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

export default function FeaturedPost({ post }: { post: BlogPost }) {
  const imageUrl = getStrapiMedia(post.featuredImage?.formats?.large?.url || post.featuredImage?.url);
  const slug = post.slug || post.documentId;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative rounded-2xl overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="aspect-[21/9] relative">
          {post.featuredImage ? (
            <img
              src={imageUrl}
              alt={post.featuredImage.alternativeText || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#3DA58A] to-[#2d8c74]" />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-[#3DA58A] text-white">
                {post.category.name}
              </span>
            )}
            {post.readTime && (
              <span className="text-[12px] text-gray-300">{post.readTime} read</span>
            )}
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 max-w-2xl">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-[15px] text-gray-300 leading-relaxed max-w-xl mb-4 hidden md:block">
              {post.excerpt}
            </p>
          )}

          {post.author && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3DA58A] flex items-center justify-center text-white text-[13px] font-semibold">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-medium text-white">{post.author.name}</p>
                <p className="text-[12px] text-gray-400">{formatDate(post.publishedAt)}</p>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
