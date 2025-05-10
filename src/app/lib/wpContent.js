/**
 * Utility functions for handling WordPress content
 */

// Parse and clean WordPress content
export const parseContent = (content) => {
  if (!content || !content.rendered) {
    return '';
  }
  
  return content.rendered;
};

// Extract excerpt from content or use provided excerpt
export const getExcerpt = (post, maxLength = 150) => {
  if (!post) return '';
  
  // Use the excerpt if available
  if (post.excerpt && post.excerpt.rendered) {
    // Remove HTML tags and decode entities
    const excerpt = post.excerpt.rendered
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    
    if (excerpt.length <= maxLength) {
      return excerpt;
    }
    
    return excerpt.substring(0, maxLength) + '...';
  }
  
  // Otherwise extract from content
  if (post.content && post.content.rendered) {
    // Remove HTML tags and decode entities
    const content = post.content.rendered
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    
    if (content.length <= maxLength) {
      return content;
    }
    
    return content.substring(0, maxLength) + '...';
  }
  
  return '';
};

// Format WordPress date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Format: DD.MM.YYYY
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Get post author name
export const getAuthorName = (post) => {
  if (!post || !post._embedded || !post._embedded.author) {
    return '';
  }
  
  const author = post._embedded.author[0];
  return author.name || '';
};

// Get post categories
export const getCategories = (post) => {
  if (!post || !post._embedded || !post._embedded['wp:term']) {
    return [];
  }
  
  // Categories are usually in the first term array
  const terms = post._embedded['wp:term'];
  if (!terms || !terms.length) {
    return [];
  }
  
  // Filter out any null values
  return terms[0].filter(term => term);
};

// Get primary category
export const getPrimaryCategory = (post) => {
  const categories = getCategories(post);
  return categories.length > 0 ? categories[0] : null;
};

// Get post tags
export const getTags = (post) => {
  if (!post || !post._embedded || !post._embedded['wp:term']) {
    return [];
  }
  
  // Tags are usually in the second term array
  const terms = post._embedded['wp:term'];
  if (!terms || terms.length < 2) {
    return [];
  }
  
  // Filter out any null values
  return terms[1].filter(term => term);
};
