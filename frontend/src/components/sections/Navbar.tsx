"use client";
import Link from "next/link";
import { useScroll } from "../../hooks/use-scroll";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const scrolled = useScroll();

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-5 sm:px-8",
      scrolled
        ? "bg-[#fffaf5]/95 backdrop-blur-md border-b border-[#eaded4] py-3 shadow-[0_8px_30px_rgba(82,52,34,0.05)]"
        : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO - CAREFLOW */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#d96535] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#d96535]/20 group-hover:-rotate-3 transition-transform">
            <span className="font-black text-lg tracking-tight">C</span>
          </div>
          <span className="text-xl font-bold text-[#2b211b] tracking-[-0.04em]">
            Care<span className="text-[#d96535]">Flow</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#796b61]">
          <a href="#features" className="transition-colors hover:text-[#d96535]">Platform</a>
          <a href="#how-it-works" className="transition-colors hover:text-[#d96535]">How it works</a>
          <a href="#faq" className="transition-colors hover:text-[#d96535]">FAQs</a>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login" className="hidden sm:inline-flex px-3 py-2 text-sm font-semibold text-[#796b61] transition-colors hover:text-[#d96535]">
            Sign in
          </Link>
          <Link href="/register">
            <button className="rounded-xl bg-[#2b211b] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2b211b]/10 transition-all hover:bg-[#d96535] active:scale-[0.98]">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}