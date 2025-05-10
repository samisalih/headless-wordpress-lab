import axios from 'axios';

export const connectCMS = async (url, endpoint, config = {}) => {
  const fullUrl = `${url}/wp-json/wp/v2/${endpoint}`;

  try {
    const response = await axios.get(fullUrl, config);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch posts with optional parameters
export const getPosts = async (url, params = {}) => {
  const config = {
    params: {
      _embed: true, // Include embedded resources like featured images
      per_page: params.per_page || 10,
      page: params.page || 1,
      ...params,
    },
  };
  
  return connectCMS(url, 'posts', config);
};

// Fetch a single post by slug
export const getPostBySlug = async (url, slug) => {
  const config = {
    params: {
      _embed: true,
      slug,
    },
  };
  
  const posts = await connectCMS(url, 'posts', config);
  return posts && posts.length > 0 ? posts[0] : null;
};

// Fetch a single post by ID
export const getPostById = async (url, id) => {
  try {
    return await connectCMS(url, `posts/${id}`, { params: { _embed: true } });
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
};

// Fetch pages
export const getPages = async (url, params = {}) => {
  const config = {
    params: {
      _embed: true,
      ...params,
    },
  };
  
  return connectCMS(url, 'pages', config);
};

// Fetch a single page by slug
export const getPageBySlug = async (url, slug) => {
  const config = {
    params: {
      _embed: true,
      slug,
    },
  };
  
  const pages = await connectCMS(url, 'pages', config);
  return pages && pages.length > 0 ? pages[0] : null;
};

// Fetch categories
export const getCategories = async (url, params = {}) => {
  return connectCMS(url, 'categories', { params });
};

// Fetch tags
export const getTags = async (url, params = {}) => {
  return connectCMS(url, 'tags', { params });
};

// Fetch media
export const getMedia = async (url, params = {}) => {
  return connectCMS(url, 'media', { params });
};

// Fetch menu from WP API Menu plugin (if installed)
export const getMenu = async (url, menuSlug) => {
  try {
    const response = await axios.get(`${url}/wp-json/menus/v1/menus/${menuSlug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu ${menuSlug}:`, error);
    return null;
  }
};
