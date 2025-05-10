import Link from 'next/link';
import Image from 'next/image';
import { WP_URL } from '../lib/wpConfig';
import { getPosts } from '../lib/connectCMS';
import { getFeaturedImage, getFeaturedImageAlt } from '../lib/fetchImage';
import { getExcerpt, formatDate, getPrimaryCategory } from '../lib/wpContent';

// Set revalidation time
export const revalidate = 3600; // Revalidate every hour

export default async function NewsPage() {
  // Fetch posts from WordPress
  const posts = await getPosts(WP_URL, { per_page: 12 });
  
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">News</h1>
        
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => {
              const category = getPrimaryCategory(post);
              const excerpt = getExcerpt(post, 150);
              const date = formatDate(post.date);
              const featuredImage = getFeaturedImage(post, 'medium');
              
              return (
                <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  {featuredImage && (
                    <div className="relative h-48 w-full">
                      <Image 
                        src={featuredImage}
                        alt={getFeaturedImageAlt(post)}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {category && (
                      <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded mb-3">
                        {category.name}
                      </span>
                    )}
                    <h2 className="text-xl font-bold mb-2">{post.title.rendered}</h2>
                    <div className="text-gray-600 text-sm mb-3">{date}</div>
                    <p className="text-gray-600 mb-4">{excerpt}</p>
                    <Link 
                      href={`/news/${post.slug}`}
                      className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-darker)] text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      WEITERLESEN
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">Keine News gefunden.</p>
          </div>
        )}
      </div>
    </div>
  );
}
