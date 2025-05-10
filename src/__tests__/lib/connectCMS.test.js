/**
 * Tests for the connectCMS.js module
 */
import axios from 'axios';
import { 
  connectCMS, 
  getPosts, 
  getPostBySlug, 
  getPostById,
  getPages,
  getPageBySlug,
  getCategories,
  getTags,
  getMedia,
  getMenu
} from '../../app/lib/connectCMS';

// Mock axios
jest.mock('axios');

describe('connectCMS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('connectCMS should call the correct WordPress endpoint', async () => {
    // Setup
    const mockResponse = { data: { id: 1, title: 'Test Post' } };
    axios.get.mockResolvedValue(mockResponse);
    
    // Execute
    const result = await connectCMS('https://example.com', 'posts');
    
    // Verify
    expect(axios.get).toHaveBeenCalledWith('https://example.com/wp-json/wp/v2/posts', {});
    expect(result).toEqual(mockResponse.data);
  });

  test('connectCMS should handle errors gracefully', async () => {
    // Setup
    axios.get.mockRejectedValue(new Error('API Error'));
    
    // Execute
    const result = await connectCMS('https://example.com', 'posts');
    
    // Verify
    expect(result).toBeNull();
  });

  test('getPosts should include _embed parameter', async () => {
    // Setup
    const mockResponse = { data: [{ id: 1, title: 'Test Post' }] };
    axios.get.mockResolvedValue(mockResponse);
    
    // Execute
    await getPosts('https://example.com');
    
    // Verify
    expect(axios.get).toHaveBeenCalledWith(
      'https://example.com/wp-json/wp/v2/posts',
      expect.objectContaining({
        params: expect.objectContaining({
          _embed: true
        })
      })
    );
  });

  test('getPostBySlug should return the first post when found', async () => {
    // Setup
    const mockPosts = [{ id: 1, title: 'Test Post', slug: 'test-post' }];
    const mockResponse = { data: mockPosts };
    axios.get.mockResolvedValue(mockResponse);
    
    // Execute
    const result = await getPostBySlug('https://example.com', 'test-post');
    
    // Verify
    expect(result).toEqual(mockPosts[0]);
  });

  test('getPostBySlug should return null when no posts found', async () => {
    // Setup
    const mockResponse = { data: [] };
    axios.get.mockResolvedValue(mockResponse);
    
    // Execute
    const result = await getPostBySlug('https://example.com', 'non-existent-post');
    
    // Verify
    expect(result).toBeNull();
  });

  test('getPostById should call the correct endpoint', async () => {
    // Setup
    const mockResponse = { data: { id: 123, title: 'Test Post' } };
    axios.get.mockResolvedValue(mockResponse);
    
    // Execute
    await getPostById('https://example.com', 123);
    
    // Verify
    expect(axios.get).toHaveBeenCalledWith(
      'https://example.com/wp-json/wp/v2/posts/123',
      expect.objectContaining({
        params: expect.objectContaining({
          _embed: true
        })
      })
    );
  });

  test('getMenu should use the menus API endpoint', async () => {
    // Setup
    const mockResponse = { data: { items: [] } };
    axios.get.mockResolvedValue(mockResponse);
    
    // Execute
    await getMenu('https://example.com', 'primary');
    
    // Verify
    expect(axios.get).toHaveBeenCalledWith('https://example.com/wp-json/menus/v1/menus/primary');
  });
});
