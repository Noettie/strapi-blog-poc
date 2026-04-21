import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3DA58A] flex items-center justify-center">
            <span className="text-white font-bold text-[14px]">K</span>
          </div>
          <span className="text-[20px] font-bold text-gray-900">Konnetta <span className="text-[#3DA58A] font-normal">Blog</span></span>
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="https://konnetta.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-gray-500 hover:text-[#3DA58A] transition-colors"
          >
            Visit Konnetta
          </a>
        </div>
      </div>
    </nav>
  );
}
