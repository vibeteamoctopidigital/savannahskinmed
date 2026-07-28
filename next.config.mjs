/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a throwaway build run alongside `npm run dev` without clobbering the
  // dev server's .next directory:  NEXT_DIST_DIR=.next-verify npm run build
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/services/health-wellness-services',
        destination: 'https://www.agemanagementmed.com/',
        permanent: true,
      },
      // Flattened service URLs (dropped the /services/ prefix to match the
      // site's real URL structure) — keep the old paths resolving for
      // anyone with a bookmark or an indexed search result.
      { source: '/services/medical-grade-facials', destination: '/medical-grade-facials', permanent: true },
      { source: '/services/laser-hair-removal', destination: '/laser-hair-removal', permanent: true },
      {
        source: '/services/injectables-wrinkle-prevention',
        destination: '/injectables-wrinkle-prevention',
        permanent: true,
      },
      {
        source: '/services/laser-skin-rejuvenation',
        destination: '/laser-skin-rejuvenation',
        permanent: true,
      },
      {
        source: '/services/iv-infusion-therapy',
        destination: '/iv-infusion-therapy-vitamin-injections',
        permanent: true,
      },
      { source: '/services/vaginal-rejuvenation', destination: '/vaginal-rejuvenation', permanent: true },
      {
        source: '/services/aesthetic-membership-program',
        destination: '/aesthetic-membership-program',
        permanent: true,
      },
      { source: '/aesthetic-specials', destination: '/specials', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/index', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
