/**
 * Next.js data fetching utilities for WordPress
 */
import { WP_URL, POSTS_PER_PAGE } from './wpConfig';
import { getPosts, getPostBySlug, getPostById, getPages, getPageBySlug, getCategories, getTags } from './connectCMS';

// Revalidation settings
const DEFAULT_REVALIDATE_TIME = 3600; // 1 hour

/**
 * Fetch posts for the homepage
 */
export async function fetchHomePosts(limit = POSTS_PER_PAGE) {
  const posts = await getPosts(WP_URL, { per_page: limit });
  return posts || [];
}

/**
 * Fetch posts for a specific category
 */
export async function fetchCategoryPosts(categoryId, limit = POSTS_PER_PAGE, page = 1) {
  const posts = await getPosts(WP_URL, { 
    categories: categoryId,
    per_page: limit,
    page
  });
  return posts || [];
}

/**
 * Fetch posts by tag
 */
export async function fetchTagPosts(tagId, limit = POSTS_PER_PAGE, page = 1) {
  const posts = await getPosts(WP_URL, { 
    tags: tagId,
    per_page: limit,
    page
  });
  return posts || [];
}

/**
 * Fetch a single post by slug
 */
export async function fetchPost(slug) {
  return await getPostBySlug(WP_URL, slug);
}

/**
 * Fetch a page by slug
 */
export async function fetchPage(slug) {
  return await getPageBySlug(WP_URL, slug);
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
  const categories = await getCategories(WP_URL, { per_page: 100 });
  return categories || [];
}

/**
 * Fetch all tags
 */
export async function fetchTags() {
  const tags = await getTags(WP_URL, { per_page: 100 });
  return tags || [];
}

/**
 * Fetch featured posts
 */
export async function fetchFeaturedPosts(limit = 3) {
  // Assuming you have a 'featured' tag or category in WordPress
  // You could also use a custom field with ACF
  const posts = await getPosts(WP_URL, { 
    tags: 'featured',
    per_page: limit
  });
  return posts || [];
}

/**
 * Server-side data fetching with revalidation for pages
 */
export async function getPageData(slug) {
  const pageData = await fetchPage(slug);
  
  return {
    props: {
      page: pageData || null,
    },
    revalidate: DEFAULT_REVALIDATE_TIME,
  };
}

/**
 * Server-side data fetching with revalidation for posts
 */
export async function getPostData(slug) {
  const postData = await fetchPost(slug);
  
  return {
    props: {
      post: postData || null,
    },
    revalidate: DEFAULT_REVALIDATE_TIME,
  };
}
