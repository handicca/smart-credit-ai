"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold">Smart Credit</span>
            <span className="text-sm text-primary font-bold text-blue-600">
              AI
            </span>
          </Link>

          {pathname !== "/demo" ? (
            <>
              <nav className="hidden md:flex items-center gap-4">
                <a
                  href="#how-it-works"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  How it works
                </a>
                <Link
                  href="/demo"
                  className="px-3 py-2 rounded-md bg-primary text-white text-sm font-medium bg-blue-600 hover:bg-blue-700"
                >
                  Try demo
                </Link>
              </nav>

              <div className="md:hidden">
                <Link
                  href="/demo"
                  className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium"
                >
                  Try Demo
                </Link>
              </div>
            </>
          ) : <Link
                  href="/"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Back to Home
                </Link>}
        </div>
      </div>
    </header>
  );
}
