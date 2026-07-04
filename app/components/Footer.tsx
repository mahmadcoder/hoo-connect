import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#0d2b25]/10 bg-[#f0ede6] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-sm text-[#0d2b25]/50 sm:flex-row sm:justify-between md:px-10">
        
        {/* Copyright notice */}
        <p className="font-medium text-xs select-none">
          &copy; {new Date().getFullYear()} LOOP NETWORKS INC. All rights reserved.
        </p>
        
        {/* Navigation & SVG Brand Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="#" className="text-xs font-semibold hover:text-[#0d2b25] transition duration-300">
            Privacy Policy
          </Link>
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold hover:text-[#0d2b25] transition duration-300"
          >
            Cookie Settings
          </button>
          
          <div className="h-4 w-px bg-[#0d2b25]/15 hidden sm:block" />

          {/* Social Links (Premium SVGs) */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/hooyouknow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0d2b25]/5 text-[#0d2b25]/60 hover:bg-[#0d2b25]/10 hover:text-[#0d2b25] transition duration-300"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 9.67.443 9.4 10.032 0 10.475-.968.044-1.32.052-3.752.052s-2.784-.008-3.752-.052c-9.67-.443-9.4-10.032 0-10.475.968-.044 1.32-.052 3.752-.052zm0-2c-2.482 0-2.954.01-3.93.054C3.475.29 2.03 1.737 1.83 6.63a95.87 95.87 0 00-.046 3.93c.01 2.481.011 2.954.054 3.93.2 4.887 1.644 6.333 6.537 6.533 1.93.044 2.404.054 3.93.054s2.955-.01 3.93-.054c4.896-.2 6.342-1.644 6.54-6.533.044-1.93.054-2.404.054-3.93s-.01-2.955-.054-3.93c-.2-4.887-1.643-6.333-6.533-6.533C15.268.01 14.796 0 12.315 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@hooyouknow_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0d2b25]/5 text-[#0d2b25]/60 hover:bg-[#0d2b25]/10 hover:text-[#0d2b25] transition duration-300"
              aria-label="TikTok"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.73 4.12 1.13 1.09 2.69 1.62 4.26 1.64V9.7c-1.74-.03-3.41-.66-4.71-1.83-.17-.15-.34-.32-.49-.5v7.62c.03 2.14-.94 4.22-2.65 5.51-1.92 1.42-4.57 1.71-6.75.76-2.14-.93-3.69-3.05-3.97-5.37-.4-3.23 1.64-6.43 4.79-7.23 1.02-.26 2.09-.22 3.08.13V3.62c-1.39-.46-2.89-.35-4.2.32-1.81.93-3 2.8-3.14 4.83a8.12 8.12 0 005.65 8.27c2.3.71 4.96.11 6.66-1.5 1.51-1.42 2.23-3.51 1.95-5.55V.02z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/hooyouknow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0d2b25]/5 text-[#0d2b25]/60 hover:bg-[#0d2b25]/10 hover:text-[#0d2b25] transition duration-300"
              aria-label="Twitter"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
