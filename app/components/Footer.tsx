export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[14px] text-gray-400">
          &copy; {new Date().getFullYear()} Konnetta. All rights reserved.
        </p>
        <a
          href="https://konnetta.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] text-[#3DA58A] hover:underline"
        >
          konnetta.com
        </a>
      </div>
    </footer>
  );
}
