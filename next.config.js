/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'example.com',
      'imgbin.com',
      'thumbnail.imgbin.com',
      'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
      'i.pinimg.com',
      'www.pngpacks.com',
      'e507d8f11835.ngrok-free.app' ,
      '920b73597eff.ngrok-free.app',
      'b977eb7cc998.ngrok-free.app',
      '8bc42e415395.ngrok-free.app'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
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

  eslint: {
    ignoreDuringBuilds: true, // ESLint warning va errorlarni buildda to‘xtatmaydi
  },

  typescript: {
    ignoreBuildErrors: true, // TypeScript errorlar bo‘lsa ham buildni to‘xtatmaydi
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
