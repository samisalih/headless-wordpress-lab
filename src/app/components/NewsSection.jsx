import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedImage, getFeaturedImageAlt } from '../lib/fetchImage';
import { getExcerpt, formatDate, getPrimaryCategory } from '../lib/wpContent';

import Button from './ui/Button';
import Badge from './ui/Badge';

export default function NewsSection({ posts = [] }) {
  // Fallback content if no posts are provided
  const fallbackPosts = [
    {
      id: 1,
      slug: 'bundesjugendspiele-abschaffen-1',
      title: { rendered: 'Sahneschnitten find ich geil' },
      category: 'C-JUGEND',
      excerpt: 'Wir haben getagt und haben uns entschieden: Wir geben unsere Stimme gegen die neuen Reformen der Bundesjugendspiele auf dem Vereinskongress und setzen ein klares Zeichen. Warum das Ganze?'
    },
    {
      id: 2,
      slug: 'bundesjugendspiele-abschaffen-2',
      title: { rendered: 'Wann werden endlich abgeschoben?' },
      category: 'C-JUGEND',
      excerpt: 'Wir haben getagt und haben uns entschieden: Wir geben unsere Stimme gegen die neuen Reformen der Bundesjugendspiele auf dem Vereinskongress und setzen ein klares Zeichen. Warum das Ganze?'
    },
    {
      id: 3,
      slug: 'bundesjugendspiele-abschaffen-3',
      title: { rendered: 'Kokosnüsse im Fußball' },
      category: 'C-JUGEND',
      excerpt: 'Wir haben getagt und haben uns entschieden: Wir geben unsere Stimme gegen die neuen Reformen der Bundesjugendspiele auf dem Vereinskongress und setzen ein klares Zeichen. Warum das Ganze?'
    }
  ];

  // Ensure posts is an array and use fallback if needed
  const displayPosts = Array.isArray(posts) && posts.length > 0 ? posts : fallbackPosts;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Weitere News</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post) => {
            // Get category name from WordPress data or use fallback
            const category = post._embedded 
              ? (getPrimaryCategory(post)?.name || 'NEWS') 
              : post.category;
            
            // Get excerpt from WordPress data or use fallback
            const excerpt = post._embedded 
              ? getExcerpt(post, 150) 
              : post.excerpt;
              
            return (
              <div key={post.id} className="bg-linear-to-br from-neutral-lightest to-neutral-lighter border-3 border-neutral/10 shadow-xl rounded-xl overflow-hidden">
                {post._embedded && getFeaturedImage(post) && (
                  <div className="relative h-48 w-full">
                    <Image 
                      src={getFeaturedImage(post, 'medium')} 
                      alt={getFeaturedImageAlt(post)}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col gap-3">
                  <Badge>
                    {category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3">
                    {post.title?.rendered || 'Untitled Post'}
                  </h3>
                  <div>
                    <p className="text-gray-600 mb-4">
                      {excerpt}
                    </p>
                    <Button kind="primary" to={`/news/${post.slug}`}>
                      Weiterlesen
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
