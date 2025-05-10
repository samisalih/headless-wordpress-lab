import HeroSection from "./components/HeroSection";
import MatchResult from "./components/MatchResult";
import NewsSection from "./components/NewsSection";
import { WP_URL } from "./lib/wpConfig";
import { getPosts, getPostBySlug } from "./lib/connectCMS";
import { getFeaturedImage, getFeaturedImageAlt } from "./lib/fetchImage";
import { getExcerpt, formatDate, getPrimaryCategory } from "./lib/wpContent";

// This enables Next.js to fetch fresh data on each request
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Default hero props in case WordPress API is not available
  let heroProps = {
    image: null,
    alt: "Kein Bild",
    category: "Profis",
    title: "Unsere Erste gewinnt den Westerlandpokal zum allerersten Mal!"
  };
  
  let latestPosts = [];
  
  try {
    // Fetch featured post for hero section
    const featuredPosts = await getPosts(WP_URL, { 
      tags: 'featured',
      per_page: 1
    });
    
    const heroPost = featuredPosts && featuredPosts.length > 0 ? featuredPosts[0] : null;
    
    // Fetch latest news posts
    latestPosts = await getPosts(WP_URL, { 
      per_page: 3,
      exclude: heroPost ? [heroPost.id] : []
    }) || [];
    
    // Update hero props if we have a valid post
    if (heroPost && heroPost.title && heroPost.title.rendered) {
      const category = getPrimaryCategory(heroPost);
      heroProps = {
        image: getFeaturedImage(heroPost, 'full'),
        alt: getFeaturedImageAlt(heroPost),
        category: category ? category.name : "Profis",
        title: heroPost.title.rendered
      };
    }
  } catch (error) {
    console.error("Error fetching WordPress data:", error);
    // Continue with default values if there's an error
  }
  
  return (
    <>
      <HeroSection {...heroProps} />
      <MatchResult />
      <NewsSection posts={latestPosts} />
    </>
  );
}