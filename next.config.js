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
};

export default nextConfig;
