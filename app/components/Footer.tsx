import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

const githubLink = "https://github.com/DavidTimi1";
const twitterLink = "https://x.com/"; // Replace with your actual Twitter/X link

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Pic2Plate</h3>
            <p className="mt-2 text-sm">
              &copy; {new Date().getFullYear()} Pic2Plate. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-gray-100">Product</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-100">Company</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-gray-100">Connect</h4>
            <div className="mt-2 flex justify-center md:justify-start space-x-4">
              <Link href={githubLink} target="_blank" aria-label="GitHub">
                <GithubIcon size={24} className="hover:text-white transition-colors" />
              </Link>
              <Link href={twitterLink} target="_blank" aria-label="X (formerly Twitter)">
                <TwitterIcon size={24} className="hover:text-white transition-colors" />
              </Link>
            </div>
            <p className="mt-4 text-sm">
              Made with <span className="text-pink-500">❤</span> by DavidTimi1
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}