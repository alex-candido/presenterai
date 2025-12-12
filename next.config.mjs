import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing/home',
        permanent: true,
      },
      {
        source: '/landing',
        destination: '/landing/home',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth/sign-in',
        permanent: true,
      },
      {
        source: '/landing/docs',
        destination: '/landing/docs/getting-started',
        permanent: true,
      },
      {
        source: '/landing/legal',
        destination: '/landing/legal/terms-of-service',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
      {
        source: '/app',
        destination: '/app/start',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
