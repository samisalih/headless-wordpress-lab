// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock the Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock environment variables
process.env.NEXT_PUBLIC_WP_URL = 'https://test-wordpress-site.com';
