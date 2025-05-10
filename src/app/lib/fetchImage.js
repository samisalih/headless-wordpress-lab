/**
 * Utility functions for handling WordPress images
 */

// Extract the featured image URL from a WordPress post
export const getFeaturedImage = (post, size = 'full') => {
  if (!post || !post._embedded || !post._embedded['wp:featuredmedia']) {
    return null;
  }

  const media = post._embedded['wp:featuredmedia'][0];
  
  // Return the requested size or fall back to full size
  if (media.media_details && media.media_details.sizes) {
    if (media.media_details.sizes[size]) {
      return media.media_details.sizes[size].source_url;
    }
  }
  
  // Fallback to the main source URL
  return media.source_url || null;
};

// Get alt text for featured image
export const getFeaturedImageAlt = (post) => {
  if (!post || !post._embedded || !post._embedded['wp:featuredmedia']) {
    return '';
  }

  const media = post._embedded['wp:featuredmedia'][0];
  return media.alt_text || '';
};

// Get image dimensions
export const getImageDimensions = (post, size = 'full') => {
  if (!post || !post._embedded || !post._embedded['wp:featuredmedia']) {
    return { width: 0, height: 0 };
  }

  const media = post._embedded['wp:featuredmedia'][0];
  
  if (media.media_details && media.media_details.sizes && media.media_details.sizes[size]) {
    const { width, height } = media.media_details.sizes[size];
    return { width, height };
  }
  
  // Fallback to full dimensions
  if (media.media_details) {
    return {
      width: media.media_details.width || 0,
      height: media.media_details.height || 0
    };
  }
  
  return { width: 0, height: 0 };
};

// Extract image from content if no featured image
export const getFirstContentImage = (post) => {
  if (!post || !post.content || !post.content.rendered) {
    return null;
  }
  
  // Simple regex to extract the first image URL from HTML content
  const match = post.content.rendered.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

// Get all images from post content
export const getAllContentImages = (post) => {
  if (!post || !post.content || !post.content.rendered) {
    return [];
  }
  
  const regex = /<img[^>]+src="([^">]+)"/g;
  const matches = [...post.content.rendered.matchAll(regex)];
  
  return matches.map(match => match[1]);
};

// Format media object for Next.js Image component
export const formatMediaForNextImage = (post, size = 'full') => {
  const url = getFeaturedImage(post, size);
  const alt = getFeaturedImageAlt(post);
  const { width, height } = getImageDimensions(post, size);
  
  return {
    src: url,
    alt,
    width,
    height,
  };
};
