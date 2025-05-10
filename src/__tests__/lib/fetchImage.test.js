/**
 * Tests for the fetchImage.js module
 */
import { 
  getFeaturedImage,
  getFeaturedImageAlt,
  getImageDimensions,
  getFirstContentImage,
  getAllContentImages,
  formatMediaForNextImage
} from '../../app/lib/fetchImage';

describe('fetchImage', () => {
  // Mock WordPress post with featured image
  const mockPostWithImage = {
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url: 'https://example.com/image.jpg',
          alt_text: 'Test image alt text',
          media_details: {
            width: 1200,
            height: 800,
            sizes: {
              thumbnail: {
                source_url: 'https://example.com/image-thumbnail.jpg',
                width: 150,
                height: 150
              },
              medium: {
                source_url: 'https://example.com/image-medium.jpg',
                width: 300,
                height: 200
              },
              full: {
                source_url: 'https://example.com/image.jpg',
                width: 1200,
                height: 800
              }
            }
          }
        }
      ]
    }
  };

  // Mock WordPress post without featured image
  const mockPostWithoutImage = {
    _embedded: {}
  };

  // Mock WordPress post with content image
  const mockPostWithContentImage = {
    content: {
      rendered: '<p>Some text</p><img src="https://example.com/content-image.jpg" alt="Content image"><p>More text</p>'
    }
  };

  test('getFeaturedImage should return the correct image URL for the requested size', () => {
    expect(getFeaturedImage(mockPostWithImage, 'thumbnail')).toBe('https://example.com/image-thumbnail.jpg');
    expect(getFeaturedImage(mockPostWithImage, 'medium')).toBe('https://example.com/image-medium.jpg');
    expect(getFeaturedImage(mockPostWithImage, 'full')).toBe('https://example.com/image.jpg');
  });

  test('getFeaturedImage should return the full size if the requested size is not available', () => {
    expect(getFeaturedImage(mockPostWithImage, 'nonexistent-size')).toBe('https://example.com/image.jpg');
  });

  test('getFeaturedImage should return null if the post has no featured image', () => {
    expect(getFeaturedImage(mockPostWithoutImage)).toBeNull();
    expect(getFeaturedImage(null)).toBeNull();
  });

  test('getFeaturedImageAlt should return the correct alt text', () => {
    expect(getFeaturedImageAlt(mockPostWithImage)).toBe('Test image alt text');
  });

  test('getFeaturedImageAlt should return empty string if no alt text or no featured image', () => {
    expect(getFeaturedImageAlt(mockPostWithoutImage)).toBe('');
    expect(getFeaturedImageAlt(null)).toBe('');
  });

  test('getImageDimensions should return the correct dimensions for the requested size', () => {
    expect(getImageDimensions(mockPostWithImage, 'thumbnail')).toEqual({ width: 150, height: 150 });
    expect(getImageDimensions(mockPostWithImage, 'medium')).toEqual({ width: 300, height: 200 });
    expect(getImageDimensions(mockPostWithImage, 'full')).toEqual({ width: 1200, height: 800 });
  });

  test('getImageDimensions should return zero dimensions if the post has no featured image', () => {
    expect(getImageDimensions(mockPostWithoutImage)).toEqual({ width: 0, height: 0 });
    expect(getImageDimensions(null)).toEqual({ width: 0, height: 0 });
  });

  test('getFirstContentImage should extract the first image from content', () => {
    expect(getFirstContentImage(mockPostWithContentImage)).toBe('https://example.com/content-image.jpg');
  });

  test('getFirstContentImage should return null if no image in content', () => {
    expect(getFirstContentImage({ content: { rendered: '<p>No image here</p>' } })).toBeNull();
    expect(getFirstContentImage(null)).toBeNull();
  });

  test('getAllContentImages should extract all images from content', () => {
    const postWithMultipleImages = {
      content: {
        rendered: '<img src="https://example.com/image1.jpg"><p>Text</p><img src="https://example.com/image2.jpg">'
      }
    };
    expect(getAllContentImages(postWithMultipleImages)).toEqual([
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ]);
  });

  test('formatMediaForNextImage should return a properly formatted object for Next.js Image', () => {
    const result = formatMediaForNextImage(mockPostWithImage, 'medium');
    expect(result).toEqual({
      src: 'https://example.com/image-medium.jpg',
      alt: 'Test image alt text',
      width: 300,
      height: 200
    });
  });
});
