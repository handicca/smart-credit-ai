"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const showMainNav = isHome || isAbout;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-base md:text-lg font-semibold text-slate-800">
              Smart Credit
            </span>
            <span className="text-sm font-bold text-blue-600">AI</span>
          </Link>

          {/* Navigation */}
          {showMainNav ? (
            <>
              {/* Desktop */}
              <nav className="hidden md:flex items-center gap-4">
                <NavLinks isHome={isHome} isAbout={isAbout} />
              </nav>

              {/* Mobile */}
              <nav className="flex md:hidden items-center gap-4">
                <NavLinks isHome={isHome} isAbout={isAbout} />
              </nav>
            </>
          ) : (
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Kembali ke Beranda
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
