/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // http://fomo.blob.core.windows.net/company-images/bankmega.com.png
        protocol: 'http',
        hostname: 'fomo.blob.core.windows.net',
      },
      {
        // https://fomo.blob.core.windows.net/company-images/bankmega.com.png
        protocol: 'https',
        hostname: 'fomo.blob.core.windows.net',
      },
    ],
  },
};

export default nextConfig;
