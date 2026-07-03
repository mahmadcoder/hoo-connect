import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#0d2b25]/10 bg-[#f0ede6] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-sm text-[#0d2b25]/50 sm:flex-row sm:justify-between md:px-10">
        <p>&copy; HOO TECHNOLOGY LTD 2026</p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/hooyouknow"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#0d2b25]"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@hooyouknow_"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#0d2b25]"
          >
            TikTok
          </a>
          <Link href="#" className="transition hover:text-[#0d2b25]">
            Privacy Policy
          </Link>
          <button
            type="button"
            className="cursor-pointer transition hover:text-[#0d2b25]"
          >
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  );
}
