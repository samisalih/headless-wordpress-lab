/**
 * Tests for the wpContent.js module
 */
import { 
  parseContent,
  getExcerpt,
  formatDate,
  getAuthorName,
  getCategories,
  getPrimaryCategory,
  getTags
} from '../../app/lib/wpContent';

describe('wpContent', () => {
  // Mock WordPress post with content
  const mockPost = {
    content: {
      rendered: '<p>This is a <strong>test</strong> content.</p>'
    },
    excerpt: {
      rendered: '<p>This is a test excerpt.</p>'
    },
    date: '2025-05-04T10:30:45',
    _embedded: {
      author: [
        { name: 'John Doe' }
      ],
      'wp:term': [
        // Categories
        [
          { id: 1, name: 'News', slug: 'news' },
          { id: 2, name: 'Sports', slug: 'sports' }
        ],
        // Tags
        [
          { id: 3, name: 'Featured', slug: 'featured' },
          { id: 4, name: 'Important', slug: 'important' }
        ]
      ]
    }
  };

  // Mock post with long content
  const mockLongPost = {
    content: {
      rendered: '<p>' + 'A'.repeat(500) + '</p>'
    },
    excerpt: {
      rendered: '<p>' + 'B'.repeat(500) + '</p>'
    }
  };

  test('parseContent should return the rendered content', () => {
    expect(parseContent(mockPost.content)).toBe('<p>This is a <strong>test</strong> content.</p>');
  });

  test('parseContent should handle null or undefined content', () => {
    expect(parseContent(null)).toBe('');
    expect(parseContent(undefined)).toBe('');
    expect(parseContent({})).toBe('');
  });

  test('getExcerpt should return the excerpt without HTML tags', () => {
    expect(getExcerpt(mockPost)).toBe('This is a test excerpt.');
  });

  test('getExcerpt should truncate long excerpts to the specified length', () => {
    expect(getExcerpt(mockLongPost, 100)).toHaveLength(103); // 100 chars + '...'
    expect(getExcerpt(mockLongPost, 100).endsWith('...')).toBe(true);
  });

  test('getExcerpt should extract from content if no excerpt is available', () => {
    const postWithoutExcerpt = {
      content: {
        rendered: '<p>This is only content, no excerpt.</p>'
      }
    };
    expect(getExcerpt(postWithoutExcerpt)).toBe('This is only content, no excerpt.');
  });

  test('formatDate should format the date correctly', () => {
    expect(formatDate(mockPost.date)).toMatch(/\d{2}\.\d{2}\.\d{4}/); // DD.MM.YYYY format
  });

  test('formatDate should handle null or undefined dates', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
  });

  test('getAuthorName should return the author name', () => {
    expect(getAuthorName(mockPost)).toBe('John Doe');
  });

  test('getAuthorName should handle missing author data', () => {
    expect(getAuthorName({})).toBe('');
    expect(getAuthorName({ _embedded: {} })).toBe('');
  });

  test('getCategories should return all categories', () => {
    const categories = getCategories(mockPost);
    expect(categories).toHaveLength(2);
    expect(categories[0].name).toBe('News');
    expect(categories[1].name).toBe('Sports');
  });

  test('getPrimaryCategory should return the first category', () => {
    const category = getPrimaryCategory(mockPost);
    expect(category.name).toBe('News');
  });

  test('getPrimaryCategory should return null if no categories', () => {
    expect(getPrimaryCategory({})).toBeNull();
  });

  test('getTags should return all tags', () => {
    const tags = getTags(mockPost);
    expect(tags).toHaveLength(2);
    expect(tags[0].name).toBe('Featured');
    expect(tags[1].name).toBe('Important');
  });

  test('getTags should return empty array if no tags', () => {
    expect(getTags({})).toEqual([]);
  });
});
