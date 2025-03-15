import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;


export const TEMPDIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'tmp');
