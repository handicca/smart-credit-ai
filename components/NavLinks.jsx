import Link from "next/link";

export default function NavLinks({ isHome, isAbout }) {
  return (
    <>
      <Link
        href="/about"
        className={`text-sm hover:text-slate-900 ${
          isAbout ? "text-blue-500" : "text-slate-600"
        }`}
      >
        About
      </Link>

      {isHome && (
        <a
          href="#how-it-works"
          className="hidden md:inline-block text-sm text-slate-600 hover:text-slate-900"
        >
          How it works
        </a>
      )}

      <Link
        href="/demo"
        className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
      >
        Coba Demo
      </Link>
    </>
  );
}
