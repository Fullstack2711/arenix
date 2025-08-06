/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com', 'imgbin.com', 'thumbnail.imgbin.com', 'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com', 'i.pinimg.com', 'www.pngpacks.com'],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://198.211.96.176/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
