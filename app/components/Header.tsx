import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-slate-50 text-xl font-semibold tracking-tight"
        >
          Dylan Marley
        </Link>

        <nav className="flex items-center gap-6 text-slate-300">
          <Link href="/projects" className="hover:text-white transition">
            Projects
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
