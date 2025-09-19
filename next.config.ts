import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;


export const TEMPDIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'tmp');
