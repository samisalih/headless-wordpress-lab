/**
 * Tests for the wpFetch.js module
 */
import { 
  fetchHomePosts,
  fetchCategoryPosts,
  fetchTagPosts,
  fetchPost,
  fetchPage,
  fetchCategories,
  fetchTags,
  fetchFeaturedPosts
} from '../../app/lib/wpFetch';
import * as connectCMS from '../../app/lib/connectCMS';
import { WP_URL } from '../../app/lib/wpConfig';

// Mock the connectCMS module
jest.mock('../../app/lib/connectCMS');

describe('wpFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchHomePosts should call getPosts with correct parameters', async () => {
    // Setup
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    connectCMS.getPosts.mockResolvedValue(mockPosts);
    
    // Execute
    const result = await fetchHomePosts(5);
    
    // Verify
    expect(connectCMS.getPosts).toHaveBeenCalledWith(WP_URL, { per_page: 5 });
    expect(result).toEqual(mockPosts);
  });

  test('fetchHomePosts should return empty array if no posts found', async () => {
    // Setup
    connectCMS.getPosts.mockResolvedValue(null);
    
    // Execute
    const result = await fetchHomePosts();
    
    // Verify
    expect(result).toEqual([]);
  });

  test('fetchCategoryPosts should call getPosts with category parameter', async () => {
    // Setup
    const mockPosts = [{ id: 1, title: 'Category Post' }];
    connectCMS.getPosts.mockResolvedValue(mockPosts);
    
    // Execute
    const result = await fetchCategoryPosts(5, 10, 2);
    
    // Verify
    expect(connectCMS.getPosts).toHaveBeenCalledWith(WP_URL, { 
      categories: 5,
      per_page: 10,
      page: 2
    });
    expect(result).toEqual(mockPosts);
  });

  test('fetchTagPosts should call getPosts with tag parameter', async () => {
    // Setup
    const mockPosts = [{ id: 1, title: 'Tag Post' }];
    connectCMS.getPosts.mockResolvedValue(mockPosts);
    
    // Execute
    const result = await fetchTagPosts(3, 10, 1);
    
    // Verify
    expect(connectCMS.getPosts).toHaveBeenCalledWith(WP_URL, { 
      tags: 3,
      per_page: 10,
      page: 1
    });
    expect(result).toEqual(mockPosts);
  });

  test('fetchPost should call getPostBySlug with correct parameters', async () => {
    // Setup
    const mockPost = { id: 1, title: 'Single Post', slug: 'single-post' };
    connectCMS.getPostBySlug.mockResolvedValue(mockPost);
    
    // Execute
    const result = await fetchPost('single-post');
    
    // Verify
    expect(connectCMS.getPostBySlug).toHaveBeenCalledWith(WP_URL, 'single-post');
    expect(result).toEqual(mockPost);
  });

  test('fetchPage should call getPageBySlug with correct parameters', async () => {
    // Setup
    const mockPage = { id: 1, title: 'About Page', slug: 'about' };
    connectCMS.getPageBySlug.mockResolvedValue(mockPage);
    
    // Execute
    const result = await fetchPage('about');
    
    // Verify
    expect(connectCMS.getPageBySlug).toHaveBeenCalledWith(WP_URL, 'about');
    expect(result).toEqual(mockPage);
  });

  test('fetchCategories should call getCategories with correct parameters', async () => {
    // Setup
    const mockCategories = [{ id: 1, name: 'News' }, { id: 2, name: 'Sports' }];
    connectCMS.getCategories.mockResolvedValue(mockCategories);
    
    // Execute
    const result = await fetchCategories();
    
    // Verify
    expect(connectCMS.getCategories).toHaveBeenCalledWith(WP_URL, { per_page: 100 });
    expect(result).toEqual(mockCategories);
  });

  test('fetchTags should call getTags with correct parameters', async () => {
    // Setup
    const mockTags = [{ id: 1, name: 'Featured' }, { id: 2, name: 'Important' }];
    connectCMS.getTags.mockResolvedValue(mockTags);
    
    // Execute
    const result = await fetchTags();
    
    // Verify
    expect(connectCMS.getTags).toHaveBeenCalledWith(WP_URL, { per_page: 100 });
    expect(result).toEqual(mockTags);
  });

  test('fetchFeaturedPosts should call getPosts with featured tag', async () => {
    // Setup
    const mockPosts = [{ id: 1, title: 'Featured Post' }];
    connectCMS.getPosts.mockResolvedValue(mockPosts);
    
    // Execute
    const result = await fetchFeaturedPosts(3);
    
    // Verify
    expect(connectCMS.getPosts).toHaveBeenCalledWith(WP_URL, { 
      tags: 'featured',
      per_page: 3
    });
    expect(result).toEqual(mockPosts);
  });
});
