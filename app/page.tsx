import { getBlogPosts } from './lib/strapi';
import FeaturedPost from './components/FeaturedPost';
import BlogCard from './components/BlogCard';

export default async function Home() {
  const posts = await getBlogPosts();
  const featuredPost = posts.find(p => p.isFeatured);
  const otherPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-12">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-[24px] font-bold text-gray-900 mb-6">
          {featuredPost ? 'Latest Articles' : 'All Articles'}
        </h2>

        {otherPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No articles yet. Check back soon!</p>
        )}
      </section>
    </div>
  );
}
